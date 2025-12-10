from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    # Inherits: username, password, email, first_name, last_name, etc.
    # Plus your custom fields:
    height = models.FloatField(null=True)
    weight = models.FloatField(null=True)
    activity_level = models.CharField(max_length=20, default='moderate')
    age = models.IntegerField(null=True)
    gender = models.CharField(max_length=10)
    exercise = models.CharField(max_length=20) 
    food_preference = models.CharField(max_length=20)
    allergies = models.CharField(max_length=20)
    goal = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email
    
    class Meta:
        db_table = "users"              # custom table name
        ordering = ["-created_at"]      # default ordering
        verbose_name = "user"           # name in admin
        verbose_name_plural = "users"
        unique_together = [("email",)]

