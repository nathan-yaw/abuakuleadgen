from django.db import models
from accounts.models import CustomUser
# Create your models here.

class leadTable(models.Model):
    name = models.CharField(max_length=300)
    data = models.JSONField()
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="leads")
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    
    def __str__(self):
        return self.name or "Unnamed Lead"