from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class UserProfile(models.Model):
    GENDER_CHOICES = [('M', 'Male'), ('F', 'Female')]
    GOAL_CHOICES = [('LOSE', 'Weight Loss'), ('GAIN', 'Weight Gain'), ('MAINTAIN', 'Maintenance')]
    ACTIVITY_CHOICES = [
        (1.2, 'Sedentary'), 
        (1.375, 'Lightly Active'), 
        (1.55, 'Moderately Active'), 
        (1.725, 'Very Active')
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    age = models.IntegerField()
    weight_kg = models.FloatField()
    height_cm = models.FloatField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    activity_level = models.FloatField(choices=ACTIVITY_CHOICES)
    goal = models.CharField(max_length=10, choices=GOAL_CHOICES)
    
    # Simple storage for allergies/preferences (could be ManyToMany for more complex filtering)
    is_vegetarian = models.BooleanField(default=False)
    allergies = models.JSONField(default=list)  # e.g., ["nuts", "dairy"]
    cuisine_preference = models.CharField(max_length=50, default="Indian")

    def __str__(self):
        return self.user.username