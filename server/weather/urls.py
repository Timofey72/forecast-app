from django.urls import path

from .views import WeatherApi, CityApi

urlpatterns = [
    path('', WeatherApi.as_view()),
    path('city/', CityApi.as_view()),
]
