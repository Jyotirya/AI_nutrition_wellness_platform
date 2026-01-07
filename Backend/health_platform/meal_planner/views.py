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

        # Check if regenerate flag is passed - delete existing plans first
        regenerate = request.data.get('regenerate', False)
        if regenerate:
            # Delete all existing weekly plans for this user (cascades to daily plans, meals, meal items)
            WeeklyPlan.objects.filter(user=request.user).delete()

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


class RegenerateDailyPlanView(APIView):
    """Regenerate a specific day's meal plan"""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user_details = UserDetails.objects.get(user=request.user)
        except UserDetails.DoesNotExist:
            return Response(
                {"error": "User details not found. Complete onboarding first."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Get the day index (0=Monday, 6=Sunday)
        day_index = request.data.get('day')
        if day_index is None:
            # Default to current day of week (Monday=0, Sunday=6)
            from datetime import datetime
            day_index = datetime.now().weekday()
        
        day_index = int(day_index)
        if day_index < 0 or day_index > 6:
            return Response(
                {"error": "Invalid day index. Must be 0-6 (Monday-Sunday)."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Get the active weekly plan
        weekly_plan = WeeklyPlan.objects.filter(user=request.user, is_active=True).first()
        if not weekly_plan:
            return Response(
                {"error": "No active weekly plan found. Generate a weekly plan first."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Delete existing daily plan for this day
        DailyPlan.objects.filter(weekly_plan=weekly_plan, day=day_index).delete()

        # Generate new daily plan
        from collections import defaultdict
        service = MealPlanService()
        repetition_tracker = defaultdict(int)
        
        daily_plan_data = service.generate_daily_plan(user_details, repetition_tracker)

        # Create new DailyPlan
        daily_plan = DailyPlan.objects.create(
            weekly_plan=weekly_plan,
            day=day_index,
            calories=daily_plan_data["daily_calories"],
            protein_g=daily_plan_data["macros"]["protein_g"],
            carbs_g=daily_plan_data["macros"]["carbohydrates_g"],
            fats_g=daily_plan_data["macros"]["fats_g"],
        )

        for meal_data in daily_plan_data["meals"]:
            meal = Meal.objects.create(
                daily_plan=daily_plan,
                meal_type=meal_data["meal"],
                calories=meal_data["calories"],
                protein_g=0,
                carbs_g=0,
                fats_g=0,
            )

            for food in meal_data["foods"]:
                MealItem.objects.create(
                    meal=meal,
                    food=food,
                    quantity=1.0
                )

            meal.recalculate_macros()

        daily_plan.recalculate_macros()

        serializer = DailyPlanSerializer(daily_plan)
        return Response(serializer.data, status=status.HTTP_201_CREATED)