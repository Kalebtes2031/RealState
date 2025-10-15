#realstate_backend/users/models.py

from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    display_name = models.CharField(max_length=100, blank=True)
    avatar = models.ImageField(upload_to="avatars/", blank=True, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.display_name or self.email


class Agent(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="agent_profile")
    phone = models.CharField(max_length=20)
    bio = models.TextField(blank=True)

    def __str__(self):
        return f"Agent: {self.user.display_name or self.user.email}"
