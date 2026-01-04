from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    GenerateWeeklyPlanView, WeeklyPlanViewSet, DailyPlanViewSet,
    MealViewSet, AddMealItemView, RemoveMealItemView, UpdateMealItemView
)

router = DefaultRouter()
router.register(r'weekly-plans', WeeklyPlanViewSet, basename='weekly-plan')
router.register(r'daily-plans', DailyPlanViewSet, basename='daily-plan')
router.register(r'meals', MealViewSet, basename='meal')

urlpatterns = [
    path('', include(router.urls)),
    path('generate/', GenerateWeeklyPlanView.as_view(), name='generate-plan'),
    path('meals/<int:meal_id>/items/', AddMealItemView.as_view(), name='add-meal-item'),
    path('items/<int:meal_item_id>/', RemoveMealItemView.as_view(), name='remove-meal-item'),
    path('items/<int:meal_item_id>/update/', UpdateMealItemView.as_view(), name='update-meal-item'),
]