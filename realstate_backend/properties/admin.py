from django.contrib import admin
from .models import Property
from galleries.models import Gallery
from reviews.models import Review

# Inline for galleries
class GalleryInline(admin.TabularInline):
    model = Gallery
    extra = 1  # 1 blank gallery field when editing

# Inline for reviews
class ReviewInline(admin.TabularInline):
    model = Review
    extra = 1

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'address', 'price', 'bedrooms', 'bathrooms', 'agent', 'created_at')
    list_filter = ('type', 'bedrooms', 'bathrooms', 'agent')
    search_fields = ('name', 'address', 'agent__user__display_name', 'agent__user__email')
    inlines = [GalleryInline, ReviewInline]
