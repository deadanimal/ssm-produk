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
    EgovernmentRequest,
    EgovernmentMinistry,
    EgovernmentDepartment
)

from .serializers import (
    ServiceSerializer,
    ServiceRequestSerializer,
    DocumentRequestSerializer,
    DocumentRequestExtendedSerializer,
    DocumentRequestItemSerializer,
    EgovernmentRequestSerializer,
    EgovernmentRequestExtendedSerializer,
    EgovernmentMinistrySerializer,
    EgovernmentDepartmentSerializer,
    EgovernmentDepartmentExtendedSerializer
)

from carts.models import Cart, CartItem
from carts.serializers import CartItemSerializer, CartSerializer
from transactions.models import Transaction
from users.models import CustomUser

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


    @action(methods=['GET'], detail=True)
    def with_item(self, request, *args, **kwargs):  

        document_request = self.get_object()

        serializer = DocumentRequestExtendedSerializer(document_request)
        return Response(serializer.data)


    @action(methods=['POST'], detail=True)
    def add_item_to_document_request(self, request, *args, **kwargs):    

        document_request_item_request = json.loads(request.body) 
        image_version_id = document_request_item_request['image_version_id']
        image_form_type = document_request_item_request['image_form_type']

        timezone_ = pytz.timezone('Asia/Kuala_Lumpur')
        
        current_year = str(datetime.datetime.now(timezone_).year)
        current_month = str(datetime.datetime.now(timezone_).month)
        current_day = str(datetime.datetime.now(timezone_).day)
        
        filter_year = datetime.datetime.now(tz=timezone.utc).year
        filter_month = datetime.datetime.now(tz=timezone.utc).month
        filter_day = datetime.datetime.now(tz=timezone.utc).day

        running_no_1_ = DocumentRequestItem.objects.filter(
            Q(reference_no__isnull=False) &
            Q(created_date__year=filter_year) &
            Q(created_date__month=filter_month) &
            Q(created_date__day=filter_day)
        ).count()

        running_no_2_ = EgovernmentRequest.objects.filter(
            Q(reference_no__isnull=False) &
            Q(created_date__year=filter_year) &
            Q(created_date__month=filter_month) &
            Q(created_date__day=filter_day)
        ).count()

        running_no_ = "{0:0>6}".format(running_no_1_ + running_no_2_)
        
        document_request = self.get_object()
            
        new_document_request_item = DocumentRequestItem.objects.create(
            image_form_type=image_form_type,
            image_version_id=image_version_id,
            document_request=document_request,
            running_no='EGOV'+ current_year + current_month + current_day + running_no_
        )

        serializer = DocumentRequestExtendedSerializer(document_request)
        return Response(serializer.data)


    @action(methods=['POST'], detail=True)
    def remove_item_from_document_request(self, request, *args, **kwargs):  

        document_request_item_id = json.loads(request.body)['document_request_item_id']
        document_request_item = DocumentRequestItem.objects.filter(id=document_request_item_id).first()
        
        document_request = self.get_object()    

        document_request.document_request_item.remove(document_request_item)
        document_request.save()

        serializer = DocumentRequestExtendedSerializer(document_request)
        return Response(serializer.data)              


    @action(methods=['POST'], detail=False)
    def user_request(self, request, *args, **kwargs):

        user_request_item = json.loads(request.body)
        user_ = user_request_item['user']

        requests = DocumentRequest.objects.filter(user=user_).order_by('-created_date')

        serializer = DocumentRequestExtendedSerializer(requests, many=True)
        return Response(serializer.data)

    @action(methods=['POST'], detail=False)
    def accept_request(self, request, *args, **kwargs):

        document_request_item_id = json.loads(request.body)['document_request_item_id']
        # document_request_item_id = json.loads(request.body)['document_request_item_id']
        document_request_item = DocumentRequestItem.objects.filter(id=document_request_item_id).first()

        document_request = self.get_object()    

        document_request.document_request_item.approved = True
        document_request.document_request_item.approved_date = datetime.now()
        document_request.save()

        serializer = DocumentRequestExtendedSerializer(document_request)
        return Response(serializer.data)
    
    @action(methods=['GET'], detail=False)
    def all_with_item(self, request, *args, **kwargs):

        queryset = DocumentRequest.objects.all()
        serializer_class = DocumentRequestExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data)
    

class EgovernmentRequestViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = EgovernmentRequest.objects.all()
    serializer_class = EgovernmentRequestSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        # 'egov_request'
    ]
    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = EgovernmentRequest.objects.all()

        return queryset  
    

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):

        queryset = EgovernmentRequest.objects.all().order_by('-modified_date')
        serializer_class = EgovernmentRequestExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data)


    @action(methods=['POST'], detail=True)
    def approve_user(self, request, *args, **kwargs):    

        egovernment_request_json = json.loads(request.body)    
        user_id = egovernment_request_json['user_id']
        package = egovernment_request_json['package']
        quota = egovernment_request_json['quota']
        expired_date = egovernment_request_json['expired_date']
        remarks = egovernment_request_json['remarks']
        egovernment_request_ = self.get_object()

        user = CustomUser.objects.filter(id=str(user_id)).first()

        egovernment_request_.egov_request = 'AP'
        egovernment_request_.egov_package = int(package)
        egovernment_request_.egov_quota = int(quota)
        egovernment_request_.expired_date = expired_date
        egovernment_request_.remarks = remarks
        egovernment_request_.save()

        user.egov_quota = int(quota)
        user.egov_package = int(package)
        user.egov_expired_date = expired_date
        user.save()
            
        serializer = EgovernmentRequestSerializer(egovernment_request_)
        return Response(serializer.data)            

    @action(methods=['POST'], detail=True)
    def approve_request(self, request, *args, **kwargs):

        request_ = json.loads(request.body)
        request_type = request_['request_type']
        remarks = request_['remarks']

        egovernment_request_ = self.get_object()
        user = CustomUser.objects.filter(id=str(egovernment_request_.user)).first()

        if request_type == 'quota':
            quota_ = request_['quota']
            egovernment_request_.quota = int(quota_)
            egovernment_request_.request_status = 'AP'
            egovernment_request_.remarks = remarks
            egovernment_request_.save()

            user.egov_quota = int(quota)
            user.save()
        elif request_type == 'update':
            print('update')
            user.position_and_grade = egovernment_request_['position_and_grade']
            user.phone_number = egovernment_request_['phone_number']
            user.hod_name = egovernment_request_['head_of_department_name']
            user.hod_position = egovernment_request_['head_of_department_position']
            user.hod_email = egovernment_request_['head_of_department_email']
            user.ministry_name = egovernment_request_['ministry_name']
            user.department_name = egovernment_request_['department_name']
            user.agency_name = egovernment_request_['agency_name']
            user.attachment_letter = egovernment_request_['attachment_letter']
            user.address_1 = egovernment_request_['address_1']
            user.address_2 = egovernment_request_['address_2']
            user.address_3 = egovernment_request_['address_3']
            user.postcode = egovernment_request_['postcode']
            user.city = egovernment_request_['city']
            user.state = egovernment_request_['state']
            user.save()

            egovernment_request_.request_status = 'AP'
            egovernment_request_.remarks = remarks
            egovernment_request_.save()
        elif request_type == 'renew':
            print('renew')
            hod_name = request_['head_of_department_name']
            hod_position = request_['head_of_department_position']
            hod_email = request_['head_of_department_email']
            attachment_letter = request_['attachment_letter']
            expired_date = ['expired_date']

            user.egov_quota = 1000
            egov_expired_date = expired_date
            user.save()

            egovernment_request_.expired_date = expired_date
            egovernment_request_.quota = 1000
            egovernment_request_.request_status = 'AP'
            egovernment_request_.remarks = remarks
            egovernment_request_.save()

        serializer = EgovernmentRequestSerializer(egovernment_request_)
        return Response(serializer.data)            

class EgovernmentMinistryViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = EgovernmentMinistry.objects.all()
    serializer_class = EgovernmentMinistrySerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = EgovernmentMinistry.objects.all()

        return queryset


class EgovernmentDepartmentViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = EgovernmentDepartment.objects.all()
    serializer_class = EgovernmentDepartmentSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = EgovernmentDepartment.objects.all()

        return queryset  
    

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):

        queryset = EgovernmentDepartment.objects.all()
        serializer_class = EgovernmentDepartmentExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data)
