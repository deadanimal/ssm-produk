import hashlib
import json
import datetime
import pytz

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
    TransactionWithCartSerializer,
    TransactionExtendedSerializer
)

from carts.models import Cart

class TransactionViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ['reference_no']



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
        # print('tt', request.POST.get("PymtMethod", ""))
        transaction_method = request.POST.get("PymtMethod", "")
        transaction_status = request.POST.get("TxnStatus", "")[0]
        transaction = Transaction.objects.filter(reference_no=transaction_id).first()

        print('\n')
        print(transaction.cart)
        cart = Cart.objects.filter(id=transaction.cart.id).first()
        print(cart.cart_status)

        # transaction 0 - successful
        if transaction_status == '0':
            transaction.payment_status = 'OK'
            transaction.payment_gateway_update_date = datetime.datetime.now(tz=timezone.utc)
            transaction.payment_method = transaction_method
            transaction.save()

            cart.cart_status = 'CM'
            cart.save()
            
        # transaction 1 - failed
        elif transaction_status == '1':
            transaction.payment_status = 'FL'
            transaction.payment_gateway_update_date = datetime.datetime.now(tz=timezone.utc)
            transaction.payment_method = transaction_method
            transaction.save()

            cart.cart_status = 'AB'
            cart.save()            
        # transaction 2 - pending
        elif transaction_status == '2':
            transaction.payment_status = 'PD'
            transaction.payment_gateway_update_date = datetime.datetime.now(tz=timezone.utc)
            transaction.payment_method = transaction_method
            transaction.save()
            
    
        # portal.ssm.prototype.com.my
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
    def latest_successful(self, request, *args, **kwargs): 

        user_id = request.GET.get('user', '') 

        delta = datetime.timedelta(days=7)      
        current_time = datetime.datetime.now()
        date_filter = current_time - delta

        all_latest_successful_transactions = Transaction.objects.filter(
            payment_status='OK',
            payment_gateway_update_date__gte=date_filter,
            cart__cart_status='CM', 
            cart__user_id=user_id,
        ).all()

        serializer = TransactionExtendedSerializer(all_latest_successful_transactions, many=True)
        return Response(serializer.data)


    @action(methods=['GET'], detail=False)
    def ell(self, request, *args, **kwargs):        

        all_t = Transaction.objects.all()

        for tran in all_t:
            tran.delete()

    @action(methods=['GET'], detail=False)
    def report(self, request, *args, **kwargs):        

        all_ok_transactions = Transaction.objects.filter(payment_status='OK').filter()
        serializer = TransactionExtendedSerializer(all_ok_transactions, many=True)
        return Response(serializer.data)
