from django.contrib import admin
from .models import WeeklyPlan, DailyPlan, Meal, MealItem

@admin.register(WeeklyPlan)
class WeeklyPlanAdmin(admin.ModelAdmin):
    list_display = ['user', 'source', 'created_at', 'is_active']
    list_filter = ['source', 'is_active', 'created_at']
    search_fields = ['user__email']
    readonly_fields = ['target_calories', 'target_protein_g', 'target_carbs_g', 'target_fats_g', 'created_at', 'updated_at']

@admin.register(DailyPlan)
class DailyPlanAdmin(admin.ModelAdmin):
    list_display = ['weekly_plan', 'day', 'calories', 'is_locked']
    list_filter = ['is_locked']
    readonly_fields = ['calories', 'protein_g', 'carbs_g', 'fats_g']

@admin.register(Meal)
class MealAdmin(admin.ModelAdmin):
    list_display = ['meal_type', 'daily_plan', 'calories']
    list_filter = ['meal_type', 'is_locked']
    readonly_fields = ['calories', 'protein_g', 'carbs_g', 'fats_g']

@admin.register(MealItem)
class MealItemAdmin(admin.ModelAdmin):
    list_display = ['meal', 'food', 'quantity']
    search_fields = ['food__name']