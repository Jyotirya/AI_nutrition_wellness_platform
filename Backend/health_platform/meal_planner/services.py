from collections import defaultdict
import random
from django.db.models import Q
from api.models import Food, UserDetails


class MealPlanService:
    # CONFIG CONSTANTS
    MEAL_TYPE_MAPPING = {
    "Breakfast": [
        "Breakfast",
        "Beverages",
    ],
    "Snack": [
        "Snacks",
        "Appetizer",
        "Beverages"
    ],
    "Lunch": [
        "Lunch",
        "Dry Curry",
        "Gravy"
    ],
    "Dinner": [
        "Dinner",
        "Dry Curry",
        "Gravy"
    ],
    "Appetizer": [
        "Appetizer",
        "Snacks",
        "Beverages"
    ]
    }

    NEAT_MAP = {
        "sedentary": 1.20,
        "light": 1.30,
        "moderate": 1.45,
        "very_active": 1.60,
        "heavy": 1.60,
    }

    EXERCISE_BASE = {
        "Yoga": 0.04,
        "Hiking": 0.06,
        "Cardio": 0.08,
        "Strength Training": 0.10,
        "Swimming": 0.12,
        "CrossFit": 0.15
    }

    MEAL_SPLITS = {
        1: ([1.0], ["Dinner"]),
        2: ([0.45, 0.55], ["Lunch", "Dinner"]),
        3: ([0.30, 0.40, 0.30], ["Breakfast", "Lunch", "Dinner"]),
        4: ([0.25, 0.35, 0.15, 0.25], ["Breakfast", "Lunch", "Snack", "Dinner"]),
        5: ([0.20, 0.30, 0.15, 0.15, 0.20],
            ["Breakfast", "Lunch", "Snack", "Snack", "Dinner"]),
    }

    CARB_PERCENT = {
        "Yoga": 0.30,
        "Hiking": 0.35,
        "Cardio": 0.40,
        "Strength Training": 0.45,
        "Swimming": 0.50,
        "CrossFit": 0.50
    }

    # -------------------------
    # PUBLIC API
    # -------------------------

    def generate_weekly_plan(self, user_details: UserDetails):
        weekly_plan = []
        repetition_tracker = defaultdict(int)

        for day in range(7):
            daily_plan = self.generate_daily_plan(
                user_details,
                repetition_tracker
            )

            for meal in daily_plan["meals"]:
                for food in meal["foods"]:
                    repetition_tracker[food.id] += 1

            # decay repetition memory
            for key in repetition_tracker:
                repetition_tracker[key] = max(0, repetition_tracker[key] - 1)

            weekly_plan.append(daily_plan)

        return weekly_plan

    def generate_daily_plan(self, user: UserDetails, repetition_tracker):
        calories = self._calculate_calories(user)
        macros = self._calculate_macros(calories, user)

        meals_per_day = user.meals_per_day or 3
        meal_dist, meal_types = self.MEAL_SPLITS.get(
            meals_per_day, self.MEAL_SPLITS[3]
        )

        # Handle snacking override
        if meals_per_day == 3 and user.snacking:
            meal_dist = [0.40, 0.25, 0.35]
            meal_types = ["Lunch", "Snack", "Dinner"]

        foods_qs = self._base_food_queryset(user)

        meals = []
        for ratio, meal_type in zip(meal_dist, meal_types):
            target_cal = calories * ratio
            selected_foods = self._build_meal(
                foods_qs,
                meal_type,
                target_cal,
                user.goal,
                repetition_tracker
            )

            meals.append({
                "meal": meal_type,
                "foods": selected_foods,
                "calories": round(sum(f.energy_kcal or 0 for f in selected_foods))
            })

        return {
            "daily_calories": round(calories),
            "macros": macros,
            "meals": meals
        }

    # -------------------------
    # CALORIE & MACRO LOGIC
    # -------------------------

    def _calculate_calories(self, u: UserDetails):
        # BMR
        if u.gender == "male":
            bmr = 10 * u.weight + 6.25 * u.height - 5 * u.age + 5
        else:
            bmr = 10 * u.weight + 6.25 * u.height - 5 * u.age - 161

        neat = self.NEAT_MAP.get(u.activity_level, 1.30)

        exercise_base = self.EXERCISE_BASE.get(u.exercise, 0.0)
        days = u.workout_frequency or 0

        if days == 0:
            volume = 0.0
        elif days <= 2:
            volume = 0.5
        elif days <= 4:
            volume = 0.75
        elif days <= 6:
            volume = 1.0
        else:
            volume = 1.1

        activity_factor = min(neat + exercise_base * volume, 1.95)
        tdee = bmr * activity_factor

        if u.goal == "weight_loss":
            tdee *= 0.80
        elif u.goal == "muscle_gain":
            tdee *= 1.10
        elif u.goal == "diabetes_control":
            tdee *= 0.95

        if u.body_fat:
            if u.body_fat > 30:
                tdee *= 0.95
            elif u.body_fat < 12:
                tdee *= 1.08
            elif u.body_fat < 20:
                tdee *= 1.05

        return tdee

    def _calculate_macros(self, calories, u: UserDetails):
        lbm = (
            u.weight * (1 - u.body_fat / 100)
            if u.body_fat else u.weight
        )

        if u.goal == "weight_loss":
            protein = lbm * 2.4
        elif u.goal == "muscle_gain":
            protein = lbm * 2.2
        else:
            protein = lbm * 2.0

        carb_percent = self.CARB_PERCENT.get(u.exercise, 0.40)
        carbs = (calories * carb_percent) / 4

        protein_kcal = protein * 4
        carbs_kcal = carbs * 4
        fats = (calories - protein_kcal - carbs_kcal) / 9

        return {
            "protein_g": round(protein),
            "carbohydrates_g": round(carbs),
            "fats_g": round(fats)
        }

    # -------------------------
    # FOOD SELECTION
    # -------------------------

    def _base_food_queryset(self, u: UserDetails):
        qs = Food.objects.all()

        if u.allergies:
            user_allergies = [
                a.strip().lower()
                for a in u.allergies.split(",")
                if a.strip().lower() != "no-allergies"
            ]

            if user_allergies:
                qs = qs.exclude(allergy__overlap=user_allergies)

        if u.cuisine:
            user_cuisines = [c.strip() for c in u.cuisine.split(",")]
            qs = qs.filter(region__overlap=user_cuisines)

        if u.food_preference:
            qs = qs.filter(category__overlap=[u.food_preference])

        return qs


    def _build_meal(self, foods_qs, meal_type, target_calories, goal, repetition_tracker):
        allowed_types = self.MEAL_TYPE_MAPPING.get(meal_type, [meal_type])
        pool = foods_qs.filter(type__overlap=allowed_types)

        pool = list(pool)
        random.shuffle(pool)

        def score(food):
            penalty = repetition_tracker.get(food.id, 0) * 2
            if goal == "weight_loss":
                return (food.proteins_g or 0) * 2 + (food.fiber_g or 0) - penalty
            if goal == "muscle_gain":
                return (food.proteins_g or 0) * 2 - (food.fats_g or 0) - penalty
            return (food.proteins_g or 0) + (food.fiber_g or 0) - penalty

        pool.sort(key=score, reverse=True)

        meal = []
        calories = 0

        for food in pool:
            food_cal = food.energy_kcal or 0
            if calories + food_cal <= target_calories * 1.1:
                meal.append(food)
                calories += food_cal
            if calories >= target_calories * 0.95:
                break

        return meal
