from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .utils import calculate_bmr_tdee, calculate_target_calories, calculate_macros
from recepies.models import Recipe

class GeneratePlanView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            profile = request.user.userprofile
        except:
            return Response({"error": "Profile not set up"}, status=400)

        # 1. Calculate Logic
        bmr, tdee = calculate_bmr_tdee(profile)
        target = calculate_target_calories(tdee, profile.goal)
        macros = calculate_macros(target)

        # 2. Filter Recipes
        recipes = Recipe.objects.filter(
            is_vegetarian=profile.is_vegetarian,
            cuisine=profile.cuisine_preference
        )
        if "nuts" in profile.allergies:
            recipes = recipes.exclude(contains_nuts=True)

        # 3. Generate Plan
        plan = {}
        days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        
        for day in days:
            day_plan = {
                "breakfast": self.get_random_meal(recipes, "Breakfast"),
                "lunch": self.get_random_meal(recipes, "Lunch"),
                "snack": self.get_random_meal(recipes, "Snack"),
                "dinner": self.get_random_meal(recipes, "Dinner"),
            }
            
            # --- FIX IS HERE ---
            # Calculate total calories safely
            total_cals = 0
            for meal in day_plan.values():
                if meal != "No Meal Found":
                    # Accessing dictionary with ['key'] instead of .dot
                    total_cals += meal['calories']
            
            plan[day] = {"meals": day_plan, "total_calories": total_cals}

        return Response({
            "user_stats": {"BMR": bmr, "TDEE": tdee, "Target": target},
            "macros": macros,
            "weekly_plan": plan
        })

    def get_random_meal(self, queryset, meal_type):
        items = queryset.filter(meal_type=meal_type)
        if items.exists():
            obj = items.order_by('?').first()
            return {
                "name": obj.name, 
                "calories": obj.calories, 
                "protein": obj.protein_g,
                "carbs": obj.carbs_g,
                "fats": obj.fats_g
            }
        return "No Meal Found"