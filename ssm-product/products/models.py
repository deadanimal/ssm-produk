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
from notifications.models import Notification
from projects.models import Project
from submissions.models import Submission
from users.models import CustomUser


class Diagram(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(null=True, max_length=255)
    code = models.TextField(null=True)

    CLASS_TYPE = [

        ('PR', 'Project'),
        ('SM', 'Submission'),     

        ('NA', 'Not Available'),   
    ]

    class_type = models.CharField(
        max_length=2,
        choices=CLASS_TYPE,
        default='NA',
    )  

    DIAGRAM_TYPE = [

        ('DP', 'Datatable'),
        ('PF', 'Process Flow'),     

        ('NA', 'Not Available'),   
    ]

    diagram_type = models.CharField(
        max_length=2,
        choices=DIAGRAM_TYPE,
        default='NA',
    )      

    project = models.ForeignKey(Project, on_delete=models.CASCADE, null=True)
    submission = models.ForeignKey(Submission, on_delete=models.CASCADE, null=True)

    creator = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    created_date = models.DateTimeField(auto_now=True)    

    history = HistoricalRecords()

    def __str__(self):
        return self.name
