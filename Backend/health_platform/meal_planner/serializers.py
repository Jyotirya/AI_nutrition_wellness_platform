from rest_framework import serializers
from .models import WeeklyPlan, DailyPlan, Meal, MealItem
from api.models import Food

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = [
            "id", "name", "region", "type", "category", "allergy", 
            "serving", "total_weight_g", "energy_kcal", "proteins_g", 
            "carbohydrates_g", "fats_g", "fiber_g", "carbon_footprint_kg"
        ]

class MealItemSerializer(serializers.ModelSerializer):
    # Used for Output (JSON response)
    food = FoodSerializer(read_only=True) 
    
    # Used for Input (POST data)
    food_id = serializers.PrimaryKeyRelatedField(
        queryset=Food.objects.all(), 
        source='food', 
        write_only=True
    )

    class Meta:
        model = MealItem
        fields = ["id", "food", "food_id", "quantity"]

    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError("Quantity must be greater than 0")
        return value

class MealSerializer(serializers.ModelSerializer):
    items = MealItemSerializer(many=True, read_only=True)
    # Read-only calculated fields
    calories = serializers.IntegerField(read_only=True)
    protein_g = serializers.IntegerField(read_only=True)
    carbs_g = serializers.IntegerField(read_only=True)
    fats_g = serializers.IntegerField(read_only=True)

    class Meta:
        model = Meal
        fields = ["id", "meal_type", "calories", "protein_g", "carbs_g", "fats_g", "items", "is_locked"]
        read_only_fields = ["calories", "protein_g", "carbs_g", "fats_g"]


class DailyPlanSerializer(serializers.ModelSerializer):
    meals = MealSerializer(many=True, read_only=True)
    # Read-only calculated fields
    calories = serializers.IntegerField(read_only=True)
    protein_g = serializers.IntegerField(read_only=True)
    carbs_g = serializers.IntegerField(read_only=True)
    fats_g = serializers.IntegerField(read_only=True)

    class Meta:
        model = DailyPlan
        fields = ["id", "day", "calories", "protein_g", "carbs_g", "fats_g", "meals", "is_locked"]
        read_only_fields = ["calories", "protein_g", "carbs_g", "fats_g"]


class WeeklyPlanSerializer(serializers.ModelSerializer):
    days = DailyPlanSerializer(many=True, read_only=True)
    # Read-only calculated fields
    target_calories = serializers.IntegerField(read_only=True)
    target_protein_g = serializers.IntegerField(read_only=True)
    target_carbs_g = serializers.IntegerField(read_only=True)
    target_fats_g = serializers.IntegerField(read_only=True)

    class Meta:
        model = WeeklyPlan
        fields = [
            "id", "source", "notes", "created_at", "updated_at", "is_active",
            "target_calories", "target_protein_g", "target_carbs_g", "target_fats_g", "days"
        ]
        read_only_fields = ["target_calories", "target_protein_g", "target_carbs_g", "target_fats_g", "created_at", "updated_at"]