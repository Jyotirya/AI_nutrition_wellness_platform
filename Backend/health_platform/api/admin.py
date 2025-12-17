from django.contrib import admin
from .models import UserDetails
from django.contrib.auth.admin import UserAdmin

# Register your models here.
admin.site.site_header = "Health Platform Admin"
admin.site.index_title = "Health Platform Admin Portal"
admin.site.site_title = "Health Platform Admin"
admin.site.register(UserDetails)