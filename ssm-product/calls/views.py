import datetime
import json
import uuid
import tempfile
from django.utils.timezone import make_aware
import pytz

from django.http import JsonResponse
from django.shortcuts import render
from django.db.models import Q
from django.core.files.storage import default_storage
from django_filters.rest_framework import DjangoFilterBackend

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django.template.loader import render_to_string
from weasyprint import HTML, CSS
from django.core.files.storage import FileSystemStorage
from django.http import HttpResponse
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings


from core.helpers import PathAndRename

from .models import (
    Call, 
)

from .serializers import (
    CallSerializer, 
)

from .helpers import (
    call_middleware
)


class CallViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Call.objects.all()
    serializer_class = CallSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        permission_classes = [AllowAny] 
        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        user = self.request.user
        queryset = Call.objects.all()
        return queryset  

    @action(methods=['POST'], detail=False)
    def services(self, request, *args, **kwargs):        

        s = json.loads(request.body)
        
        request_service_name = s['name']
        
        if request_service_name == 'getCompProfile':
            response_json = call_middleware('getCompProfile',s['registration_number'])

        if request_service_name == 'getFin2':
            response_json = call_middleware('getFin2',s['registration_number'])            
   

        return JsonResponse(response_json)       


    @action(methods=['POST'], detail=False)
    def create_product(self, request, *args, **kwargs):
        s = json.loads(request.body)
        
        items = s['test']
        # print(items)
        # print(items['rocCompanyInfo']['dateOfChange'])
        # items['rocCompanyInfo']['dateOfChange'] = make_aware(datetime.datetime.strptime(items['rocCompanyInfo']['dateOfChange'], '%Y-%m-%dT%H:%M:%S.000Z'))
        # print('qwerqwrq', items['rocCompanyInfo']['dateOfChange'])
        date_format = "%Y-%m-%d"
        time_zone = 'Asia/Kuala_Lumpur'

        date_of_change = make_aware(datetime.datetime.strptime(items['rocCompanyInfo']['dateOfChange'], '%Y-%m-%dT%H:%M:%S.000Z'))
        incorp_date = make_aware(datetime.datetime.strptime(items['rocCompanyInfo']['incorpDate'], '%Y-%m-%dT%H:%M:%S.000Z'))
        # officer_infos = (items['rocCompanyOfficerListInfo']['rocCompanyOfficerInfos']['rocCompanyOfficerInfos'])
        # charge_infos = (items['rocChargesListInfo']['rocChargesInfos']['rocChargesInfos'])
        # financial_year_end_date = (items['rocBalanceSheetListInfo']['rocBalanceSheetInfos']['rocBalanceSheetInfos']['financialYearEndDate'])
        # date_of_tabling = (items['rocBalanceSheetListInfo']['rocBalanceSheetInfos']['rocBalanceSheetInfos']['dateOfTabling'])

        date_format = "%d-%m-%Y"
        time_zone = 'Asia/Kuala_Lumpur'
        # localDatetime = hehe.astimezone(pytz.timezone(time_zone))
        # print('qwrqwrqwrqwr124', localDatetime)

        items['rocCompanyInfo']['dateOfChange'] = date_of_change.astimezone(pytz.timezone(time_zone)).strftime(date_format)
        items['rocCompanyInfo']['incorpDate'] = incorp_date.astimezone(pytz.timezone(time_zone)).strftime(date_format)
        print('doc', items['rocCompanyInfo']['dateOfChange'])
        print('inc', items['rocCompanyInfo']['incorpDate'])


        html_string = render_to_string('template_profile.html', {'items': items})
        html = HTML(string=html_string)
        pdf_file = html.write_pdf(stylesheets=[CSS('https://pipeline-project.sgp1.digitaloceanspaces.com/mbpp-elatihan/css/template.css')])
        
        file_path = "ssm/product/" + datetime.datetime.utcnow().strftime("%s") + "-" + uuid.uuid4().hex + '.pdf'
        saved_file = default_storage.save(
            file_path, 
            ContentFile(pdf_file)
        )
        
        full_url_path = settings.MEDIA_ROOT + saved_file

        serializer = 'https://pipeline-project.sgp1.digitaloceanspaces.com/'+file_path
        return Response(serializer)


    @action(methods=['POST'], detail=False)
    def create_product1(self, request, *args, **kwargs):
        # s = json.loads(request.body)
        
        # items = s['test']
        # # print(items)
        # # print(items['rocCompanyInfo']['dateOfChange'])
        # # items['rocCompanyInfo']['dateOfChange'] = make_aware(datetime.datetime.strptime(items['rocCompanyInfo']['dateOfChange'], '%Y-%m-%dT%H:%M:%S.000Z'))
        # # print('qwerqwrq', items['rocCompanyInfo']['dateOfChange'])
        # date_format = "%Y-%m-%d"
        # time_zone = 'Asia/Kuala_Lumpur'

        # date_of_change = make_aware(datetime.datetime.strptime(items['rocCompanyInfo']['dateOfChange'], '%Y-%m-%dT%H:%M:%S.000Z'))
        # incorp_date = make_aware(datetime.datetime.strptime(items['rocCompanyInfo']['incorpDate'], '%Y-%m-%dT%H:%M:%S.000Z'))
        # # officer_infos = (items['rocCompanyOfficerListInfo']['rocCompanyOfficerInfos']['rocCompanyOfficerInfos'])
        # # charge_infos = (items['rocChargesListInfo']['rocChargesInfos']['rocChargesInfos'])
        # # financial_year_end_date = (items['rocBalanceSheetListInfo']['rocBalanceSheetInfos']['rocBalanceSheetInfos']['financialYearEndDate'])
        # # date_of_tabling = (items['rocBalanceSheetListInfo']['rocBalanceSheetInfos']['rocBalanceSheetInfos']['dateOfTabling'])

        # date_format = "%d-%m-%Y"
        # time_zone = 'Asia/Kuala_Lumpur'
        # # localDatetime = hehe.astimezone(pytz.timezone(time_zone))
        # # print('qwrqwrqwrqwr124', localDatetime)

        # items['rocCompanyInfo']['dateOfChange'] = date_of_change.astimezone(pytz.timezone(time_zone)).strftime(date_format)
        # items['rocCompanyInfo']['incorpDate'] = incorp_date.astimezone(pytz.timezone(time_zone)).strftime(date_format)
        # print('doc', items['rocCompanyInfo']['dateOfChange'])
        # print('inc', items['rocCompanyInfo']['incorpDate'])


        html_string = render_to_string('template_profile_mock.html')
        html = HTML(string=html_string)
        pdf_file = html.write_pdf(stylesheets=[CSS('https://pipeline-project.sgp1.digitaloceanspaces.com/mbpp-elatihan/css/template.css')])
        
        file_path = "ssm/product/" + datetime.datetime.utcnow().strftime("%s") + "-" + uuid.uuid4().hex + '.pdf'
        saved_file = default_storage.save(
            file_path, 
            ContentFile(pdf_file)
        )
        
        full_url_path = settings.MEDIA_ROOT + saved_file

        serializer = 'https://pipeline-project.sgp1.digitaloceanspaces.com/'+file_path
        return Response(serializer)