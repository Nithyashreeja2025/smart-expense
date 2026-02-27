from django.db import models

from django.db import models

class Expense(models.Model):
    amount = models.FloatField()
    description = models.TextField()
    date = models.DateField()
    category = models.CharField(max_length=100)