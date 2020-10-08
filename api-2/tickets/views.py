from django.shortcuts import render
from django.db.models import Q

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from .models import (
    TicketTopic,
    TicketSubject,
    Ticket,
    TicketCBID,
    TicketInvestigation,
    EnquiryTicket,
    EnquiryTicketReply,
    EnquiryTicketSelection
)

from .serializers import (
    TicketTopicSerializer,
    TicketSubjectSerializer,
    TicketSerializer,
    TicketExtendedSerializer,
    TicketCBIDSerializer,
    TicketCBIDExtendedSerializer,
    TicketInvestigationSerializer,
    EnquiryTicketSerializer,
    EnquiryTicketReplySerializer,
    EnquiryTicketSelectionSerializer    
)

class TicketTopicViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = TicketTopic.objects.all()
    serializer_class = TicketTopicSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = TicketTopic.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Company.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = TicketTopic.objects.all()
            else:
                queryset = TicketTopic.objects.filter(company=company.id)
        """
        return queryset    
 

class TicketSubjectViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = TicketSubject.objects.all()
    serializer_class = TicketSubjectSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = TicketSubject.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Company.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = TicketSubject.objects.all()
            else:
                queryset = TicketSubject.objects.filter(company=company.id)
        """
        return queryset    
 

class TicketViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = Ticket.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Company.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = Ticket.objects.all()
            else:
                queryset = Ticket.objects.filter(company=company.id)
        """
        return queryset 

    @action(methods=['POST'], detail=True)
    def resolve_ticket(self, request, *args, **kwargs):
        ticket = self.get_object()

        ticket.ticket_status == 'RS'
        ticket.save()

        serializer = TicketSerializer(ticket)
        return Response(serializer.data)   
    
    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):
        
        queryset = Ticket.objects.all()
        serializer_class = TicketExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data)


class TicketCBIDViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = TicketCBID.objects.all()
    serializer_class = TicketCBIDSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = TicketCBID.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Company.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = TicketCBID.objects.all()
            else:
                queryset = TicketCBID.objects.filter(company=company.id)
        """
        return queryset   

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):
        
        queryset = TicketCBID.objects.all()
        serializer_class = TicketCBIDExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data) 
 

class TicketInvestigationViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = TicketInvestigation.objects.all()
    serializer_class = TicketInvestigationSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = TicketInvestigation.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Company.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = TicketInvestigation.objects.all()
            else:
                queryset = TicketInvestigation.objects.filter(company=company.id)
        """
        return queryset    
 

class TicketInvestigationViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = TicketInvestigation.objects.all()
    serializer_class = TicketInvestigationSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = TicketInvestigation.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Company.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = TicketInvestigation.objects.all()
            else:
                queryset = TicketInvestigation.objects.filter(company=company.id)
        """
        return queryset    
 
class EnquiryTicketViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = EnquiryTicket.objects.all()
    serializer_class = EnquiryTicketSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = EnquiryTicket.objects.all()
        return queryset    

class EnquiryTicketReplyViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = EnquiryTicketReply.objects.all()
    serializer_class = EnquiryTicketReplySerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = EnquiryTicketReply.objects.all()
        return queryset    

class EnquiryTicketSelectionViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = EnquiryTicketSelection.objects.all()
    serializer_class = EnquiryTicketSelectionSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = EnquiryTicketSelection.objects.all()
        return queryset    



