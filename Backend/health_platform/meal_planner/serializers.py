
from rest_framework import serializers
from .models import WeeklyPlan, DailyPlan, Meal
from foods.models import Food

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = "__all__"

class MealSerializer(serializers.ModelSerializer):
    foods = FoodSerializer(many=True, read_only=True)
    class Meta:
        model = Meal
        fields = "__all__"

class DailyPlanSerializer(serializers.ModelSerializer):
    meals = MealSerializer(many=True, read_only=True)
    class Meta:
        model = DailyPlan
        fields = "__all__"

class WeeklyPlanSerializer(serializers.ModelSerializer):
    days = DailyPlanSerializer(many=True, read_only=True)
    class Meta:
        model = WeeklyPlan
        fields = "__all__"
