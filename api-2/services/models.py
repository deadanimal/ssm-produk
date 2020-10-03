# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import uuid

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

from users.models import (
    CustomUser
)


class Service(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    SERVICE_TYPE = [
        ('CB', 'CBID'),
        ('IN', 'Investigation'),

        ('NA', 'Not Available')
    ]
    
    service_type = models.CharField(choices=SERVICE_TYPE, max_length=2, default='PD')    
    remarks = models.TextField(null=True)
    completed = models.BooleanField(null=True)

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['created_date']
 