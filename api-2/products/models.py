from __future__ import unicode_literals
import uuid

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

class Product(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    name = models.CharField(max_length=100, default='NA')
    description = models.TextField(default='NA')
    slug = models.CharField(max_length=100, default='NA')

    #middleware_service = models.CharField(max_length=15, null=True)
    
    fee = models.IntegerField(default=0)
    
    OUTPUT_TYPE = [
        ('DO', 'Document'),
        ('IM', 'Image'),
        ('LI', 'List'),
    ]
    output_type = models.CharField(
        choices=OUTPUT_TYPE,
        max_length=2,
        default='CP'
    )    
    
    ctc = models.BooleanField(default=True)
    
    language = models.BooleanField(default=True)

    LANGUAGE= [
        ('EN', 'English'),
        ('MS', 'Malay'),
    ]
    language = models.CharField(
        choices=LANGUAGE,
        max_length=2,
        default='EN'
    )    

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['name']
    
    def __str__(self):
        return self.name


class CustomSearchQuota(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    fee = models.IntegerField(default=0)
    quota = models.IntegerField(default=0)
    
    PACKAGE_TYPE = [
        ('0A', 'Document'),
        ('0B', 'Document'),
        ('0C', 'Document'),
        ('0D', 'Document'),

        ('NA', 'Not Available'),
    ]
    package_type = models.CharField(
        choices=PACKAGE_TYPE,
        max_length=2,
        default='NA'
    )    

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)


