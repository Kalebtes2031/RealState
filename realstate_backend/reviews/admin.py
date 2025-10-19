from django.contrib import admin
from .models import Review

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('property', 'user', 'rating', 'comment', 'created_at')
    list_filter = ('property', 'rating')
    search_fields = ('property__name', 'user__email', 'comment')
