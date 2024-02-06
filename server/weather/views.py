from rest_framework import views, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import City, Predictions, PrecipitationType
from .neiron.prediction import get_probability_from_ai
from .serializers import CitySerializer, PredictionSerializer
from .services import get_dates, get_cities_info, find_forecast_day, get_probability_and_precip_from_json, convert_date


class WeatherApi(views.APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        dates = get_dates()
        cities, is_error = get_cities_info(request)

        data = {'dates': dates, 'cities': cities}
        if is_error:
            data['error_message'] = 'Произошла ошибка при получении данных о погоде'

        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        city = request.data.get('city')
        date = request.data.get('date')

        # Проверка weather_data на пустые значения
        weather_data = find_forecast_day(date, city)
        if weather_data is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        prob_precipitation, precipitation = get_probability_and_precip_from_json(weather_data, date)
        prob_precipitation_ai = get_probability_from_ai(city, convert_date(date))
        city_obj = City.objects.get_or_create(name=city, user_id=request.user)[0]

        Predictions.objects.create(
            user_id=request.user,
            city_id=city_obj,
            date=date,
            precipitation_type=PrecipitationType.objects.get(name=precipitation),
            precipitation_probability=prob_precipitation,
            precipitation_probability_ai=prob_precipitation_ai
        )

        weather = {
            'date': date,
            'city': {
                'name': city,
                'is_favorite': city_obj.is_favorite
            },
            'temp': weather_data['avgtemp_c'],
            'precipitation': precipitation,
            'prob_precipitation': prob_precipitation,
            'prob_precipitation_ai': prob_precipitation_ai,
            'icon': weather_data['condition']['icon']
        }
        data = {'prediction': weather}
        return Response(data, status=status.HTTP_200_OK)


class CityApi(views.APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        city_id = request.GET.get('city_id', '')
        if city_id:
            city = City.objects.get(id=city_id)
            serializer = CitySerializer(instance=city)
        else:
            cities = City.objects.filter(user_id=request.user, is_favorite=True)
            serializer = CitySerializer(instance=cities, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        city = request.data.get('city')
        city_obj = City.objects.get(user_id=request.user, name=city)
        city_obj.is_favorite ^= True
        city_obj.save()

        if city_obj.is_favorite:
            message = f'Вы добавили в избранное город {city}'
        else:
            message = f'Вы удалили из избранного город {city}'

        return Response({'message': message}, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        City.objects.get(id=pk, user_id=request.user).delete()
        return Response(status=status.HTTP_200_OK)


class PredictionApi(views.APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        city_id = request.GET.get('city_id', '')
        date = request.GET.get('date', '')
        predictions_list = Predictions.objects.filter(user_id=request.user)

        # filtering data
        if date or city_id:
            if date:
                predictions_list = predictions_list.filter(date=date)
            if city_id:
                predictions_list = predictions_list.filter(city_id__id=city_id)
            if not predictions_list.exists():
                return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = PredictionSerializer(instance=predictions_list, many=True)
        return Response({'predictions': serializer.data, 'dates': get_dates()}, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        prediction = Predictions.objects.filter(id=pk, user_id=request.user)
        if not prediction.exists():
            return Response(status=status.HTTP_404_NOT_FOUND)
        prediction.first().delete()
        return Response(status=status.HTTP_200_OK)
