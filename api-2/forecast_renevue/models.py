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


class ForecastRevenue(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    target_year = models.IntegerField(default=0)
    target_jan = models.IntegerField(default=0)
    target_feb = models.IntegerField(default=0)
    target_mar = models.IntegerField(default=0)
    target_apr = models.IntegerField(default=0)
    target_may = models.IntegerField(default=0)
    target_jun = models.IntegerField(default=0)
    target_jul = models.IntegerField(default=0)
    target_aug = models.IntegerField(default=0)
    target_sep = models.IntegerField(default=0)
    target_oct = models.IntegerField(default=0)
    target_nov = models.IntegerField(default=0)
    target_dec = models.IntegerField(default=0)

    created_by = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, null=True)

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['name']

    def __str__(self):
        return self.name
