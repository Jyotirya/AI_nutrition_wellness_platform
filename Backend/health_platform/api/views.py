from django.contrib.auth import get_user_model
from rest_framework import status#type: ignore
from rest_framework.permissions import AllowAny, IsAuthenticated#type: ignore
from rest_framework.response import Response#type: ignore
from rest_framework.views import APIView#type: ignore
from rest_framework_simplejwt.tokens import RefreshToken#type: ignore

from .models import UserDetails
from .serializers import ( 
    RegisterSerializer,
    UserSerializer,
    UserDetailsSerializer,
    ProfileSerializer,
    CustomTokenObtainPairSerializer,
)

User = get_user_model()


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Ensure a details row exists (RegisterSerializer also does this; safe to keep)
            UserDetails.objects.get_or_create(user=user)
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = CustomTokenObtainPairSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfileView(APIView):
    """
    Combined profile endpoint:
    - GET returns both user and details:
      {
        "user": {...},
        "details": {...}
      }
    - PUT accepts the same shape to update:
      {
        "user": { "first_name": "...", "last_name": "..." },
        "details": { "height": 180, "weight": 70, ... }
      }
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = ProfileSerializer(instance=request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        serializer = ProfileSerializer(instance=request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Optional: endpoints to update only the details object if you prefer
class UserDetailsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        details, _ = UserDetails.objects.get_or_create(user=request.user)
        return Response(UserDetailsSerializer(details).data, status=status.HTTP_200_OK)

    def put(self, request):
        details, _ = UserDetails.objects.get_or_create(user=request.user)
        serializer = UserDetailsSerializer(details, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Blacklist refresh token if blacklist app is enabled
        try:
            refresh_token = request.data.get("refresh")
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
        except Exception:
            pass
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)