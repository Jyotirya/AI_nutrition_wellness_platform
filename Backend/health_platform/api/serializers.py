from rest_framework import serializers
from .models import CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls,user):
        token = super().get_token(user)
        token['email'] = user.email
        return token 
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name',
                 'height', 'weight', 'activity_level', 'age', 'gender',
                   'exercise', 'food_preference', 'allergies', 'goal']
        read_only_fields = ['id']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password2 = serializers.CharField(write_only=True, min_length=8)

    class Meta: 
        model = CustomUser
        fields = ['email', 'first_name', 'last_name', 'password', 'password2',
                  'height', 'weight', 'activity_level', 'age', 'gender',
                    'exercise', 'food_preference', 'allergies', 'goal']
        
        def validate(self, data):
            if data['password'] != data['password2']:
                raise serializers.ValidationError({"password": "Passwords don't match"})
            return data
        
        def create(self, validated_data):
            validated_data.pop('password2')
            user = CustomUser.objects.create_user(**validated_data)
            return user
    