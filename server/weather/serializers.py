from rest_framework import serializers

from .models import City, Predictions, PrecipitationType


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ('id', 'name')


class PrecipitationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrecipitationType
        fields = ('name',)


class PredictionSerializer(serializers.ModelSerializer):
    city_id = CitySerializer()
    precipitation_type = PrecipitationTypeSerializer()

    class Meta:
        model = Predictions
        fields = (
            'id', 'city_id', 'date', 'precipitation_probability', 'precipitation_probability_ai', 'precipitation_type')
