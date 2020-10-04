from __future__ import unicode_literals
import uuid

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename



class Quota(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    QOUTA_TYPE = [
        ('0A', 'Package A'),
        ('0B', 'Package B'),
        ('0C', 'Package C'),
        ('0D', 'Package D'),
    ]
    quota_type  = models.CharField(
        choices=QOUTA_TYPE ,
        max_length=2,
        default='EN'
    )    
    
    quota = models.IntegerField(default=0)

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)


