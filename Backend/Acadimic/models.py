from django.db import models
from enum import Enum 

class MyEnum(Enum):
    COURS = 'Cours'
    TD = 'TD'
    TP = 'TP'

class Classroom(models.Model) :
    name = models.CharField(max_length=50)
    type = models.CharField(
        max_length=10,
        choices=[(tag.name, tag.value) for tag in MyEnum]  # Use Enum values as choices
    )
    capacity = models.IntegerField(default=0)
    has_projector = models.BooleanField(default=False)
    computers_count = models.IntegerField(default=0)



