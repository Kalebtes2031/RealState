from rest_framework import serializers
from .models import Property
from users.serializers import AgentSerializer

class PropertySerializer(serializers.ModelSerializer):
    agent = AgentSerializer(read_only=True)

    class Meta:
        model = Property
        fields = [
            'id', 'name', 'type', 'address', 'description', 'price',
            'bedrooms', 'bathrooms', 'created_at', 'agent'
        ]
