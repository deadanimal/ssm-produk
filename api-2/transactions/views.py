import hashlib
import json
import datetime
import pytz
import uuid

from django.http import JsonResponse
from django.shortcuts import render,redirect
from django.db.models import Q
from django.utils import timezone
from django.core.files.storage import default_storage

from django.template.loader import render_to_string
from weasyprint import HTML, CSS
from django.core.files.storage import FileSystemStorage
from django.http import HttpResponse
from django.core.files.base import ContentFile
from django.conf import settings
from wsgiref.util import FileWrapper

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

from carts.models import (
    Cart,
    CartItem
)

class TransactionViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ['reference']


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

        reference = request.POST.get("PaymentID", "")   
        pg_transaction_id = request.POST.get("TxnID", "")
        # print('tt', request.POST.get("PymtMethod", ""))
        print(reference)
        print('tx', pg_transaction_id)
        transaction_method = request.POST.get("PymtMethod", "")
        transaction_status = request.POST.get("TxnStatus", "")[0]
        transaction = Transaction.objects.filter(reference=reference).first()

        print('\n')
        print(transaction.cart)
        cart = Cart.objects.filter(id=transaction.cart.id).first()
        print(cart.cart_status)

        timezone_ = pytz.timezone('Asia/Kuala_Lumpur')
        
        current_year = str(datetime.datetime.now(timezone_).year)
        current_month = str(datetime.datetime.now(timezone_).month)
        current_day = str(datetime.datetime.now(timezone_).day)
        
        filter_year = datetime.datetime.now(tz=timezone.utc).year
        filter_month = datetime.datetime.now(tz=timezone.utc).month
        filter_day = datetime.datetime.now(tz=timezone.utc).day

        transaction.transaction_id = pg_transaction_id
        transaction_id_unix = str(int(transaction.created_date.timestamp()))[-6:]
        # print('ori', int(transaction.created_date.timestamp()))
        # print('edite', transaction_id_unix)
        transaction.payment_method = transaction_method
        transaction.reference_no = 'P' + current_year + current_month + transaction_id_unix
        transaction_length = Transaction.objects.filter(
            Q(created_date__year=filter_year) &
            Q(created_date__month=filter_month) &
            Q(created_date__day=filter_day)
        ).count()
        transaction_running_no = "{0:0>6}".format(transaction_length)

        css_file = 'https://pipeline-project.sgp1.digitaloceanspaces.com/mbpp-elatihan/css/template.css'
        
        # return Response(serializer)

        # transaction 0 - successful
        if transaction_status == '0':
            transaction.payment_status = 'OK'
            transaction.payment_gateway_update_date = datetime.datetime.now(timezone_)

            transaction.receipt_no = 'PP' + current_year + current_month + current_day + transaction_running_no
            
            cart.cart_status = 'CM'

            cart_items = CartItem.objects.filter(cart=cart.id)

            for item in cart_items:
                product_length = CartItem.objects.filter(
                    Q(cart_item_type = 'PR') &
                    Q(order_no__isnull=False) &
                    Q(created_date__year=filter_year) &
                    Q(created_date__month=filter_month) &
                    Q(created_date__day=filter_day)
                ).count()
                order_running_no = "{0:0>6}".format(product_length)

                if item.cart_item_type == 'PR':
                    item.order_no = 'PD' + current_year + current_month + current_day + order_running_no
                    item.save()

            data_loaded = {
                'transaction': transaction,
                'cart_items': cart_items
            }
            # data_loaded['transaction'].created_date = datetime.datetime(data_loaded['transaction'].created_date).strftime("%Y-%m-%d")
            index_counter = 1

            for item in data_loaded['cart_items']:
                # item['index'] = index_counter
                index_counter = index_counter + 1

                if item.product:
                    # item.product.fee = format(item.product.fee/100, '.2f')
                    print('he')
                elif item.product_search_criteria:
                    # item.product_search_criteria.fee = format(item.product_search_criteria.fee/100, '.2f')
                    print('he')
                elif item.service_request:
                    # item.service_request.service.fee = format(item.service_request.service.fee/100, '.2f')
                    print('he')

            # data_loaded['transaction'].total_amount = format(data_loaded['transaction'].total_amount/100, '.2f')

            html_string = render_to_string('receipt/receipt.html', {'data': data_loaded})
            html = HTML(string=html_string)
            pdf_file = html.write_pdf(stylesheets=[CSS(css_file)])
            # pdf_file = html.write_pdf()
                
            file_path = "ssm/receipt/ssm-receipt" + "-" + datetime.datetime.utcnow().strftime("%s") + '.pdf'
            saved_file = default_storage.save(
                file_path, 
                ContentFile(pdf_file)
            )
                
            full_url_path = settings.MEDIA_ROOT + saved_file
            lol_ = file_path
            print(lol_)
            transaction.receipt = full_url_path
            
            transaction.save()
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
        url = 'https://portal.ssm.prototype.com.my/#/payment/return?transactionId=' + reference
        return redirect(url)      


    @action(methods=['POST'], detail=True)
    def encode(self, request, *args, **kwargs):
        
        timezone_ = pytz.timezone('Asia/Kuala_Lumpur')
        
        current_year = str(datetime.datetime.now(timezone_).year)
        current_month = str(datetime.datetime.now(timezone_).month)
        current_day = str(datetime.datetime.now(timezone_).day)
        
        filter_year = datetime.datetime.now(tz=timezone.utc).year
        filter_month = datetime.datetime.now(tz=timezone.utc).month
        filter_day = datetime.datetime.now(tz=timezone.utc).day

        transaction_length = Transaction.objects.filter(
            Q(created_date__year=filter_year) &
            Q(created_date__month=filter_month) &
            Q(created_date__day=filter_day)
        ).count()
        transaction_running_no = "{0:0>6}".format(transaction_length)

        merchant_pwd = 'sm212345'
        encode_request = json.loads(request.body)
        transaction = self.get_object()
        payment_id = current_year + current_month + current_day + transaction_running_no
        encoding_string = (
            'sm212345' 
            + 'SM2'
            + payment_id
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
        encode_request['payment_id'] = payment_id

        transaction.reference = payment_id
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
        current_time = datetime.datetime.now(tz=timezone.utc)
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



# Dari app pass reference to PG : 20201012000001
# PG pass transaction_id: SM00000020201012000001
# Reference ID : P20201012000001
# Receipt ID: PP20201012000001
# Order ID: FOC20201012000001, FOCGOV20201012000001, PD20201012000001, RESP20201012000001, CBID20201012000001, 