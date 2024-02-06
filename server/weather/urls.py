from django.urls import path

from .views import WeatherApi, CityApi, PredictionApi

urlpatterns = [
    path('', WeatherApi.as_view()),
    path('city/', CityApi.as_view()),
    path('city/<int:pk>', CityApi.as_view()),
    path('prediction/', PredictionApi.as_view()),
    path('prediction/<int:pk>', PredictionApi.as_view()),
]
