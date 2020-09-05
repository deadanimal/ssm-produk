from __future__ import unicode_literals 
import uuid 
import datetime
from django.db import models
from django.utils.formats import get_format

from django.contrib.gis.db import models
from simple_history.models import HistoricalRecords
from django.core.validators import MaxValueValidator, MinValueValidator

from core.helpers import PathAndRename

from organisations.models import Organisation
from users.models import CustomUser


class Call(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(null=True, max_length=255)

    history = HistoricalRecords()

    def __str__(self):
        return self.name
