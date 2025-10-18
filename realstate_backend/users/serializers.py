#realstate_backend/users/serializers.py
from dj_rest_auth.serializers import JWTSerializerWithExpiration
from rest_framework import serializers
from .models import User, Agent



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'display_name', 'avatar']
        read_only_fields = ['id']

class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'display_name', 'password', 'password2']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Passwords must match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
    
class CustomJWTSerializer(JWTSerializerWithExpiration):
    refresh = serializers.CharField()
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Add the refresh token if available
        if "refresh" in instance:
            data["refresh"] = instance["refresh"]
        return data
    
        
class AgentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Agent
        fields = ['id', 'user', 'phone', 'bio']
