from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['email'] = user.email
        token['user_type'] = user.user_type

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

from django.shortcuts import render
from django.db.models import Q

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from users.models import (
    CustomUser
)

from users.serializers import (
    CustomUserSerializer
)

class CustomUserViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'user_type',
        'is_active'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = CustomUser.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Company.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = User.objects.all()
            else:
                queryset = User.objects.filter(company=company.id)
        """
        return queryset    
 
    @action(methods=['POST'], detail=True)
    def register_egov(self, request, *args, **kwargs):
        user = self.get_object()
        user.egov_request = 'PD'
        user.save()

        serializer = CustomUserSerializer(user)
        return Response(serializer.data)
    
    @action(methods=['POST'], detail=True)
    def approve_egov(self, request, *args, **kwargs):
        user = self.get_object()
        user.egov_request = 'AP'
        user.user_type = 'EG'
        user.save()

        serializer = CustomUserSerializer(user)
        return Response(serializer.data)
    
    @action(methods=['POST'], detail=True)
    def reject_egov(self, request, *args, **kwargs):
        user = self.get_object()
        user.egov_request = 'NA'
        user.save()

        serializer = CustomUserSerializer(user)
        return Response(serializer.data)
    
    @action(methods=['POST'], detail=True)
    def add_egov_quota(self, request, *args, **kwargs):
        user = self.get_object()

        if user.user_type == 'EG':
            user.egov_quota = 5
        user.save()

        serializer = CustomUserSerializer(user)
        return Response(serializer.data)