from __future__ import unicode_literals
import json
import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models

from django.contrib.postgres.fields import ArrayField
from phonenumber_field.modelfields import PhoneNumberField
from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

class CustomUser(AbstractUser):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, blank=True)
    profile_picture = models.ImageField(null=True, upload_to=PathAndRename('images'))

    home_number = PhoneNumberField(blank=True)
    office_number = PhoneNumberField(blank=True)
    mobile_number = PhoneNumberField(blank=True)

    birth_date = models.DateTimeField(null=True)
    nric = models.CharField(max_length=12, default='NA')    

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

