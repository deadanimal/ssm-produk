# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import uuid

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

from products.models import (
    Product
)

from users.models import (
    CustomUser
)

from tickets.models import (
    TicketCBID
)

class CartProduct(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    entity = models.CharField(null=True, max_length=255)
    product_type = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    entity_registration_number = models.CharField(null=True, max_length=255)
    # product = models.ManyToManyField(Product)

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['created_date']
    
    # def __str__(self):
    #     return self.id


class Transaction(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')

    total_amount = models.IntegerField(null=True)
    reference_no = models.CharField(null=True, max_length=255)
    is_paid = models.BooleanField(default=False)

    cart = models.ForeignKey(CartProduct, on_delete=models.CASCADE, null=True)

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['name']
    
    # def __str__(self):
    #     return self.id


class CartCBID(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    ticket = models.ForeignKey(TicketCBID, on_delete=models.CASCADE, null=True)
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


class Reconcile(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['created_date']
    
    def __str__(self):
        return self.name