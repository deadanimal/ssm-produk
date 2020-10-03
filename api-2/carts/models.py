# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import uuid

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

from entities.models import (
    Entity
)

from products.models import (
    Product
)

from services.models import (
    ServiceRequest
)

from users.models import (
    CustomUser
)



class Cart(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    total_price_before_tax = models.IntegerField(default=0)
    total_tax = models.IntegerField(default=0)
    total_tax_after_tax = models.IntegerField(default=0)

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['created_date']
    


class CartItem(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    CART_ITEM_TYPE = [
        ('PR', 'Product'),
        ('SE', 'Service'),

        ('NA', 'Not Available')
    ]
    cart_item_type = models.CharField(choices=CART_ITEM_TYPE, max_length=2, default='NA')

    cart = models.ForeignKey(Cart, related_name='cart_item', on_delete=models.CASCADE, null=True)

    entity = models.ForeignKey(Entity, on_delete=models.CASCADE, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    service_request = models.ForeignKey(ServiceRequest, on_delete=models.CASCADE, null=True)

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['created_date']
