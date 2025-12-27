
from django.urls import path
from .views import GenerateWeeklyPlanView

urlpatterns = [
    path("generate/", GenerateWeeklyPlanView.as_view(), name="generate-weekly-plan"),
]
