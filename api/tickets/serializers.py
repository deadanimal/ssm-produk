from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    Ticket,
    TicketCBID,
    TicketInvestigation
)

class TicketSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ticket
        fields = '__all__'


class TicketCBIDSerializer(serializers.ModelSerializer):

    class Meta:
        model = TicketCBID
        fields = '__all__'


class TicketInvestigationSerializer(serializers.ModelSerializer):

    class Meta:
        model = TicketInvestigation
        fields = '__all__'

