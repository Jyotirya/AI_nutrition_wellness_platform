
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .services import MealPlanService
from users.models import UserDetails

class GenerateWeeklyPlanView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_details = UserDetails.objects.get(user=request.user)
        service = MealPlanService()
        data = service.generate_weekly_plan(user_details)
        return Response(data)
