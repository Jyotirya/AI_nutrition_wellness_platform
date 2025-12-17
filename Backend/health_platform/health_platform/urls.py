# health_platform/urls.py
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from api.views import RegisterView, LoginView, ProfileView, UserDetailsView, LogoutView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/register/", RegisterView.as_view()),
    path("api/auth/login/", LoginView.as_view()),
    path("api/auth/refresh/", TokenRefreshView.as_view()),
    path("api/auth/profile/", ProfileView.as_view()),
    path("api/auth/details/", UserDetailsView.as_view()),
    path("api/auth/logout/", LogoutView.as_view()),
    path("api/auth/token/refresh/", TokenRefreshView.as_view(),name="token_refresh"),
]