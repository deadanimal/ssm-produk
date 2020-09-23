from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    Transaction,
    CartCBID,
    CartProduct,
    Reconcile
)

class TransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transaction
        fields = '__all__'


class CartCBIDSerializer(serializers.ModelSerializer):

    class Meta:
        model = CartCBID
        fields = '__all__'


class CartProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = CartProduct
        fields = '__all__'


class ReconcileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reconcile
        fields = '__all__'

