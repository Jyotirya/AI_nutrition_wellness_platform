from django.contrib.auth import get_user_model
from rest_framework import serializers#type: ignore
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer#type: ignore
from rest_framework_simplejwt.tokens import RefreshToken#type: ignore
from .models import UserDetails
from rest_framework.validators import UniqueValidator #type: ignore

User = get_user_model()

class CustomTokenObtainPairSerializer(serializers.Serializer):
    """Custom login serializer that uses email instead of username"""
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if not email or not password:
            raise serializers.ValidationError("Email and password are required")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError({"email": "User not found"})

        if not user.check_password(password):
            raise serializers.ValidationError({"password": "Invalid credentials"})
        
        if not user.is_active:
            raise serializers.ValidationError({"email": "User account is disabled"})

        refresh = RefreshToken.for_user(user)

        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name"]
        read_only_fields = ["id", "email"]

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=User.objects.all(), message="A user with this email already exists."),]
    )
    password = serializers.CharField(write_only=True, min_length=8)
    password2 = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = [ "email", "first_name", "last_name", "password", "password2"]

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({"password": "Passwords don't match"})
        return attrs

    def create(self, validated_data):
        validated_data.pop("password2")
        password = validated_data.pop("password")
        email = validated_data["email"]
        user = User.objects.create_user(
            username=email,          
            email=email,
            password=password,
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", "")
        )
        # Ensure a UserDetails row exists
        UserDetails.objects.get_or_create(user=user)
        return user

class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetails
        fields = [
            "height",
            "weight",
            "activity_level",
            "age",
            "gender",
            "exercise",
            "workout_frequency",
            "food_preference",
            "allergies",
            "cuisine",
            "body_fat",
            "goal",
            "updated_at",
            "onboarding_step",
        ]
        read_only_fields = ["updated_at"]

# Optional: combined profile serializer to read/write both user + details in one go
class ProfileSerializer(serializers.Serializer):
    user = UserSerializer()
    details = UserDetailsSerializer()

    def to_representation(self, instance):
        # instance is a User
        details, _ = UserDetails.objects.get_or_create(user=instance)
        return {
            "user": UserSerializer(instance).data,
            "details": UserDetailsSerializer(details).data,
        }

    def update(self, instance, validated_data):
        # instance is a User
        user_data = validated_data.get("user", {})
        details_data = validated_data.get("details", {})

        # Update user fields (first_name/last_name only; username/email are read-only)
        for field in ["first_name", "last_name"]:
            if field in user_data:
                setattr(instance, field, user_data[field])
        instance.save()

        # Update details
        details, _ = UserDetails.objects.get_or_create(user=instance)
        for field, value in details_data.items():
            setattr(details, field, value)
        details.save()
        return instance