from django.db import models

class User(models.Model):
    Fullname = models.CharField(max_length=100)
    username = models.CharField(max_length=100 ,unique = True)
    email = models.EmailField(max_length=100 , unique=True)
    password = models.CharField(max_length=100)


