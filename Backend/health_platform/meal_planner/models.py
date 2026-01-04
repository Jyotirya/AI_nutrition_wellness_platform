from django.db import models
from django.contrib.auth.models import User
from api.models import Food, UserDetails

class WeeklyPlan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="weekly_plans")
    source = models.CharField(
        max_length=20,
        choices=[("rule","Rule"),("ml","ML"),("manual","Manual")],
        default="rule"
    )
    notes = models.CharField(max_length=500, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    # Auto-calculated fields (read-only)
    target_calories = models.IntegerField(editable=False)
    target_protein_g = models.IntegerField(editable=False)
    target_carbs_g = models.IntegerField(editable=False)
    target_fats_g = models.IntegerField(editable=False)

    class Meta:
        db_table = "weekly_plan"
        ordering = ["-created_at"]
    
    def __str__(self):
        return f"{self.user.email} | {self.created_at.date()}"


class DailyPlan(models.Model):
    weekly_plan = models.ForeignKey(WeeklyPlan, on_delete=models.CASCADE, related_name="days")
    day = models.IntegerField()  # 0=Monday, 6=Sunday
    # Auto-calculated fields
    calories = models.IntegerField(editable=False)
    protein_g = models.IntegerField(editable=False)
    carbs_g = models.IntegerField(editable=False)
    fats_g = models.IntegerField(editable=False)
    is_locked = models.BooleanField(default=False)

    class Meta:
        db_table = "daily_plan"
        ordering = ["day"]

    def __str__(self):
        return f"{self.weekly_plan} | Day {self.day}"

    def recalculate_macros(self):
        """Recalculate macros from meals"""
        meals = self.meals.all()
        self.calories = sum(m.calories for m in meals)
        self.protein_g = sum(m.protein_g for m in meals)
        self.carbs_g = sum(m.carbs_g for m in meals)
        self.fats_g = sum(m.fats_g for m in meals)
        self.save()


class Meal(models.Model):
    daily_plan = models.ForeignKey(DailyPlan, on_delete=models.CASCADE, related_name="meals")
    meal_type = models.CharField(
        max_length=20,
        choices=[("Breakfast","Breakfast"),("Lunch","Lunch"),("Snack","Snack"),("Dinner","Dinner"),("Appetizer","Appetizer")]
    )
    # Auto-calculated fields
    calories = models.IntegerField(editable=False)
    protein_g = models.IntegerField(editable=False)
    carbs_g = models.IntegerField(editable=False)
    fats_g = models.IntegerField(editable=False)
    is_locked = models.BooleanField(default=False)

    class Meta:
        db_table = "meal"
        ordering = ["meal_type"]

    def __str__(self):
        return f"{self.meal_type} | {self.daily_plan}"

    def recalculate_macros(self):
        """Recalculate macros from meal items"""
        items = self.items.all()
        self.calories = sum(int((item.food.energy_kcal or 0) * item.quantity) for item in items)
        self.protein_g = sum(int((item.food.proteins_g or 0) * item.quantity) for item in items)
        self.carbs_g = sum(int((item.food.carbohydrates_g or 0) * item.quantity) for item in items)
        self.fats_g = sum(int((item.food.fats_g or 0) * item.quantity) for item in items)
        self.save()


class MealItem(models.Model):
    meal = models.ForeignKey(Meal, on_delete=models.CASCADE, related_name="items")
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    quantity = models.FloatField(help_text="Multiplier of serving size", default=1.0)

    class Meta:
        db_table = "meal_item"

    def __str__(self):
        return f"{self.food.name} x{self.quantity} in {self.meal}"