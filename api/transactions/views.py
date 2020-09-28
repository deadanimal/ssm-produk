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
    Transaction,
    CartCBID,
    CartProduct,
    Reconcile
)

from .serializers import (
    TransactionSerializer,
    CartCBIDSerializer,
    CartProductSerializer,
    ReconcileSerializer
)

class TransactionViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'reference_no'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = Transaction.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Company.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = Transaction.objects.all()
            else:
                queryset = Transaction.objects.filter(company=company.id)
        """
        return queryset

    @action(methods=['POST'], detail=False)
    def pg_return(self, request, *args, **kwargs):  

        # url = 'http://localhost:4200/#/payment/return?transactionId=' + transaction_id
        transaction_id = request.POST.get("PaymentID", "")   
        url = 'https://portal.ssm.prototype.com.my/#/payment/return?transactionId=' + transaction_id

        return redirect(url)      
    
    @action(methods=['POST'], detail=True)
    def encode(self, request, *args, **kwargs):
        
        merchant_pwd = 'sm212345'
        # 'https://syafiqbasri.ngrok.io/v1/transactions/pg_return/'
        encode_request = json.loads(request.body)
        transaction = self.get_object()
        payment_id = int(transaction.created_date.timestamp() * 1000)
        encoding_string = (
            merchant_pwd 
            + 'SM2'
            + str(payment_id) 
            + 'https://ssm-product-api.pipe.my/v1/transactions/pg_return/'
            #+ encode_request['merchantReturnUrl']        
            + encode_request['amount'] 
            + encode_request['currencyCode'] 
            + encode_request['custIP'] 
            + encode_request['pageTimeout']
        )
        
        encoding_string = encoding_string.encode('utf-8')
        encoded_string = hashlib.sha256(encoding_string).hexdigest()

        encode_request['order_number'] = transaction.id
        encode_request['hash_value'] = encoded_string
        encode_request['payment_id'] = str(payment_id)

        transaction.reference_no = str(payment_id)
        transaction.save()
        
        return Response(encode_request)

    @action(methods=['GET'], detail=False)
    def encode_test(self, request, *args, **kwargs):
        
        merchant_pwd = 'sm212345'

        # encode_request = json.loads(request.body)
        # transaction = self.get_object()
        # Password + ServiceID + PaymentID + MerchantReturnURL + MerchantApprovalURL + MerchantUnApprovalURL + MerchantCallBackURL + Amount + CurrencyCode + CustIP + PageTimeout + CardNo + Token

        encoding_string = 'thebrocodeisourrule'
        encoding_string = encoding_string.encode('utf-8')

        encoded_string = hashlib.sha256(encoding_string).hexdigest()

        json_encoded_message = {
            'hashed': encoded_string
        }

        return Response(json_encoded_message)
 

class CartCBIDViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = CartCBID.objects.all()
    serializer_class = CartCBIDSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = CartCBID.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Company.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = CartCBID.objects.all()
            else:
                queryset = CartCBID.objects.filter(company=company.id)
        """
        return queryset    
 

class CartProductViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = CartProduct.objects.all()
    serializer_class = CartProductSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = CartProduct.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Company.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = CartProduct.objects.all()
            else:
                queryset = CartProduct.objects.filter(company=company.id)
        """
        return queryset    
 

class ReconcileViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Reconcile.objects.all()
    serializer_class = ReconcileSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = Reconcile.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Company.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = Reconcile.objects.all()
            else:
                queryset = Reconcile.objects.filter(company=company.id)
        """
        return queryset    
 
