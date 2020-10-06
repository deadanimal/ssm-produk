import hashlib
import json
import datetime

from django.http import JsonResponse
from django.shortcuts import render,redirect
from django.db.models import Q

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from .models import (
    Service,
    ServiceRequest,
    DocumentRequest,
    DocumentRequestItem,
    EgovernmentRequest
)

from .serializers import (
    ServiceSerializer,
    ServiceRequestSerializer,
    DocumentRequestSerializer,
    DocumentRequestItemSerializer   ,
    EgovernmentRequestSerializer 
)

from carts.models import Cart, CartItem
from carts.serializers import CartItemSerializer, CartSerializer
from transactions.models import Transaction
 

class ServiceViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = Service.objects.all()

        return queryset    

    @action(methods=['GET'], detail=False)
    def status(self, request, *args, **kwargs):        

        status = request.GET.get('q', '')
        
        if status == 'created':

            transactions = Transaction.objects.filter(Q(payment_status='PD') | Q(payment_status='FL'))
            carts = Cart.objects.filter(cart_item_type='SE')
            cart_items = CartItem.objects.filter(cart=carts)
            services_ = Service.objects.filter(service_type='CB', completed=False)

            services = transactions | carts | cart_items | services_
            

        elif status == 'paid':
            transactions = Transaction.objects.filter(payment_status='OK')
            carts = Cart.objects.filter(cart_item_type='SE')
            cart_items = CartItem.objects.filter(cart=carts)
            services_ = Service.objects.filter(service_type='CB', completed=False)

            services = transactions | carts | cart_items | services_

        elif status == 'completed':
            services = Service.objects.filter(service_type='CB', completed=True)
        else:
            return Response('Query q is empty or wrong!')

        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data)

    @action(methods=['POST'], detail=False)
    def request(self, request, *args, **kwargs):       

        json_body = json.loads(request.body)  

        service_id = json_body['service_id']
        service = Service.objects.get(id=str(service_id))

        name = json_body['name']
        organisation = json_body['organisation']
        address = json_body['address']
        # address1 = json_body['# address1']
        # address2 = json_body['# address2']
        # address3 = json_body['# address3']
        # postcode = json_body['# postcode']
        # country = json_body['# country']
        # city = json_body['# city']
        email_address = json_body['email']
        phone_number = json_body['phone_number']

        service_request = ServiceRequest.objects.create(
            service=service,
            name=name,
            organisation=organisation,
            address=address,
            email_address=email_address,
            phone_number=phone_number
        )

        serializer = ServiceRequestSerializer(service_request)
        return Response(serializer.data)



class ServiceRequestViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = ServiceRequest.objects.all()
    serializer_class = ServiceRequestSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = ServiceRequest.objects.all()

        return queryset   

    @action(methods=['GET'], detail=False)
    def report(self, request, *args, **kwargs):   

        service_requests = ServiceRequest.objects.all()

        serializer = ServiceRequestSerializer()

        new_list = []

        for service_request in service_requests:
            serializer = ServiceRequestSerializer(service_request)
            data_ = serializer.data
            cart_item = CartItem.objects.filter(service_request=service_request).first()
            cart_item_serializer = CartItemSerializer(cart_item)
            data_['transaction'] = cart_item_serializer.data
            new_list.append(data_)
        
        return Response(new_list)        

    @action(methods=['POST'], detail=True)
    def mark_as_complete(self, request, *args, **kwargs):       

        json_body = json.loads(request.body)  

        service_request = self.get_object()

        service_request.completed = True
        service_request.completed_date = json_body['completed_date']
        service_request.remarks = json_body['remarks']
        service_request.save()

        serializer = ServiceRequestSerializer(service_request)
        return Response(serializer.data)



class DocumentRequestViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = DocumentRequest.objects.all()
    serializer_class = DocumentRequestSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = DocumentRequest.objects.all()

        return queryset    



class DocumentRequestItemViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = DocumentRequestItem.objects.all()
    serializer_class = DocumentRequestItemSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = DocumentRequestItem.objects.all()

        return queryset   

class EgovernmentRequestViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = EgovernmentRequest.objects.all()
    serializer_class = EgovernmentRequestSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = EgovernmentRequest.objects.all()

        return queryset         