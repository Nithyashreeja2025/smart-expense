from django.db import models
from django.db import models

class Expense(models.Model):
    amount = models.FloatField()
    description = models.TextField()
    date = models.DateField()
    location = models.CharField(max_length=200, null=True, blank=True)
# Create your models here.
