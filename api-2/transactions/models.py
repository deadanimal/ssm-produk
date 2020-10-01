# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import uuid

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

from carts.models import (
    Cart
)

from users.models import (
    CustomUser
)



class Transaction(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    total_amount = models.IntegerField(null=True)

    PAYMENT_STATUS = [
        ('OK', 'Successful'),
        ('FL', 'Failed'),
        ('PD', 'Pending'),

        ('NA', 'Not Available')
    ]
    
    payment_status = models.CharField(choices=PAYMENT_STATUS, max_length=2, default='PD')    
    payment_gateway_update_date = models.DateTimeField(null=True) 

    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, null=True)

    payment_gateway_order_id = models.IntegerField(default=0)

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)


class TransactionPayment(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)


    transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

