from __future__ import unicode_literals
import uuid

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename
from entities.models import Entity


class Quota(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    QOUTA_TYPE = [
        ('0A', 'Custom Listing A'),
        ('0B', 'Custom Listing B'),
        ('0C', 'Custom Listing C'),
        ('0D', 'Custom Listing D'),

        ('K1', 'KJAKP Package 1'),
        ('K2', 'KJAKP Package 2'),
        ('K3', 'KJAKP Package 3'),
        ('K4', 'KJAKP Package 4'),

        ('IM', 'Image Search'),
    ]
    quota_type  = models.CharField(
        choices=QOUTA_TYPE ,
        max_length=2,
        default='EN'
    )    
    
    quota = models.IntegerField(default=0)
    entity = models.ForeignKey(Entity, on_delete=models.CASCADE, null=True)

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)


