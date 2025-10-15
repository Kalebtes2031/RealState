#realstate_backend/galleries/models.py

from django.db import models
from properties.models import Property

class Gallery(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name="galleries")
    image = models.ImageField(upload_to="property_images/")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.property.name}"
