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

from .models import (
    Transaction,
)

from .serializers import (
    TransactionSerializer,
    TransactionWithCartSerializer
)

class TransactionViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)



    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    

    def get_queryset(self):
        queryset = Transaction.objects.all()
        return queryset

    
    @action(methods=['GET'], detail=False)
    def with_cart(self, request, *args, **kwargs):  

        transactions = Transaction.objects.all()

        serializer = TransactionWithCartSerializer(transactions, many=True)
        return Response(serializer.data)


    @action(methods=['POST'], detail=False)
    def pg_return(self, request, *args, **kwargs):  

        transaction_id = request.POST.get("PaymentID", "")   
        url = 'https://portal.ssm.prototype.com.my/#/payment/return?transactionId=' + transaction_id
        return redirect(url)      



    @action(methods=['POST'], detail=True)
    def encode(self, request, *args, **kwargs):
        
        merchant_pwd = 'sm212345'
        encode_request = json.loads(request.body)
        transaction = self.get_object()
        payment_id = int(transaction.created_date.timestamp() * 1000)
        encoding_string = (
            'sm212345' 
            + 'SM2'
            + str(payment_id) 
            + encode_request['merchantReturnUrl']
            + encode_request['amount'] 
            + encode_request['currencyCode'] 
            + encode_request['custIP'] 
            + encode_request['pageTimeout']
        )

        print(encode_request)
        print(encoding_string)
        
        encoding_string = encoding_string.encode('utf-8')
        encoded_string = hashlib.sha256(encoding_string).hexdigest()
        print(encoded_string)

        encode_request['order_number'] = transaction.id
        encode_request['hash_value'] = encoded_string
        encode_request['payment_id'] = str(payment_id)

        transaction.reference_no = str(payment_id)
        transaction.save()
        
        return Response(encode_request)

 
    @action(methods=['PUT'], detail=True)
    def update_payment_status(self, request, *args, **kwargs):
        
        transaction = self.get_object()    
        current_time = datetime.datetime.now(tz=timezone.utc)

        transaction.payment_gateway_update_date = current_time
        transaction.save()

        
        serializer = TransactionSerializer(transaction)
        return Response(serializer.data)


    @action(methods=['GET'], detail=False)
    def ell(self, request, *args, **kwargs):        

        all_t = Transaction.objects.all()

        for tran in all_t:
            tran.delete()