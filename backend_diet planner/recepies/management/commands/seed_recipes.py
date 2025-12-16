from django.core.management.base import BaseCommand
from recepies.models import Recipe

class Command(BaseCommand):
    help = 'Seeds the database with 30 common Indian recipes'

    def handle(self, *args, **kwargs):
        recipes_data = [
            # --- BREAKFAST ---
            {
                "name": "Poha with Peanuts",
                "calories": 270, "protein_g": 6, "carbs_g": 48, "fats_g": 8,
                "is_vegetarian": True, "contains_nuts": True, "cuisine": "Indian", "meal_type": "Breakfast"
            },
            {
                "name": "Masala Oats",
                "calories": 220, "protein_g": 8, "carbs_g": 38, "fats_g": 5,
                "is_vegetarian": True, "contains_nuts": False, "cuisine": "Indian", "meal_type": "Breakfast"
            },
            {
                "name": "Paneer Paratha (1pc) + Curd",
                "calories": 320, "protein_g": 12, "carbs_g": 35, "fats_g": 15,
                "is_vegetarian": True, "contains_nuts": False, "cuisine": "Indian", "meal_type": "Breakfast"
            },
            {
                "name": "Moong Dal Chilla (2pcs)",
                "calories": 260, "protein_g": 16, "carbs_g": 34, "fats_g": 7,
                "is_vegetarian": True, "contains_nuts": False, "cuisine": "Indian", "meal_type": "Breakfast"
            },
            {
                "name": "Idli (3pcs) + Sambar",
                "calories": 240, "protein_g": 9, "carbs_g": 48, "fats_g": 2,
                "is_vegetarian": True, "contains_nuts": False, "cuisine": "South Indian", "meal_type": "Breakfast"
            },
            {
                "name": "Masala Dosa + Chutney",
                "calories": 380, "protein_g": 8, "carbs_g": 55, "fats_g": 14,
                "is_vegetarian": True, "contains_nuts": True, "cuisine": "South Indian", "meal_type": "Breakfast"
            },
            {
                "name": "Egg Bhurji (2 eggs) + 1 Toast",
                "calories": 300, "protein_g": 16, "carbs_g": 18, "fats_g": 18,
                "is_vegetarian": False, "contains_nuts": False, "cuisine": "Indian", "meal_type": "Breakfast"
            },
            {
                "name": "Upma with Veggies",
                "calories": 250, "protein_g": 6, "carbs_g": 40, "fats_g": 7,
                "is_vegetarian": True, "contains_nuts": True, "cuisine": "South Indian", "meal_type": "Breakfast"
            },

            # --- LUNCH ---
            {
                "name": "Dal Tadka + 2 Rotis + Salad",
                "calories": 420, "protein_g": 18, "carbs_g": 65, "fats_g": 10,
                "is_vegetarian": True, "contains_nuts": False, "cuisine": "Indian", "meal_type": "Lunch"
            },
            {
                "name": "Rajma Chawal (Kidney Beans + Rice)",
                "calories": 480, "protein_g": 16, "carbs_g": 75, "fats_g": 12,
                "is_vegetarian": True, "contains_nuts": False, "cuisine": "North Indian", "meal_type": "Lunch"
            },
            {
                "name": "Chicken Curry + 1 Naan",
                "calories": 520, "protein_g": 30, "carbs_g": 45, "fats_g": 22,
                "is_vegetarian": False, "contains_nuts": True, "cuisine": "Indian", "meal_type": "Lunch"
            },
            {
                "name": "Bhindi Masala + 2 Rotis",
                "calories": 350, "protein_g": 10, "carbs_g": 55, "fats_g": 12,
                "is_vegetarian": True, "contains_nuts": False, "cuisine": "Indian", "meal_type": "Lunch"
            },
            {
                "name": "Curd Rice with Pomegranate",
                "calories": 310, "protein_g": 8, "carbs_g": 45, "fats_g": 10,
                "is_vegetarian": True, "contains_nuts": False, "cuisine": "South Indian", "meal_type": "Lunch"
            },
            {
                "name": "Chole Bhature (1 Bhatura)",
                "calories": 550, "protein_g": 14, "carbs_g": 68, "fats_g": 25,
                "is_vegetarian": True, "contains_nuts": False, "cuisine": "North Indian", "meal_type": "Lunch"
            },
            {
                "name": "Fish Curry + Steamed Rice",
                "calories": 450, "protein_g": 35, "carbs_g": 50, "fats_g": 12,
                "is_vegetarian": False, "contains_nuts": False, "cuisine": "Indian", "meal_type": "Lunch"
            },
            {
                "name": "Soy Chunk Pulao + Raita",
                "calories": 410, "protein_g": 22, "carbs_g": 55, "fats_g": 10,
                "is_vegetarian": True, "contains_nuts": False, "cuisine": "Indian", "meal_type": "Lunch"
            },

            # --- SNACKS ---
            {
                "name": "Roasted Makhana (Fox Nuts)",
                "calories": 150, "protein_g": 4, "carbs_g": 28, "fats_g": 2,
                "is_vegetarian": True, "contains_nuts": False, "cuisine": "Indian", "meal_type": "Snack"
            },
            {
                "name": "Sprouts Salad",
                "calories": 180, "protein_g": 12, "carbs_g": 30, "fats_g": 1,
                "is_vegetarian": True, "contains_nuts": False, "cuisine": "Indian", "meal_type": "Snack"
            },
            {
                "name": "Dhokla (3pcs)",
                "calories": 160, "protein_g": 6, "carbs_g": 25, "fats_g": 4,
                "is_vegetarian": True, "contains_nuts": False, "cuisine": "Gujarati", "meal_type": "Snack"
            },
            {
                "name": "Masala Corn",
                "calories": 140, "protein_g": 4, "carbs_g": 26, "fats_g": 3,
                "is_vegetarian": True, "contains_nuts": False, "cuisine": "Indian", "meal_type": "Snack"
            },
            {
                "name": "Roasted Chana (Chickpeas)",
                "calories": 170, "protein_g": 10, "carbs_g": 27, "fats_g": 3,
                "is_vegetarian": True, "contains_nuts": False, "cuisine": "Indian", "meal_type": "Snack"
            },
            {
                "name": "Fruit Chaat",
                "calories": 120, "protein_g": 2, "carbs_g": 30, "fats_g": 0,
                "is_vegetarian": True, "contains_nuts": False, "cuisine": "Indian", "meal_type": "Snack"
            },

            # --- DINNER ---
            {
                "name": "Palak Paneer + 2 Rotis",
                "calories": 450, "protein_g": 18, "carbs_g": 40, "fats_g": 24,
                "is_vegetarian": True, "contains_nuts": False, "cuisine": "Indian", "meal_type": "Dinner"
            },
            {
                "name": "Moong Dal Khichdi + Ghee",
                "calories": 350, "protein_g": 12, "carbs_g": 50, "fats_g": 10,
                "is_vegetarian": True, "contains_nuts": False, "cuisine": "Indian", "meal_type": "Dinner"
            },
            {
                "name": "Grilled Chicken Salad",
                "calories": 320, "protein_g": 35, "carbs_g": 10, "fats_g": 12,
                "is_vegetarian": False, "contains_nuts": False, "cuisine": "Continental/Indian", "meal_type": "Dinner"
            },
            {
                "name": "Paneer Butter Masala + 1 Naan",
                "calories": 580, "protein_g": 18, "carbs_g": 50, "fats_g": 35,
                "is_vegetarian": True, "contains_nuts": True, "cuisine": "North Indian", "meal_type": "Dinner"
            },
            {
                "name": "Baingan Bharta + 2 Rotis",
                "calories": 340, "protein_g": 8, "carbs_g": 55, "fats_g": 10,
                "is_vegetarian": True, "contains_nuts": False, "cuisine": "Indian", "meal_type": "Dinner"
            },
            {
                "name": "Egg Curry (2 eggs) + Rice",
                "calories": 450, "protein_g": 18, "carbs_g": 50, "fats_g": 18,
                "is_vegetarian": False, "contains_nuts": False, "cuisine": "Indian", "meal_type": "Dinner"
            },
            {
                "name": "Mixed Veg Curry + 2 Rotis",
                "calories": 380, "protein_g": 10, "carbs_g": 58, "fats_g": 12,
                "is_vegetarian": True, "contains_nuts": True, "cuisine": "Indian", "meal_type": "Dinner"
            },
            {
                "name": "Mushroom Masala + 2 Rotis",
                "calories": 360, "protein_g": 12, "carbs_g": 50, "fats_g": 14,
                "is_vegetarian": True, "contains_nuts": True, "cuisine": "Indian", "meal_type": "Dinner"
            },
        ]

        # Bulk create recipes
        Recipe.objects.bulk_create([Recipe(**data) for data in recipes_data])
        
        self.stdout.write(self.style.SUCCESS(f'Successfully added {len(recipes_data)} recipes!'))