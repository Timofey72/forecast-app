from rest_framework import views, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from .services import get_dates, get_cities_info


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
