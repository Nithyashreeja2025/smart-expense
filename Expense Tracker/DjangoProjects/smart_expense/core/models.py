from django.db import models

class Expense(models.Model):
    amount = models.FloatField()
    description = models.TextField()
    date = models.DateField()
    category = models.CharField(max_length=100)
    location = models.CharField(max_length=200, null=True, blank=True)