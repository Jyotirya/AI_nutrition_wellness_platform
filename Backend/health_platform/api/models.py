from django.db import models
from django.contrib.auth.models import User

class UserDetails(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='details')
    updated_at = models.DateTimeField(auto_now=True)
    height = models.FloatField(null=True)
    weight = models.FloatField(null=True)
    activity_level = models.CharField(max_length=255, default='moderate', null=True)
    age = models.IntegerField(null=True)
    gender = models.CharField(max_length=255, null=True)
    exercise = models.CharField(max_length=255, null=True) 
    food_preference = models.CharField(max_length=255, null=True)
    allergies = models.CharField(max_length=255, null=True)
    goal = models.CharField(max_length=255, null=True)
    onboarding_step = models.IntegerField(default=0, null=True)

    class Meta:
        db_table = 'user_details'

    def __str__(self):
        return f"{self.user.email} Details"

