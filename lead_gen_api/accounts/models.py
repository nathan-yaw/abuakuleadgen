from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    # Add any additional fields here
    business_name = models.CharField(max_length=100)
    
    # Remove username field and use email as the identifier
    username = None
    email = models.EmailField(unique=True)
    
    # Add any additional fields you need
    # (first_name and last_name are already in AbstractUser)
    
    USERNAME_FIELD = 'email'  # Use email as the unique identifier
    REQUIRED_FIELDS = ['first_name', 'last_name', 'business_name']  # Fields required when creating user
    
    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.business_name})"