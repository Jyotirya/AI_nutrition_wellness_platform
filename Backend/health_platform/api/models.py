from django.db import models
from django.contrib.auth.models import User

class UserDetails(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='details')
    updated_at = models.DateTimeField(auto_now=True)
    height = models.FloatField(null=True)
    weight = models.FloatField(null=True)
    activity_level = models.CharField(max_length=255, default='moderate', null=True)
    exercise = models.CharField(max_length=255, null=True)
    workout_frequency = models.IntegerField(null=True)
    body_fat = models.FloatField(null = True)
    age = models.IntegerField(null=True)
    gender = models.CharField(max_length=255, null=True)
    food_preference = models.CharField(max_length=255, null=True)
    allergies = models.CharField(max_length=255, null=True)
    goal = models.CharField(max_length=255, null=True)
    cuisine = models.CharField(max_length=255, null= True)
    meals_per_day = models.IntegerField(null = True)
    snacking = models.BooleanField(null = True, default= True)
    onboarding_step = models.IntegerField(default=0, null=True)

    class Meta:
        db_table = 'user_details'

    def __str__(self):
        return f"{self.user.email} Details"
    

class Food(models.Model):
    name = models.CharField(max_length=255)
    region = models.JSONField(default=list, blank=True)
    type = models.JSONField(default=list, blank=True)
    category = models.JSONField(default=list, blank=True)
    allergy = models.JSONField(default=list, blank=True)
    serving = models.CharField(max_length=255, null=True, blank=True)
    total_weight_g = models.FloatField(null=True, blank=True)
    energy_kcal = models.FloatField(null=True, blank=True)
    proteins_g = models.FloatField(null=True, blank=True)
    carbohydrates_g = models.FloatField(null=True, blank=True)
    fats_g = models.FloatField(null=True, blank=True)
    fiber_g = models.FloatField(null=True, blank=True)
    carbon_footprint_kg = models.FloatField(null=True, blank=True)
    ingredients = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name


