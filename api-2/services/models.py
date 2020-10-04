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
    
    service_type = models.CharField(choices=SERVICE_TYPE, max_length=2, default='NA')    

    ENTITIES_TYPE = [
        ('RB', 'Registration of Business'),
        ('RC', 'Registration of Company'),

        ('NA', 'Not Available')
    ]

    fee = models.IntegerField(default=1000)
    
    entities_type = models.CharField(choices=ENTITIES_TYPE, max_length=2, default='NA')   

    PRODUCT_TYPE = [
        ('PR', 'Product'),
        ('LS', 'Listing'),

        ('NA', 'Not Available')
    ]
    
    product_type = models.CharField(choices=PRODUCT_TYPE, max_length=2, default='NA')           

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['created_date']

class ServiceRequest(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)        

    name = models.CharField(max_length=512, null=True)
    organisation = models.CharField(max_length=512, null=True) 
    address = models.CharField(max_length=512, null=True) 
    # address1 = models.CharField(max_length=512, null=True) 
    # address2 = models.CharField(max_length=512, null=True) 
    # address3 = models.CharField(max_length=512, null=True) 
    # postcode = models.CharField(max_length=512, null=True) 
    # country = models.CharField(max_length=512, null=True) 
    # city = models.CharField(max_length=512, null=True) 
    email_address = models.CharField(max_length=512, null=True) 
    phone_number = models.CharField(max_length=512, null=True) 

    service = models.ForeignKey(Service, on_delete=models.CASCADE, null=True)

    remarks = models.TextField(null=True)
    completed = models.BooleanField(default=False)
    completed_date = models.DateTimeField(null=True)

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['created_date']