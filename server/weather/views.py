from rest_framework import views, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import City, Predictions, PrecipitationType
from .neiron.prediction import get_probability_from_ai
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

    def post(self, request):
        city = request.data.get('city')
        city_obj = City.objects.get(user_id=request.user, name=city)

        is_favorite = city_obj.is_favorite
        city_obj.is_favorite = not is_favorite
        city_obj.save()

        if is_favorite:
            return Response({'message': f'Вы удалили из избранного город {city}'}, status=status.HTTP_200_OK)

        return Response({'message': f'Вы добавили в избранное город {city}'}, status=status.HTTP_200_OK)
