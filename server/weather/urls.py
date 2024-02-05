from django.urls import path

from .views import WeatherApi

urlpatterns = [
    path('', WeatherApi.as_view()),
]
