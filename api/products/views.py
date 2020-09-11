from django.http import JsonResponse
from django.shortcuts import render
from django.db.models import Q
from django.core.files.storage import default_storage
from django.utils.timezone import make_aware

from django.template.loader import render_to_string
from weasyprint import HTML, CSS
from django.core.files.storage import FileSystemStorage
from django.http import HttpResponse
from django.core.files.base import ContentFile
from django.conf import settings


# import datetime
import json
import uuid
import tempfile
import pytz
import subprocess

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from datetime import datetime

from products.services.get_comp_prof import get_comp_prof
from products.services.get_info_acgs import get_info_acgs
from products.services.get_new_format_entity import get_new_format_entity
from products.services.get_cert_incorp import get_cert_incorp
from products.services.get_cert_reg_foreign import get_cert_reg_foreign
from products.services.get_info_comp_name_chg import get_info_comp_name_chg
from products.services.get_info_fin2 import get_info_fin2
from products.services.get_cert_conversion import get_cert_conversion
from products.services.get_roc_business_officers import get_roc_business_officers
from products.services.get_roc_changes_registered_address import get_roc_changes_registered_address
from products.services.get_details_of_share_capital import get_details_of_share_capital
from products.services.get_biz_profile import get_biz_profile
from products.services.get_particulars_of_cosec import get_particulars_of_cosec
from products.services.get_info_rob_termination import get_info_rob_termination
from products.services.get_info_charges import get_info_charges
from products.services.get_comp_listing_cnt import get_comp_listing_cnt
from products.services.get_comp_listing_a import get_comp_listing_a
from products.services.get_image import get_image
from products.services.get_particulars_of_adt_firm import get_particulars_of_adt_firm
from products.services.get_fin2 import get_fin2
from products.services.get_co_count import get_co_count
from products.services.get_co_page import get_co_page

from .models import (
    Product
)

from .serializers import (
    ProductSerializer
)

class ProductViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = Product.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Company.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = Product.objects.all()
            else:
                queryset = Product.objects.filter(company=company.id)
        """
        return queryset    
 

    @action(methods=['POST'], detail=False)
    def services(self, request, *args, **kwargs):        

        call_json = json.loads(request.body)        
        request_service_name = call_json['name']
        registration_number = call_json['registration_number']

        tz = pytz.timezone('Asia/Kuala_Lumpur')
        now = datetime.now(tz=tz) 
        print(now)
        now_string = now.strftime("%Y-%m-%d %H:%M:%S")
        auth_code = subprocess.check_output(['java', '-jar', 'authgen.jar', 'SSMProduk', now_string, '27522718']).decode("utf-8").rstrip("\n")

        url = "http://integrasistg.ssm.com.my/InfoService/1"
        headers = {
            'content-type': "text/xml;charset=UTF-8",
            'authorization': auth_code
        }
        
        if request_service_name == 'getCompProfile':
            json_response = get_comp_prof(url, headers, registration_number)

        elif request_service_name == 'getInfoAcgs':
            json_response = get_info_acgs(url, headers, registration_number)

        elif request_service_name == 'getNewFormatEntity':
            json_response = get_new_format_entity(url, headers, registration_number)

        elif request_service_name == 'getCertIncorp':
            json_response = get_cert_incorp(url, headers, registration_number)

        elif request_service_name == 'getCertRegForeign':
            json_response = get_cert_reg_foreign(url, headers, registration_number)         

        elif request_service_name == 'getInfoCompNameChg':
            json_response = get_info_comp_name_chg(url, headers, registration_number)      

        elif request_service_name == 'getInfoFin2':            
            json_response = get_info_fin2(url, headers, registration_number)   

        elif request_service_name == 'getCertConversion':            
            json_response = get_cert_conversion(url, headers, registration_number)           

        elif request_service_name == 'getRocBusinessOfficers':            
            json_response = get_roc_business_officers(url, headers, registration_number)     

        elif request_service_name == 'getRocChangesRegisteredAddress':            
            json_response = get_roc_changes_registered_address(url, headers, registration_number)        

        elif request_service_name == 'getDetailsOfShareCapital':            
            json_response = get_details_of_share_capital(url, headers, registration_number)     

        elif request_service_name == 'getBizProfile':            
            json_response = get_biz_profile(url, headers, registration_number)      

        elif request_service_name == 'getParticularsOfCosec':            
            json_response = get_particulars_of_cosec(url, headers, registration_number)         

        elif request_service_name == 'getInfoRobTermination':            
            json_response = get_info_rob_termination(url, headers, registration_number)                                                               

        elif request_service_name == 'getInfoCharges':            
            json_response = get_info_charges(url, headers, registration_number)  

        elif request_service_name == 'getCompListingCnt':            
            json_response = get_comp_listing_cnt(url, headers, registration_number)          

        elif request_service_name == 'getCompListingA':            
            json_response = get_comp_listing_a(url, headers, registration_number)      

        elif request_service_name == 'getImage':            
            json_response = get_image(url, headers, registration_number)  

        elif request_service_name == 'getParticularsOfAdtFirm':            
            json_response = get_particulars_of_adt_firm(url, headers, registration_number) 
            
        elif request_service_name == 'getFin2':
            json_response = get_fin2(url, headers, registration_number) 

        elif request_service_name == 'getCoCount':
            json_response = get_co_count(url, headers, registration_number) 

        elif request_service_name == 'getCoPage':
            json_response = get_co_page(url, headers, registration_number)             

        return JsonResponse(json_response)

    
    @action(methods=['POST'], detail=False)
    def create_pdf(self, request, *args, **kwargs):
        product_data = json.loads(request.body)
        
        items = product_data['test']
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


        html_string = render_to_string('product/company_profile_nonctc_bi.html', {'items': items})
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

