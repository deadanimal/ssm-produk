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
from products.services.get_info_fin3 import get_info_fin3
from products.services.get_info_fin5 import get_info_fin5
from products.services.get_info_fin10 import get_info_fin10
from products.services.get_info_hist2 import get_info_hist2
from products.services.get_cert_conversion import get_cert_conversion
from products.services.get_info_financial import get_info_financial
from products.services.get_roc_business_officers import get_roc_business_officers
from products.services.get_roc_changes_registered_address import get_roc_changes_registered_address
from products.services.get_details_of_shareholders import get_details_of_shareholders
from products.services.get_details_of_share_capital import get_details_of_share_capital
from products.services.get_biz_profile import get_biz_profile
from products.services.get_particulars_of_cosec import get_particulars_of_cosec
from products.services.get_info_rob_termination import get_info_rob_termination
from products.services.get_info_charges import get_info_charges
from products.services.get_comp_listing_cnt import get_comp_listing_cnt
from products.services.get_comp_listing_a import get_comp_listing_a
from products.services.get_image import get_image
from products.services.get_image_list import get_image_list
from products.services.get_image_ctc import get_image_ctc
from products.services.get_particulars_of_adt_firm import get_particulars_of_adt_firm
from products.services.get_co_count import get_co_count
from products.services.get_co_page import get_co_page

from .helpers.info_acgs import info_acgs
from .helpers.roc_business_officers import roc_business_officers
from .helpers.biz_profile import biz_profile
from .helpers.particular_address import particular_address
from .helpers.cert_incorp import cert_incorp
from .helpers.info_fin_2 import info_fin_2
from .helpers.info_hist_2 import info_hist_2
from .helpers.comp_prof import comp_prof

from .helpers.acgs import acgs
from .helpers.change_name import change_name
from .helpers.particular_audit_firm import particular_audit_firm

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
        entity_type = call_json['entity_type']

        tz = pytz.timezone('Asia/Kuala_Lumpur')
        now = datetime.now(tz=tz) 
        print(now)
        now_string = now.strftime("%Y-%m-%d %H:%M:%S")
        auth_code = subprocess.check_output(['java', '-jar', 'authgen.jar', 'SSMProduk', now_string, '27522718']).decode("utf-8").rstrip("\n")

        url_info = 'http://integrasistg.ssm.com.my/InfoService/1'
        url_listing = 'http://integrasistg.ssm.com.my/ListingService/1'
        url_docu = 'http://integrasistg.ssm.com.my/DocufloService/1'

        headers = {
            'content-type': "text/xml;charset=UTF-8",
            'authorization': auth_code
        }

        # New format entity
        if request_service_name == 'getNewFormatEntity': 
            json_response = get_new_format_entity(url_info, headers, registration_number, entity_type)

        # Attestation of Company Good Standing (ACGS) - Non CTC / MS EN
        elif request_service_name == 'getInfoAcgs': 
            json_response = get_info_acgs(url_info, headers, registration_number, entity_type)
        
        # Sijil Pemerbadanan Syarikat Persendirian di bawah AS 2016 - Non CTC / MS EN
        # Sijil Pemerbadanan Syarikat Awam di bawah AS 2016 - Non CTC / MS EN
        # Sijil Pemerbadanan Syarikat Awam di bawah AS 2016 - Non CTC / MS EN (menurut jaminan)
        elif request_service_name == 'getCertIncorp':
            json_response = get_cert_incorp(url_info, headers, registration_number, entity_type)

        # Sijil Pemerbadanan Syarikat Persendirian di bawah AS 2016 - CTC / MS EN
        # Sijil Pemerbadanan Syarikat Awam di bawah AS 2016 - CTC / MS EN
        # Sijil Pemerbadanan Syarikat Awam di bawah AS 2016 - CTC / MS EN (menurut jaminan)
        elif request_service_name == 'getCertIncorpCtc':
            json_response = get_cert_incorp_ctc(url_info, headers, registration_number, entity_type)
        
        # Sijil Pendaftaran Syarikat Asing di bawah AS 2016 - Non CTC / MS EN
        elif request_service_name == 'getCertRegForeign':
            json_response = get_cert_reg_foreign(url_info, headers, registration_number, entity_type)

        # Sijil Pendaftaran Syarikat Asing di bawah AS 2016 - CTC / MS EN
        elif request_service_name == 'getCertRegForeignCtc':
            json_response = get_cert_reg_foreign_ctc(url_info, headers, registration_number, entity_type)  

        # Sijil Pertukaran Nama Syarikat AS 2016 - Non CTC / MS EN
        elif request_service_name == 'getInfoCompNameChg':
            json_response = get_info_comp_name_chg(url_info, headers, registration_number, entity_type)      
        
        # Sijil Pertukaran Nama Syarikat AS 2016 - CTC / MS EN
        elif request_service_name == 'getInfoCompNameChgCtc':
            json_response = get_info_comp_name_chg_ctc(url_info, headers, registration_number, entity_type)  

        # Sijil Pertukaran Status Syarikat AS 2016 - Non CTC / MS EN
        elif request_service_name == 'getCertConversion':            
            json_response = get_cert_conversion(url_info, headers, registration_number, entity_type)  
        
        # Sijil Pertukaran Status Syarikat AS 2016 - CTC / MS EN
        elif request_service_name == 'getCertConversionCtc':            
            json_response = get_cert_conversion_ctc(url_info, headers, registration_number, entity_type) 

        # Financial Historical 2 Years - Non CTC / MS EN
        elif request_service_name == 'getInfoFinancial':            
            json_response = get_info_financial(url_info, headers, registration_number, entity_type)
        
        # Financial Historical 2 Years - CTC / MS EN
        elif request_service_name == 'getInfoFinancialCtc':            
            json_response = get_info_financial_ctc(url_info, headers, registration_number, entity_type)  
        
        # Financial Comparison 2 Years - Non CTC  / MS EN
        elif request_service_name == 'getInfoFin2':            
            json_response = get_info_fin2(url_info, headers, registration_number, entity_type)  
         
        # Financial Comparison 3 Years - Non CTC / MS EN
        elif request_service_name == 'getInfoFin3':            
            json_response = get_info_fin3(url_info, headers, registration_number, entity_type)  

        # Financial Comparison 5 Years - Non CTC / MS EN
        elif request_service_name == 'getInfoFin5':            
            json_response = get_info_fin5(url_info, headers, registration_number, entity_type)
        
        # Financial Comparison 10 Years - Non CTC / MS EN
        elif request_service_name == 'getInfoFin10':            
            json_response = get_info_fin10(url_info, headers, registration_number, entity_type) 

        # Particulars of Directors/Officers - Non CTC / MS EN
        elif request_service_name == 'getRocBusinessOfficers':            
            json_response = get_roc_business_officers(url_info, headers, registration_number, entity_type)    

        # Particulars of Directors/Officers - CTC / MS EN
        elif request_service_name == 'getRocBizOfficersCtc':            
            json_response = get_roc_business_officers_ctc(url_info, headers, registration_number, entity_type)  

        # Particulars of Registered Address - Non CTC / MS EN
        elif request_service_name == 'getRocChangesRegisteredAddress':            
            json_response = get_roc_changes_registered_address(url_info, headers, registration_number, entity_type)      

        # Particulars of Registered Address - CTC / MS EN
        elif request_service_name == 'getRocChgRegAddrCtc':            
            json_response = get_roc_changes_registered_address_ctc(url_info, headers, registration_number, entity_type) 

        # Particular of Shareholders - Non CTC / MS EN
        elif request_service_name == 'getDetailsOfShareholders':            
            json_response = get_details_of_shareholders(url_info, headers, registration_number, entity_type) 

        # Particular of Shareholders - CTC / MS EN
        elif request_service_name == 'getDtlsOfShareholdersCtc':            
            json_response = get_details_of_shareholders_ctc(url_info, headers, registration_number, entity_type)    
        
        # Particulars of Share Capital - Non CTC / MS EN
        elif request_service_name == 'getDetailsOfShareCapital':            
            json_response = get_details_of_share_capital(url_info, headers, registration_number, entity_type)     

        # Particulars of Share Capital - CTC / MS EN
        elif request_service_name == 'getDtlsOfShareCapCtc':            
            json_response = get_details_of_share_capital_ctc(url_info, headers, registration_number, entity_type) 

        # Company Profile - Non CTC / MS EN
        elif request_service_name == 'getCompProfile':
            json_response = get_comp_prof(url_info, headers, registration_number, entity_type)
        
        # Company Profile - CTC / MS EN
        elif request_service_name == 'getCompProfileCtc':
            json_response = get_comp_prof_ctc(url_info, headers, registration_number, entity_type)
        
        # Business Profile – Non CTC / MS EN
        elif request_service_name == 'getBizProfile':            
            json_response = get_biz_profile(url_info, headers, registration_number, entity_type)      
        
        # Business Profile – CTC / MS EN
        elif request_service_name == 'getBizProfileCtc':            
            json_response = get_biz_profile_ctc(url_info, headers, registration_number, entity_type)   

        # Business Certificate - Digital CTC / MS EN

        # Particulars of Company Secretary - Non CTC / MS EN
        elif request_service_name == 'getParticularsOfCosec':            
            json_response = get_particulars_of_cosec(url_info, headers, registration_number, entity_type)         

        # Particulars of Company Secretary - CTC / MS EN
        elif request_service_name == 'getParticularsOfCosecCtc':            
            json_response = get_particulars_of_cosec_ctc(url_info, headers, registration_number, entity_type)  
        
        # Audit Firm Profile – Non CTC / MS EN
        elif request_service_name == 'getParticularsOfAdtFirm':            
            json_response = get_particulars_of_adt_firm(url_info, headers, registration_number, entity_type) 

        # Audit Firm Profile – CTC / MS EN
        elif request_service_name == 'getParticularsOfAdtFirmCtc':            
            json_response = get_particulars_of_adt_firm_ctc(url_info, headers, registration_number, entity_type) 

        # Business Termination Letter (BTL) - Non CTC / MS EN
        elif request_service_name == 'getInfoRobTermination':            
            json_response = get_info_rob_termination(url_info, headers, registration_number, entity_type)                                                               
        
        # Company Charges - Non CTC / MS EN
        elif request_service_name == 'getInfoCharges':            
            json_response = get_info_charges(url_info, headers, registration_number, entity_type)  

        # Company Charges - CTC / MS EN
        elif request_service_name == 'getInfoChargesCtc':            
            json_response = get_info_charges_ctc(url_info, headers, registration_number, entity_type)  

        # Company Listing
        elif request_service_name == 'getCompListingCnt':            
            json_response = get_comp_listing_cnt(url_listing, headers, registration_number, entity_type)          

        # Company Listing Package A
        elif request_service_name == 'getCompListingA':            
            json_response = get_comp_listing_a(url_listing, headers, registration_number, entity_type)      

        # Company Listing Package B
        elif request_service_name == 'getCompListingB':            
            json_response = get_comp_listing_b(url_listing, headers, registration_number, entity_type)  

        # Document and Form View + Download getImageView / getImageList
        elif request_service_name == 'getImage':            
            json_response = get_image(url_docu, headers, registration_number, entity_type)  

        elif request_service_name == 'getImageList':            
            json_response = get_image_list(url_docu, headers, registration_number, entity_type) 

        # Document and Form View + Download + CTC getImageViewCTC

        elif request_service_name == 'getImageView':            
            json_response = get_image_list(url_docu, headers, registration_number, entity_type) 

        # Document and Form View (Statutory Docs)  getImageCtc

        elif request_service_name == 'getImageCtc':            
            json_response = get_image_ctc(url_docu, headers, registration_number, entity_type)    

        elif request_service_name == 'getCoCount':
            json_response = get_co_count(url_info, headers, registration_number, entity_type) 

        elif request_service_name == 'getCoPage':
            json_response = get_co_page(url_info, headers, registration_number, entity_type)             

        return JsonResponse(json_response)

    

    @action(methods=['POST'], detail=False)
    def create_pdf(self, request, *args, **kwargs):

        product_request = json.loads(request.body)
        request_name = product_request['name']
        request_language = product_request['language']
        request_registration_no = product_request['registraton_no']
        request_entity_type = product_request['entity_type']

        url_info = 'http://integrasistg.ssm.com.my/InfoService/1'
        url_listing = 'http://integrasistg.ssm.com.my/ListingService/1'
        url_docu = 'http://integrasistg.ssm.com.my/DocufloService/1'

        tz = pytz.timezone('Asia/Kuala_Lumpur')
        now = datetime.now(tz=tz) 

        now_string = now.strftime("%Y-%m-%d %H:%M:%S")
        auth_code = subprocess.check_output(['java', '-jar', 'authgen.jar', 'SSMProduk', now_string, '27522718']).decode("utf-8").rstrip("\n")

        headers = {
            'content-type': "text/xml;charset=UTF-8",
            'authorization': auth_code
        }

        css_file = 'https://pipeline-project.sgp1.digitaloceanspaces.com/mbpp-elatihan/css/template.css'

        # Attestation of Company Good Standing (ACGS) - Non CTC 
        if request_name == 'getInfoAcgs': 
            mdw_1_response = get_info_acgs(url_info, headers, request_registration_no, request_entity_type)
            mdw_2_response = get_new_format_entity(url_info, headers, request_registration_no, request_entity_type)

            # print(mdw_1_response)
            data_loaded = info_acgs(mdw_1_response, mdw_2_response, 'en')

            if request_language == 'en':
                 html_string = render_to_string('product/acgs_nonctc_en.html', {'data': data_loaded})
            elif request_language == 'ms':
                 html_string = render_to_string('product/acgs_nonctc_ms.html', {'data': data_loaded})
            
            html = HTML(string=html_string)
            pdf_file = html.write_pdf(stylesheets=[CSS('https://pipeline-project.sgp1.digitaloceanspaces.com/mbpp-elatihan/css/template.css')])
            
            file_path = "ssm/product/acgs-nonctc-en-" + datetime.utcnow().strftime("%s") + "-" + uuid.uuid4().hex + '.pdf'
            saved_file = default_storage.save(
                file_path, 
                ContentFile(pdf_file)
            )
            
            full_url_path = settings.MEDIA_ROOT + saved_file

            serializer = 'https://pipeline-project.sgp1.digitaloceanspaces.com/'+file_path 
        
        # Particulars of Directors/Officers - Non CTC / MS EN
        elif request_name == 'getRocBusinessOfficers': 
            mdw_1_response = get_roc_business_officers(url_info, headers, request_registration_no, request_entity_type)
            mdw_2_response = get_new_format_entity(url_info, headers, request_registration_no, request_entity_type)
   
            data_loaded = roc_business_officers(mdw_1_response, mdw_2_response)

            if request_language == 'en':
                 html_string = render_to_string('product/particular_directors_nonctc_en.html', {'data': data_loaded})
            elif request_language == 'ms':
                 html_string = render_to_string('product/particular_directors_nonctc_ms.html', {'data': data_loaded})
            
            html = HTML(string=html_string)
            pdf_file = html.write_pdf(stylesheets=[CSS('https://pipeline-project.sgp1.digitaloceanspaces.com/mbpp-elatihan/css/template.css')])
            
            file_path = "ssm/product/particular-directors-nonctc-" + datetime.utcnow().strftime("%s") + "-" + uuid.uuid4().hex + '.pdf'
            saved_file = default_storage.save(
                file_path, 
                ContentFile(pdf_file)
            )
            
            full_url_path = settings.MEDIA_ROOT + saved_file
            # serializer = 'Teszting'
            serializer = 'https://pipeline-project.sgp1.digitaloceanspaces.com/'+file_path

        # Particulars of Directors/Officers - CTC / MS EN
        elif request_name == 'getRocBizOfficersCtc': 
            mdw_1_response = get_roc_business_officers_ctc(url_info, headers, request_registration_no, request_entity_type)
            mdw_2_response = get_new_format_entity(url_info, headers, request_registration_no, request_entity_type)
            
            data_loaded = info_acgs(mdw_1_response, mdw_2_response)

            if request_language == 'en':
                 html_string = render_to_string('product/particular_directors_ctc_en.html', {'data': data_loaded})
            elif request_language == 'ms':
                 html_string = render_to_string('product/particular_directors_ctc_ms.html', {'data': data_loaded})
            
            html = HTML(string=html_string)
            pdf_file = html.write_pdf(stylesheets=[CSS('https://pipeline-project.sgp1.digitaloceanspaces.com/mbpp-elatihan/css/template.css')])
            
            file_path = "ssm/product/particular-directors-ctc-" + datetime.utcnow().strftime("%s") + "-" + uuid.uuid4().hex + '.pdf'
            saved_file = default_storage.save(
                file_path, 
                ContentFile(pdf_file)
            )
            
            full_url_path = settings.MEDIA_ROOT + saved_file

            serializer = 'https://pipeline-project.sgp1.digitaloceanspaces.com/'+file_path
        
        # Particulars of Registered Address - Non CTC / MS EN
        elif request_name == 'getRocChangesRegisteredAddress':            
            mdw_1_response = get_roc_changes_registered_address(url_info, headers, request_registration_no, request_entity_type)
            mdw_2_response = get_new_format_entity(url_info, headers, request_registration_no, request_entity_type)
            
            data_loaded = particular_address(mdw_1_response, mdw_2_response, request_language)

            if request_language == 'en':
                 html_string = render_to_string('product/particular_address_nonctc_en.html', {'data': data_loaded})
            elif request_language == 'ms':
                 html_string = render_to_string('product/particular_address_nonctc_ms.html', {'data': data_loaded})
            
            html = HTML(string=html_string)
            pdf_file = html.write_pdf(stylesheets=[CSS('https://pipeline-project.sgp1.digitaloceanspaces.com/mbpp-elatihan/css/template.css')])
            
            file_path = "ssm/product/particular-address-nonctc-" + datetime.utcnow().strftime("%s") + "-" + uuid.uuid4().hex + '.pdf'
            saved_file = default_storage.save(
                file_path, 
                ContentFile(pdf_file)
            )
            
            full_url_path = settings.MEDIA_ROOT + saved_file

            serializer = 'https://pipeline-project.sgp1.digitaloceanspaces.com/'+file_path     

        # Particulars of Registered Address - CTC / MS EN
        elif request_name == 'getRocChgRegAddrCtc':            
            json_response = get_roc_changes_registered_address_ctc(url_info, headers, request_registration_no, entity_type) 


        # Business Profile – Non CTC / MS EN
        elif request_name == 'getBizProfile': 
            mdw_1_response = get_biz_profile(url_info, headers, request_registration_no, request_entity_type)
            mdw_2_response = get_new_format_entity(url_info, headers, request_registration_no, request_entity_type)
            
            data_loaded = biz_profile(mdw_1_response, mdw_2_response, request_language)

            if request_language == 'en':
                 html_string = render_to_string('product/business_profile_nonctc_en.html', {'data': data_loaded})
            elif request_language == 'ms':
                 html_string = render_to_string('product/business_profile_nonctc_ms.html', {'data': data_loaded})
            
            html = HTML(string=html_string)
            pdf_file = html.write_pdf(stylesheets=[CSS('https://pipeline-project.sgp1.digitaloceanspaces.com/mbpp-elatihan/css/template.css')])
            
            file_path = "ssm/product/business-profile-nonctc-" + datetime.utcnow().strftime("%s") + "-" + uuid.uuid4().hex + '.pdf'
            saved_file = default_storage.save(
                file_path, 
                ContentFile(pdf_file)
            )
            
            full_url_path = settings.MEDIA_ROOT + saved_file

            serializer = 'https://pipeline-project.sgp1.digitaloceanspaces.com/'+file_path

        # Business Profile – CTC / MS EN
        elif request_name == 'getBizProfileCtc': 
            mdw_1_response = get_biz_profile_ctc(url_info, headers, request_registration_no, request_entity_type)
            mdw_2_response = get_new_format_entity(url_info, headers, request_registration_no, request_entity_type)
            
            data_loaded = biz_profile(mdw_1_response, mdw_2_response, request_language)

            if request_language == 'en':
                 html_string = render_to_string('product/business_profile_ctc_en.html', {'data': data_loaded})
            elif request_language == 'ms':
                 html_string = render_to_string('product/business_profile_ctc_ms.html', {'data': data_loaded})
            
            html = HTML(string=html_string)
            pdf_file = html.write_pdf(stylesheets=[CSS('https://pipeline-project.sgp1.digitaloceanspaces.com/mbpp-elatihan/css/template.css')])
            
            file_path = "ssm/product/business-profile-ctc-" + datetime.utcnow().strftime("%s") + "-" + uuid.uuid4().hex + '.pdf'
            saved_file = default_storage.save(
                file_path, 
                ContentFile(pdf_file)
            )
            
            full_url_path = settings.MEDIA_ROOT + saved_file

            serializer = 'https://pipeline-project.sgp1.digitaloceanspaces.com/'+file_path
        
        # Audit Firm Profile – Non CTC / MS EN
        elif request_service_name == 'getParticularsOfAdtFirm':
            mdw_1_response = get_particulars_of_adt_firm(url_info, headers, request_registration_no, request_entity_type)
            mdw_2_response = get_new_format_entity(url_info, headers, request_registration_no, request_entity_type)
            
            data_loaded = biz_profile(mdw_1_response, mdw_2_response, request_language)

            if request_language == 'en':
                 html_string = render_to_string('product/particulars_of_adt_firm_en.html', {'data': data_loaded})
            elif request_language == 'ms':
                 html_string = render_to_string('product/particulars_of_adt_firm_ms.html', {'data': data_loaded})
            
            html = HTML(string=html_string)
            pdf_file = html.write_pdf(stylesheets=[CSS('https://pipeline-project.sgp1.digitaloceanspaces.com/mbpp-elatihan/css/template.css')])
            
            file_path = "ssm/product/particulars-of-adt-firm-nonctc-" + datetime.utcnow().strftime("%s") + "-" + uuid.uuid4().hex + '.pdf'
            saved_file = default_storage.save(
                file_path, 
                ContentFile(pdf_file)
            )
            
            full_url_path = settings.MEDIA_ROOT + saved_file

            serializer = 'https://pipeline-project.sgp1.digitaloceanspaces.com/'+file_path

        else:
            serializers = 'Wrong request'
        
        
        return Response(serializer)


    @action(methods=['POST'], detail=False)
    def generate_product(self, request, *args, **kwargs):

        product_request_json = json.loads(request.body)

        name_ = product_request_json['name']
        language_ = product_request_json['language']
        ctc_ = product_request_json['ctc']
        registration_ = product_request_json['registration_no']
        entity_type_ = product_request_json['entity_type']

        information_url = 'http://integrasistg.ssm.com.my/InfoService/1'
        listing_url = 'http://integrasistg.ssm.com.my/ListingService/1'
        document_url = 'http://integrasistg.ssm.com.my/DocufloService/1'

        now = datetime.now(tz=pytz.timezone('Asia/Kuala_Lumpur')) 

        now_string = now.strftime("%Y-%m-%d %H:%M:%S")
        auth_code = subprocess.check_output(['java', '-jar', 'authgen.jar', 'SSMProduk', now_string, '27522718']).decode("utf-8").rstrip("\n")

        request_headers = {
            'content-type': "text/xml;charset=UTF-8",
            'authorization': auth_code
        }

        css_file = 'https://pipeline-project.sgp1.digitaloceanspaces.com/mbpp-elatihan/css/template.css'        

        new_entity_id = get_new_format_entity(information_url, request_headers, registration_, entity_type_)

        if name_ == 'acgs':
            middleware_data = get_info_acgs(information_url, request_headers, registration_, entity_type_)
            data_loaded = acgs(middleware_data, new_entity_id, language_)

        elif name_ == 'private_incorp_cert':
            middleware_data = get_cert_incorp(information_url, request_headers, registration_)
            data_loaded = cert_incorp(middleware_data, new_entity_id, language_)

        elif name_ == 'public_incorp_cert':
            middleware_data = get_cert_incorp(information_url, request_headers, registration_)
            data_loaded = cert_incorp(middleware_data, new_entity_id, language_)

        elif name_ == 'public_guarantee_incorp_cert':
            middleware_data = get_cert_incorp(information_url, request_headers, registration_)
            data_loaded = cert_incorp(middleware_data, new_entity_id, language_)

        elif name_ == 'foreign_incorp_cert':
            middleware_data = get_cert_reg_foreign(information_url, request_headers, registration_)
            data_loaded = cert_incorp(middleware_data, new_entity_id, language_)

        elif name_ == 'private_change_name':
            middleware_data = get_cert_incorp(information_url, request_headers, registration_, entity_type_)
            data_loaded = change_name(middleware_data, new_entity_id, language_)

        elif name_ == 'private_change_status':
            middleware_data = get_cert_conversion(information_url, request_headers, registration_, entity_type_)
            data_loaded = change_name(middleware_data, new_entity_id)

        elif name_ == 'financial_history':
            year1 = product_request_json['year1']
            year2 = product_request_json['year2']
            middleware_data_year1 = get_info_hist2(information_url, request_headers, registration_, entity_type_, year1)
            middleware_data_year2 = get_info_hist2(information_url, request_headers, registration_, entity_type_, year2)
            data_loaded_1 = info_hist_2(middleware_data_year1,new_entity_id, language_)
            data_loaded_2 = info_hist_2(middleware_data_year2,new_entity_id, language_)
            data_loaded = data_loaded_1

            
            balance_sheet_year1 = data_loaded_1['balance_sheet'][0]
            balance_sheet_year2 = data_loaded_2['balance_sheet'][0]
            
            profit_loss_year1 = data_loaded_1['profit_loss'][0]
            profit_loss_year2 = data_loaded_2['profit_loss'][0]

            del data_loaded['balance_sheet']
            del data_loaded['profit_loss']
            data_loaded['balance_sheet'] = []
            data_loaded['profit_loss'] = []

            data_loaded['balance_sheet'].append(balance_sheet_year1)
            data_loaded['balance_sheet'].append(balance_sheet_year2)
            data_loaded['profit_loss'].append(profit_loss_year1)
            data_loaded['profit_loss'].append(profit_loss_year2)

            print(data_loaded)

        elif name_ == 'financial_comparison_2':
            now = datetime.now()
            middleware_data = get_info_fin2(information_url, request_headers, registration_, entity_type_, str(now.year-2), str(now.year))
            data_loaded = info_fin_2(middleware_data, new_entity_id, language_)

        elif name_ == 'financial_comparison_3':
            now = datetime.now()
            middleware_data = get_info_fin3(information_url, request_headers, registration_, entity_type_, str(now.year-3), str(now.year))
            data_loaded = info_fin_2(middleware_data, new_entity_id, language_)

        elif name_ == 'financial_comparison_5':
            now = datetime.now()
            middleware_data = get_info_fin5(information_url, request_headers, registration_, entity_type_, str(now.year-5), str(now.year))
            data_loaded = info_fin_2(middleware_data, new_entity_id, language_)

        elif name_ == 'financial_comparison_10':
            now = datetime.now()
            middleware_data = get_info_fin10(information_url, request_headers, registration_, entity_type_, str(now.year-10), str(now.year))
            data_loaded = info_fin_2(middleware_data, new_entity_id, language_)

        elif name_ == 'particular_directors':
            middleware_data = get_roc_business_officers(information_url, request_headers, registration_, entity_type_)
            data_loaded = roc_business_officers(middleware_data, new_entity_id, language_)  

        elif name_ == 'particular_registered_address':
            middleware_data = get_roc_changes_registered_address(information_url, request_headers, registration_, entity_type_)
            data_loaded = particular_address(middleware_data, new_entity_id, language_)  

        elif name_ == 'particular_shareholders':
            middleware_data = get_details_of_shareholders(information_url, request_headers, registration_, entity_type_)
            data_loaded = particular_shareholders(middleware_data, new_entity_id, language_)  

        elif name_ == 'particular_sharecapital':
            middleware_data = get_details_of_share_capital(information_url, request_headers, registration_, entity_type_)
            data_loaded = particular_sharecapital(middleware_data, new_entity_id, language_)  

        elif name_ == 'company_profile':
            now = datetime.now()
            middleware_data = get_comp_prof(information_url, request_headers, registration_, entity_type_)
            data_loaded = comp_prof(middleware_data, new_entity_id, language_)  

        elif name_ == 'business_profile':
            middleware_data = get_biz_profile(information_url, request_headers, registration_)
            data_loaded = biz_profile(middleware_data, new_entity_id, language_)

        elif name_ == 'particular_cosec':
            middleware_data = get_particulars_of_cosec(information_url, request_headers, registration_, entity_type_)
            data_loaded = particular_cosec(middleware_data, new_entity_id, language_)  

        elif name_ == 'particular_audit_firm':
            middleware_data = get_particulars_of_adt_firm(information_url, request_headers, registration_, entity_type_)
            data_loaded = particular_audit_firm(middleware_data, new_entity_id, language_)  

        elif name_ == 'btl':
            middleware_data = get_info_rob_termination(information_url, request_headers, registration_, entity_type_)
            data_loaded = info_rob_termination(middleware_data, new_entity_id, language_, entity_type_)

        elif name_ == 'company_charges':
            middleware_data = get_info_charges(information_url, request_headers, registration_, entity_type_)
            data_loaded = company_charges(middleware_data, new_entity_id, language_, entity_type_)

        else:
            pass
        

        if language_ == 'en':
            html_string = render_to_string('product/'+ name_ +'_en.html', {'data': data_loaded})

        elif language_ == 'ms':
            html_string = render_to_string('product/'+ name_ +'_ms.html', {'data': data_loaded})

            
        html = HTML(string=html_string)
        pdf_file = html.write_pdf(stylesheets=[CSS('https://pipeline-project.sgp1.digitaloceanspaces.com/mbpp-elatihan/css/template.css')])
            
        file_path = "ssm/product/" + name_ + "-" + datetime.utcnow().strftime("%s") + "-" + uuid.uuid4().hex + '.pdf'
        saved_file = default_storage.save(
            file_path, 
            ContentFile(pdf_file)
        )
            
        full_url_path = settings.MEDIA_ROOT + saved_file

        serializer = data_loaded
        serializer['pdflink'] = 'https://pipeline-project.sgp1.digitaloceanspaces.com/' + file_path
        return Response(serializer)
