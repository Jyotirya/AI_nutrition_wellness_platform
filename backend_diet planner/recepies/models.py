from django.db import models

# Create your models here.
class Recipe(models.Model):
    name = models.CharField(max_length=200)
    calories = models.FloatField()
    protein_g = models.FloatField()
    carbs_g = models.FloatField()
    fats_g = models.FloatField()
    
    # Metadata for filtering
    is_vegetarian = models.BooleanField(default=False)
    contains_nuts = models.BooleanField(default=False)
    cuisine = models.CharField(max_length=50) # e.g., "Indian"
    meal_type = models.CharField(max_length=20) # "Breakfast", "Lunch", "Dinner", "Snack"

    def __str__(self):
        return self.name
    