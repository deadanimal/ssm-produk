from __future__ import unicode_literals
import uuid

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

from applications.models import (
    CBIDApplication
)

# class Purchase(models.Model):

#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     name = models.CharField(max_length=100, default='NA')

#     created_date = models.DateTimeField(auto_now_add=True)
#     modified_date = models.DateTimeField(auto_now=True)

#     class meta:
#         ordering = ['name']
    
#     def __str__(self):
#         return self.name


class CBIDCart(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    products = models.ManyToManyField(CBIDApplication)
    search_criteria = models.CharField(max_length=255, default='NA')
    total_pages = models.IntegerField(default=51)
    total_company = models.IntegerField(default=1360941)
    unit_price = models.FloatField(default=30)
    total_price = models.FloatField(default=30)
    total = models.IntegerField(default=1)
    sst = models.FloatField(default=1.8)
    total_amount = models.FloatField(default=31.8)

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['created_date']
    
    def __str__(self):
        return self.id
    

# class Cart(models.Model):

#     id = models.UUIDField(primary_key=True, default=uuid.uuid, editable=False)
#     name = models.CharField(max_length=100, default='NA')
#     total_price = models.FloatField(default=0)
#     total_document = models.IntegerField(default=0)
#     total_amount = models.IntegerField(default=0)

#     created_date = models.DateTimeField(auto_now_add=True)
#     modified_date = models.DateTimeField(auto_now=True)

#     class meta:
#         ordering = ['name']
    
#     def __str__(self):
#         return self.name

# class CartItem(models.Model):

#     id = models.UUIDField(primary_key=True, default=uuid.uuid, editable=False)
#     product = models.ManyToManyField()
#     cart = models.ForeignKey(Cart)

#     created_date = models.DateTimeField(auto_now_add=True)
#     modified_date = models.DateTimeField(auto_now=True)

#     class meta:
#         ordering = ['created_date']
    
#     def __str__(self):
#         return self.created_date

# class Checkout(models.Model):

#     id = models.UUIDField(primary_key=True, default=uuid.uuid, editable=False)
