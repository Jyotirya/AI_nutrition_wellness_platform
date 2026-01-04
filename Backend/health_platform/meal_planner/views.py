from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .services import MealPlanService
from .models import WeeklyPlan, DailyPlan, Meal, MealItem
from .serializers import (
    WeeklyPlanSerializer, DailyPlanSerializer, MealSerializer,
    MealItemSerializer,
)
from api.models import UserDetails

class GenerateWeeklyPlanView(APIView):
    """Generate and save a weekly meal plan"""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user_details = UserDetails.objects.get(user=request.user)
        except UserDetails.DoesNotExist:
            return Response(
                {"error": "User details not found. Complete onboarding first."},
                status=status.HTTP_400_BAD_REQUEST
            )

        service = MealPlanService()
        plan_data = service.generate_weekly_plan(user_details)

        # Create WeeklyPlan
        weekly_plan = WeeklyPlan.objects.create(
            user=request.user,
            source="rule",
            target_calories=plan_data[0]["daily_calories"],  # Use first day's calories
            target_protein_g=plan_data[0]["macros"]["protein_g"],
            target_carbs_g=plan_data[0]["macros"]["carbohydrates_g"],
            target_fats_g=plan_data[0]["macros"]["fats_g"],
        )

        # Create DailyPlans and Meals
        for day_idx, day_plan in enumerate(plan_data):
            daily_plan = DailyPlan.objects.create(
                weekly_plan=weekly_plan,
                day=day_idx,
                calories=day_plan["daily_calories"],
                protein_g=day_plan["macros"]["protein_g"],
                carbs_g=day_plan["macros"]["carbohydrates_g"],
                fats_g=day_plan["macros"]["fats_g"],
            )

            for meal_data in day_plan["meals"]:
                meal = Meal.objects.create(
                    daily_plan=daily_plan,
                    meal_type=meal_data["meal"],
                    calories=meal_data["calories"],
                    protein_g=0,  # Will be calculated from items
                    carbs_g=0,
                    fats_g=0,
                )

                # Add foods to the meal
                for food in meal_data["foods"]:
                    MealItem.objects.create(
                        meal=meal,
                        food=food,
                        quantity=1.0
                    )

                # Recalculate meal macros from items
                meal.recalculate_macros()

            # Recalculate daily plan macros
            daily_plan.recalculate_macros()

        serializer = WeeklyPlanSerializer(weekly_plan)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class WeeklyPlanViewSet(ModelViewSet):
    """Retrieve, update, delete weekly plans"""
    serializer_class = WeeklyPlanSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return WeeklyPlan.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DailyPlanViewSet(ModelViewSet):
    """Retrieve and update daily plans"""
    serializer_class = DailyPlanSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return DailyPlan.objects.filter(weekly_plan__user=self.request.user)

    def perform_update(self, serializer):
        daily_plan = serializer.save()
        daily_plan.recalculate_macros()


class MealViewSet(ModelViewSet):
    """Retrieve and update meals"""
    serializer_class = MealSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Meal.objects.filter(daily_plan__weekly_plan__user=self.request.user)

    def perform_update(self, serializer):
        meal = serializer.save()
        meal.recalculate_macros()
        meal.daily_plan.recalculate_macros()


class AddMealItemView(APIView):
    """Add a food item to a meal"""
    permission_classes = [IsAuthenticated]

    def post(self, request, meal_id):
        meal = get_object_or_404(Meal, id=meal_id, daily_plan__weekly_plan__user=request.user)

        serializer = MealItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(meal=meal)
            meal.recalculate_macros()
            meal.daily_plan.recalculate_macros()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RemoveMealItemView(APIView):
    """Remove a food item from a meal"""
    permission_classes = [IsAuthenticated]

    def delete(self, request, meal_item_id):
        meal_item = get_object_or_404(
            MealItem,
            id=meal_item_id,
            meal__daily_plan__weekly_plan__user=request.user
        )
        meal = meal_item.meal
        meal_item.delete()
        meal.recalculate_macros()
        meal.daily_plan.recalculate_macros()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UpdateMealItemView(APIView):
    """Update quantity of a meal item"""
    permission_classes = [IsAuthenticated]

    def patch(self, request, meal_item_id):
        meal_item = get_object_or_404(
            MealItem,
            id=meal_item_id,
            meal__daily_plan__weekly_plan__user=request.user
        )
        
        serializer = MealItemSerializer(meal_item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            meal = meal_item.meal
            meal.recalculate_macros()
            meal.daily_plan.recalculate_macros()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)