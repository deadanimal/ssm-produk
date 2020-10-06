from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    Service,
    ServiceRequest,
    DocumentRequest,
    DocumentRequestItem,
    EgovernmentRequest
)





class ServiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Service
        fields = '__all__'

class ServiceRequestSerializer(serializers.ModelSerializer):

    service = ServiceSerializer()

    class Meta:
        model = ServiceRequest
        fields = '__all__'


class DocumentRequestItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = DocumentRequestItem
        fields = '__all__'  

class DocumentRequestSerializer(serializers.ModelSerializer):

    document_request_items = DocumentRequestItemSerializer(many=True)

    class Meta:
        model = DocumentRequest
        fields = '__all__'

class EgovernmentRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = EgovernmentRequest
        fields = '__all__'          
