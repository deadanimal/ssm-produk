import hashlib
import json
import datetime

from django.http import JsonResponse
from django.shortcuts import render,redirect
from django.db.models import Q
from django.utils import timezone

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from entities.models import Entity
from products.models import Product, ProductSearchCriteria
from services.models import Service, ServiceRequest
from quotas.models import Quota

from .models import (
    Cart,
    CartItem
)

from .serializers import (
    CartSerializer,
    CartExtendedSerializer,
    CartItemSerializer
)

from transactions.models import Transaction

from users.models import CustomUser

class CartViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ['user', 'cart_status']

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = Cart.objects.all()
        return queryset    

    @action(methods=['POST'], detail=False)
    def check_cart(self, request, *args, **kwargs):

        request_ = json.loads(request.body)
        request_user_id_ = request_['user']

        request_user_ = CustomUser.objects.filter(
            id=request_user_id_
        ).first()
        
        cart_ = Cart.objects.filter(
            user=request_user_id_,
            cart_status='CR'
        ).first()
        print('hello', cart_)
        
        if cart_:
            print('ada')
            serializer = CartExtendedSerializer(cart_)
        else:
            print('xde')
            new_cart_ = Cart.objects.create(
                user=request_user_
            )
            serializer = CartExtendedSerializer(new_cart_)
        
        return Response(serializer.data)
        

    @action(methods=['GET'], detail=True)
    def with_item(self, request, *args, **kwargs):  

        cart = self.get_object()

        serializer = CartExtendedSerializer(cart)
        return Response(serializer.data)
    
    @action(methods=['POST'], detail=True)
    def add_item_to_cart(self, request, *args, **kwargs):    

        cart_item_request = json.loads(request.body)   

        # Item product
        if cart_item_request['item_type'] == 'product':
            entity_id = cart_item_request['entity']
            product_id = cart_item_request['product']
            image_version_id = cart_item_request['image_version_id']
            image_form_type = cart_item_request['image_form_type']
            year1 = cart_item_request['year1']
            year2 = cart_item_request['year2']

            cart = self.get_object()

            entity = Entity.objects.filter(id=entity_id).first()
            product = Product.objects.filter(id=product_id).first()

            cart_items = CartItem.objects.filter(cart=cart.id)
            print(cart_items)

            # Document and image
            if image_version_id:
                delta_ = datetime.timedelta(hours=24)
                current_time_ = datetime.datetime.now(tz=timezone.utc)
                date_filter_ = current_time_ - delta_

                user_id_ = cart_item_request['user']

                product_viewing_fee = Product.objects.filter(
                    slug='document_form_viewing_fee'
                ).first()

                print('prddd', product_viewing_fee)

                new_cart_item = CartItem.objects.create(
                    entity=entity, 
                    product=product, 
                    image_form_type=image_form_type,
                    image_version_id=image_version_id,
                    cart=cart,
                    cart_item_type='PR'
                )

                condition_paid = False
                condition_not_paid = False

                paid_carts = Cart.objects.filter(
                    user=user_id_,
                    paid=True,
                    modified_date__gte=date_filter_
                ).all()

                if paid_carts:
                    for paid_cart in paid_carts:
                        paid_cart_item = CartItem.objects.filter(
                            entity=entity,
                            product=product_viewing_fee,
                            cart=paid_cart
                        ).first()
                
                    if paid_cart_item:
                        condition_paid = True

                not_paid_cart = Cart.objects.filter(
                    user=user_id_,
                    paid=False
                ).first()

                if not_paid_cart:
                    not_paid_cart_item = CartItem.objects.filter(
                        user=user_id_,
                        entity=entity,
                        product=product_viewing_fee,
                        cart=not_paid_cart
                    ).first()

                    if not_paid_cart_item:
                        condition_not_paid = True
                

                if not condition_paid or not condition_not_paid:
                    CartItem.objects.create(
                        product=product_viewing_fee,
                        cart=cart,
                        entity=entity
                    )
                    print('Viewing fee not found')
                else:
                    # print('Viewing fee found')
                    # print('Paid', condition_paid)
                    # print('Not paid', condition_not_paid)
                    pass

            # Financial historical
            elif year1 and year2:
                new_cart_item = CartItem.objects.create(
                    entity=entity, 
                    product=product, 
                    year1=year1,
                    year2=year2,
                    cart= cart,
                    cart_item_type='PR'
                )
            
            # Products
            else:
                new_cart_item = CartItem.objects.create(
                    entity=entity, 
                    product=product, 
                    cart= cart,
                    cart_item_type='PR'
                )
        
        # Item service
        elif cart_item_request['item_type'] == 'service':
            service_request_id = str(cart_item_request['service_request_id'])
            service_request = ServiceRequest.objects.filter(id=service_request_id).first()

            cart = self.get_object()

            new_cart_item = CartItem.objects.create(
                service_request=service_request, 
                cart= cart,
                cart_item_type='SE'
            )

        # Item quota
        elif cart_item_request['item_type'] == 'quota':
            quota_id = str(cart_item_request['quota_id'])
            quota = Quota.objects.filter(id=quota_id).first()

            cart = self.get_object()

            new_cart_item = CartItem.objects.create(
                quota = quota,
                cart= cart,
                cart_item_type='QU'
            )  

        # Item search criteria
        elif cart_item_request['item_type'] == 'product_search_criteria':
            
            product_search_criteria_id = str(cart_item_request['product_search_criteria_id'])
            product_search_criteria = ProductSearchCriteria.objects.filter(id=product_search_criteria_id).first()

            cart = self.get_object()

            new_cart_item = CartItem.objects.create(
                product_search_criteria=product_search_criteria,
                cart= cart,
                cart_item_type='PS'
            )                                             
        
        # None the above
        else:
            pass

        serializer = CartExtendedSerializer(cart)
        return Response(serializer.data)


    @action(methods=['POST'], detail=True)
    def add_item_to_cart_bulk(self, request, *args, **kwargs):
        cart_item_request_ = json.loads(request.body)

        for item in cart_item_request_:
            pass

    @action(methods=['POST'], detail=True)
    def remove_item_from_cart(self, request, *args, **kwargs):  

        cart_item_id = json.loads(request.body)['cart_item_id']
        cart_item = CartItem.objects.filter(id=cart_item_id).first()
        
        cart = self.get_object()    

        cart.cart_item.remove(cart_item)
        cart.save()

        serializer = CartExtendedSerializer(cart)
        return Response(serializer.data)    
