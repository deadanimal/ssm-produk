from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    Cart,
    CartItem
)

from entities.serializers import EntitySerializer
from products.serializers import ProductSerializer



class CartSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cart
        fields = '__all__'


class CartItemSerializer(serializers.ModelSerializer):

    entity = EntitySerializer()
    product = ProductSerializer()

    class Meta:
        model = CartItem
        fields = '__all__'

class CartExtendedSerializer(serializers.ModelSerializer):

    cart_item = CartItemSerializer(many=True)

    class Meta:
        model = Cart
        fields = '__all__'