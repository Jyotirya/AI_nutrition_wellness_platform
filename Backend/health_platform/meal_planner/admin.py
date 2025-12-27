
from django.contrib import admin
from .models import WeeklyPlan, DailyPlan, Meal, MealFood

admin.site.register(WeeklyPlan)
admin.site.register(DailyPlan)
admin.site.register(Meal)
admin.site.register(MealFood)
