from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
# from rest_framework
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
from datetime import timedelta

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        token['user_type'] = user.user_type
        # print('Access', token.access_token)
        # print('Refresh', token)
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        # print('Access')
        refresh = self.get_token(self.user)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        return data


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

# Start SSO SAML
from django.conf import settings
from django.urls import reverse
from django.http import (
    HttpResponse, 
    HttpResponseRedirect,
    HttpResponseServerError
)
from django.shortcuts import render

from onelogin.saml2.auth import OneLogin_Saml2_Auth
from onelogin.saml2.settings import OneLogin_Saml2_Settings
from onelogin.saml2.utils import OneLogin_Saml2_Utils
from onelogin.saml2.idp_metadata_parser import OneLogin_Saml2_IdPMetadataParser
# End SSO SAML 

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
            permission_classes = [AllowAny] # IsAuthenticated AllowAny
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        user = self.request.user
        queryset = CustomUser.objects.all()

        # if user.user_type == 'EG':
        #     queryset = CustomUser.objects.filter(
        #         id = user.id
        #     )
        # elif user.user_type == 'PB':
        #     queryset = CustomUser.objects.filter(
        #         id = user.id
        #     )
        # elif user.user_type == 'AD':
        #     queryset = CustomUser.objects.all()              
        # else:
        #     queryset = CustomUser.objects.none()

        return queryset 

    # @action(methods=['GET'], detail=False)
    # def get_self_info(self, request, *args, **kwargs):


    @action(methods=['GET'], detail=False)
    def get_egov_users(self, request, *args, **kwargs): 

        users = CustomUser.objects.filter(user_type='EG')
        serializer = CustomUserSerializer(users, many=True)
        
        return Response(serializer.data)        
 
    @action(methods=['POST'], detail=True)
    def register_egov(self, request, *args, **kwargs):
        user = self.get_object()
        user.save()

        serializer = CustomUserSerializer(user)
        return Response(serializer.data)
    
    @action(methods=['POST'], detail=True)
    def approve_egov(self, request, *args, **kwargs):
        user = self.get_object()
        user.user_type = 'EG'
        user.save()

        serializer = CustomUserSerializer(user)
        return Response(serializer.data)
    
    @action(methods=['POST'], detail=True)
    def reject_egov(self, request, *args, **kwargs):
        user = self.get_object()
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

    @action(methods=['GET'], detail=False)
    def lol(self, request, *args, **kwargs): 

        users = CustomUser.objects.all()
        serializer = CustomUserSerializer(users, many=True)

        for user in users:
            print(user.email, ': ', user.id)
        
        return Response(serializer.data)         

# SAML
def init_saml_auth(req):
    auth = OneLogin_Saml2_Auth(req, custom_base_path=settings.SAML_FOLDER)
    return auth


def prepare_django_request(request):
    # If server is behind proxys or balancers use the HTTP_X_FORWARDED fields
    result = {
        'https': 'on' if request.is_secure() else 'off',
        'http_host': request.META['HTTP_HOST'],
        'script_name': request.META['PATH_INFO'],
        'server_port': request.META['SERVER_PORT'],
        'get_data': request.GET.copy(),
        # Uncomment if using ADFS as IdP, https://github.com/onelogin/python-saml/pull/144
        # 'lowercase_urlencoding': True,
        'post_data': request.POST.copy()
    }
    return result

@csrf_exempt
def index(request):
    req = prepare_django_request(request)
    auth = init_saml_auth(req)
    errors = []
    error_reason = None
    not_auth_warn = False
    success_slo = False
    attributes = False
    paint_logout = False

    if 'sso' in req['get_data']:
        # return HttpResponseRedirect(auth.login())
        # If AuthNRequest ID need to be stored in order to later validate it, do instead
        sso_built_url = auth.login()
        request.session['AuthNRequestID'] = auth.get_last_request_id()
        return HttpResponseRedirect(sso_built_url)

    elif 'sso2' in req['get_data']:
        return_to = OneLogin_Saml2_Utils.get_self_url(req) + reverse('attrs')
        return HttpResponseRedirect(auth.login(return_to))

    elif 'slo' in req['get_data']:
        name_id = session_index = name_id_format = name_id_nq = name_id_spnq = None
        if 'samlNameId' in request.session:
            name_id = request.session['samlNameId']
        if 'samlSessionIndex' in request.session:
            session_index = request.session['samlSessionIndex']
        if 'samlNameIdFormat' in request.session:
            name_id_format = request.session['samlNameIdFormat']
        if 'samlNameIdNameQualifier' in request.session:
            name_id_nq = request.session['samlNameIdNameQualifier']
        if 'samlNameIdSPNameQualifier' in request.session:
            name_id_spnq = request.session['samlNameIdSPNameQualifier']

        return HttpResponseRedirect(
            auth.logout(
                name_id=name_id, 
                session_index=session_index, 
                nq=name_id_nq, 
                name_id_format=name_id_format, 
                spnq=name_id_spnq
            )
        )
        # If LogoutRequest ID need to be stored in order to later validate it, do instead
        # slo_built_url = auth.logout(name_id=name_id, session_index=session_index)
        # request.session['LogoutRequestID'] = auth.get_last_request_id()
        # return HttpResponseRedirect(slo_built_url)

    elif 'acs' in req['get_data']:
        request_id = None
        if 'AuthNRequestID' in request.session:
            request_id = request.session['AuthNRequestID']
            print('Request ID: ', request_id)

        auth.process_response(request_id=request_id)
        errors = auth.get_errors()
        not_auth_warn = not auth.is_authenticated()
        # print('Error: ', errors)
        # print('Not auth warn: ', not_auth_warn)
        # print('Auth', auth)
        # print(type(auth))
        # print('Attr', auth.get_attributes())

        if not errors:
            if 'AuthNRequestID' in request.session:
                del request.session['AuthNRequestID']
            request.session['samlUserdata'] = auth.get_attributes()
            request.session['samlNameId'] = auth.get_nameid()
            request.session['samlNameIdFormat'] = auth.get_nameid_format()
            request.session['samlNameIdNameQualifier'] = auth.get_nameid_nq()
            request.session['samlNameIdSPNameQualifier'] = auth.get_nameid_spnq()
            request.session['samlSessionIndex'] = auth.get_session_index()
            if 'RelayState' in req['post_data'] and OneLogin_Saml2_Utils.get_self_url(req) != req['post_data']['RelayState']:
                # return HttpResponseRedirect(auth.redirect_to(req['post_data']['RelayState']))
                # return HttpResponseRedirect(auth.redirect_to(req['post_data']['RelayState']))
                user_ = CustomUser.objects.filter(username=request.session['samlNameId']).first()

                user_email_ = request.session['samlUserdata']['Email'][0] if len(request.session['samlUserdata']['Email']) > 0 else None
                user_office_no_ = request.session['samlUserdata']['Office_No'][0] if len(request.session['samlUserdata']['Email']) > 0 else None
                user_name_id_ = request.session['samlUserdata']['NameID'][0] if len(request.session['samlUserdata']['Email']) > 0 else None
                user_fullname_ = request.session['samlUserdata']['Fullname'][0] if len(request.session['samlUserdata']['Email']) > 0 else None
                user_identification_ = request.session['samlUserdata']['Identification_No'][0] if len(request.session['samlUserdata']['Email']) > 0 else None
                user_address_1_ = request.session['samlUserdata']['Address_1'][0] if len(request.session['samlUserdata']['Address_1']) > 0 else None
                user_address_2_ = request.session['samlUserdata']['Address_2'][0] if len(request.session['samlUserdata']['Address_2']) > 0 else None
                user_address_3_ = request.session['samlUserdata']['Address_3'][0] if len(request.session['samlUserdata']['Address_3']) > 0 else None
                user_gender_ = request.session['samlUserdata']['Gender'][0] if len(request.session['samlUserdata']['Gender']) > 0 else None
                user_city_ = request.session['samlUserdata']['City'][0] if len(request.session['samlUserdata']['City']) > 0 else None
                user_state_ = request.session['samlUserdata']['State'][0] if len(request.session['samlUserdata']['State']) > 0 else None
                user_country_ = request.session['samlUserdata']['Country'][0] if len(request.session['samlUserdata']['Country']) > 0 else None
                user_home_no_ = request.session['samlUserdata']['Home_No'][0] if len(request.session['samlUserdata']['Home_No']) > 0 else None
                user_nationality_ = request.session['samlUserdata']['Nationality'][0] if len(request.session['samlUserdata']['Nationality']) > 0 else None
                user_gender_ = request.session['samlUserdata']['Gender'][0] if len(request.session['samlUserdata']['Gender']) > 0 else None
                user_mobile_no_ = request.session['samlUserdata']['Mobile_No'][0] if len(request.session['samlUserdata']['Mobile_No']) > 0 else None
                user_username_ = request.session['samlUserdata']['Username'][0] if len(request.session['samlUserdata']['Username']) > 0 else None
                user_identification_type_ = request.session['samlUserdata']['Identification_Type'][0] if len(request.session['samlUserdata']['Identification_Type']) > 0 else None
                    
                if user_:
                    print(request.session['samlUserdata'])
                    returned_token = MyTokenObtainPairSerializer.get_token(user_)
                    # print('Returned token', returned_token)
                    # print('Access token', returned_token.access)
                else:
                    user_email_ = request.session['samlUserdata']['Email'][0] if len(request.session['samlUserdata']['Email']) > 0 else None
                    user_office_no_ = request.session['samlUserdata']['Office_No'][0] if len(request.session['samlUserdata']['Email']) > 0 else None
                    user_name_id_ = request.session['samlUserdata']['NameID'][0] if len(request.session['samlUserdata']['Email']) > 0 else None
                    user_fullname_ = request.session['samlUserdata']['Fullname'][0] if len(request.session['samlUserdata']['Email']) > 0 else None
                    user_identification_ = request.session['samlUserdata']['Identification_No'][0] if len(request.session['samlUserdata']['Email']) > 0 else None
                    user_address_1_ = request.session['samlUserdata']['Address_1'][0] if len(request.session['samlUserdata']['Address_1']) > 0 else None
                    user_address_2_ = request.session['samlUserdata']['Address_2'][0] if len(request.session['samlUserdata']['Address_2']) > 0 else None
                    user_address_3_ = request.session['samlUserdata']['Address_3'][0] if len(request.session['samlUserdata']['Address_3']) > 0 else None
                    user_gender_ = request.session['samlUserdata']['Gender'][0] if len(request.session['samlUserdata']['Gender']) > 0 else None
                    user_city_ = request.session['samlUserdata']['City'][0] if len(request.session['samlUserdata']['City']) > 0 else None
                    user_state_ = request.session['samlUserdata']['State'][0] if len(request.session['samlUserdata']['State']) > 0 else None
                    user_country_ = request.session['samlUserdata']['Country'][0] if len(request.session['samlUserdata']['Country']) > 0 else None
                    user_home_no_ = request.session['samlUserdata']['Home_No'][0] if len(request.session['samlUserdata']['Home_No']) > 0 else None
                    user_nationality_ = request.session['samlUserdata']['Nationality'][0] if len(request.session['samlUserdata']['Nationality']) > 0 else None
                    user_gender_ = request.session['samlUserdata']['Gender'][0] if len(request.session['samlUserdata']['Gender']) > 0 else None
                    user_mobile_no_ = request.session['samlUserdata']['Mobile_No'][0] if len(request.session['samlUserdata']['Mobile_No']) > 0 else None
                    user_username_ = request.session['samlUserdata']['Username'][0] if len(request.session['samlUserdata']['Username']) > 0 else None
                    user_identification_type_ = request.session['samlUserdata']['Identification_Type'][0] if len(request.session['samlUserdata']['Identification_Type']) > 0 else None
                    

                # print('User data: ', request.session['samlUserdata'])
                # print('Email: ', request.session['samlNameId'])
                resp = HttpResponseRedirect(auth.redirect_to('https://xcessdev.ssm.com.my/#/home/'))
                max_age = 3600 * 24
                expires = datetime.strftime(datetime.utcnow() + timedelta(seconds=max_age), "%a, %d-%b-%Y %H:%M:%S GMT")
                resp.set_cookie('userEmail', request.session['samlNameId'], max_age=max_age, expires=expires,domain='ssm.com.my')
                resp.set_cookie('refresh', returned_token, max_age=max_age, expires=expires,domain='ssm.com.my')
                resp.set_cookie('access', returned_token.access_token, max_age=max_age, expires=expires,domain='ssm.com.my')
                print('RESP: ', resp)
                return resp
        elif auth.get_settings().is_debug_active():
                error_reason = auth.get_last_error_reason()
                print('Error reason (ACS): ', error_reason)

    elif 'sls' in req['get_data']:
        request_id = None
        if 'LogoutRequestID' in request.session:
            request_id = request.session['LogoutRequestID']
        dscb = lambda: request.session.flush()
        url = auth.process_slo(request_id=request_id, delete_session_cb=dscb)
        errors = auth.get_errors()
        if len(errors) == 0:
            if url is not None:
                return HttpResponseRedirect(url)
            else:
                success_slo = True
        elif auth.get_settings().is_debug_active():
            error_reason = auth.get_last_error_reason()
            print('Error reason (SLS): ', error_reason)

    if 'samlUserdata' in request.session:
        paint_logout = True
        if len(request.session['samlUserdata']) > 0:
            attributes = request.session['samlUserdata'].items()

    return render(
        request, 
        'index.html', 
        {
            'errors': errors, 
            'error_reason': error_reason, 
            'not_auth_warn': not_auth_warn, 
            'success_slo': success_slo,
            'attributes': attributes, 
            'paint_logout': paint_logout
        }
    )


def attrs(request):
    paint_logout = False
    attributes = False

    if 'samlUserdata' in request.session:
        paint_logout = True
        if len(request.session['samlUserdata']) > 0:
            attributes = request.session['samlUserdata'].items()
            return render(
                request, 'attrs.html',
                {
                    'paint_logout': paint_logout,
                    'attributes': attributes
                }
            )


def metadata(request):
    # req = prepare_django_request(request)
    # auth = init_saml_auth(req)
    # saml_settings = auth.get_settings()
    saml_settings = OneLogin_Saml2_Settings(settings=None, custom_base_path=settings.SAML_FOLDER, sp_validation_only=True)
    metadata = saml_settings.get_sp_metadata()
    errors = saml_settings.validate_metadata(metadata)

    if len(errors) == 0:
        resp = HttpResponse(content=metadata, content_type='text/xml')
    else:
        resp = HttpResponseServerError(content=', '.join(errors))
    return resp
