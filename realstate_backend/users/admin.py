from django.contrib import admin
from .models import User, Agent

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'display_name', 'username', 'is_staff', 'is_active')
    search_fields = ('email', 'display_name', 'username')
    list_filter = ('is_staff', 'is_active', 'is_superuser')

@admin.register(Agent)
class AgentAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone')
    search_fields = ('user__email', 'user__display_name', 'phone')
