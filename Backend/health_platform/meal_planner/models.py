
from django.db import models
from django.contrib.auth.models import User
from api.models import Food

class WeeklyPlan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="weekly_plans")
    start_date = models.DateField()
    end_date = models.DateField()
    source = models.CharField(
        max_length=20,
        choices=[("rule","Rule"),("ml","ML"),("manual","Manual")],
        default="rule"
    )
    notes = models.CharField(max_length=500, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "weekly_plan"
        ordering = ["-created_at"]
    
    def __str__(self):
        return f"{self.user.email} | {self.start_date}"


class DailyPlan(models.Model):
    weekly_plan = models.ForeignKey(WeeklyPlan, on_delete=models.CASCADE, related_name="days")
    date = models.DateField()
    target_calories = models.IntegerField()
    protein_g = models.IntegerField()
    carbs_g = models.IntegerField()
    fats_g = models.IntegerField()
    is_locked = models.BooleanField(default=False)

    class Meta:
        unique_together = ("weekly_plan", "date")

    def __str__(self):
        return f"{self.weekly_plan} | {self.date}"


class Meal(models.Model):
    daily_plan = models.ForeignKey(DailyPlan, on_delete=models.CASCADE, related_name="meals")
    meal_type = models.CharField(
        max_length=20,
        choices=[("Breakfast","Breakfast"),("Lunch","Lunch"),("Snack","Snack"),("Dinner","Dinner")]
    )
    is_locked = models.BooleanField(default=False)
    target_calories = models.IntegerField()

    class Meta:
        db_table = "meal"

    def __str__(self):
        return f"{self.meal_type} | {self.daily_plan.date}"


class MealItem(models.Model):
    meal = models.ForeignKey(
        Meal,
        on_delete=models.CASCADE,
        related_name="items"
    )

    food = models.ForeignKey(
        Food,
        on_delete=models.CASCADE
    )

    quantity = models.FloatField(
        help_text="Multiplier of serving size",
        default=1.0
    )

    calories = models.FloatField()
    protein_g = models.FloatField()
    carbs_g = models.FloatField()
    fats_g = models.FloatField()

    class Meta:
        db_table = "meal_item"

