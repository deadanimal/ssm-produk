from django.shortcuts import render
from django.db.models import Q

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from datetime import datetime

from .models import (
    CBIDApplication
)

from .serializers import (
    CBIDApplicationSerializer
)

class CBIDApplicationViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = CBIDApplication.objects.all()
    serializer_class = CBIDApplicationSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = CBIDApplication.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Company.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = CBIDApplication.objects.all()
            else:
                queryset = CBIDApplication.objects.filter(company=company.id)
        """
        return queryset    
 
    
    @action(methods=['POST'], detail=True)
    def paid(self, request, *args, **kwargs):
        application = self.get_object()
        application.status = 'PD'
        application.paid_date = datetime.now()
        application.save()

        serializer = CBIDApplicationSerializer(application)
        return Response(serializer.data)


    @action(methods=['GET'], detail=True)
    def generate_receipt(self, request, *args, **kwargs):
        application = self.get_object()
        

        serializer = CBIDApplicationSerializer(application)
        return Response(serializer.data)

