from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .serializers import UserSerializer, UserProfileSerializer
from .models import UserProfile
from rest_framework import generics

# 1. Register User (Keep this as is)
class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer

# 2. Get or Update Profile (NEW ROBUST VERSION)
class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # Get profile or return 404 if not found
        try:
            profile = UserProfile.objects.get(user=request.user)
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            return Response({"error": "Profile not found. Please setup profile first."}, status=404)

    def put(self, request):
        # Check if profile exists
        try:
            profile = UserProfile.objects.get(user=request.user)
            # Update existing profile
            serializer = UserProfileSerializer(profile, data=request.data)
        except UserProfile.DoesNotExist:
            # Create new profile
            serializer = UserProfileSerializer(data=request.data)

        if serializer.is_valid():
            # Save and link to the current user
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        # If data is invalid (e.g. missing age), return 400 with details
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)