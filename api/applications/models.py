from __future__ import unicode_literals
import uuid

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

from users.models import (
    CustomUser
)

from products.models import (
    Product
)

class CBIDApplication(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    requestor = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    
    ENTITY_TYPE = [
        ('ROB', 'Registration of Business'),
        ('ROC', 'Registration of Company')
    ]
    entity_type = models.CharField(choices=ENTITY_TYPE, max_length=3, default='ROB')

    PRODUCT_TYPE = [
        ('BT', 'Both'),
        ('LT', 'Listing'),
        ('PD', 'Product')
    ]
    product_type = models.CharField(choices=PRODUCT_TYPE, max_length=2, default='BT')

    STATUS_TYPE = [
        ('PG', 'Pending'),
        ('PD', 'Paid')
    ]
    status = models.CharField(choices=STATUS_TYPE, max_length=2, default='PG')
    
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    paid_date = models.DateTimeField(blank=True, null=True)

    class meta:
        ordering = ['requestor']
    
    def __str__(self):
        return self.entity_type

