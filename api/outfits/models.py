# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import uuid

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

class Outfit(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')
    registration_number = models.CharField(max_length=15, default='NA')

    LOCAL_OR_FOREIGN = [
        ('LC', 'Local'),
        ('FR', 'Foreign')
    ]
    local_or_foreign = models.CharField(
        choices=LOCAL_OR_FOREIGN, 
        max_length=2, 
        default='LC'
    )

    TYPE_OF_ENTITY= [
        ('AD', 'Audit'),
        ('BS', 'Business'),
        ('CP', 'Company'),
        ('CS', 'Cosec')
    ]
    type_of_entity = models.CharField(
        choices=TYPE_OF_ENTITY,
        max_length=2,
        default='CP'
    )

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['name']
    
    def __str__(self):
        return self.name