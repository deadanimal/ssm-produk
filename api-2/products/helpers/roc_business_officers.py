import string
import pytz
import json

from datetime import datetime
from django.utils.timezone import make_aware
from .mapping import officer_designation_mapping, state_mapping, charge_code

def roc_business_officers(mdw_1, mdw_2, lang):
    
    data_mdw_1 = mdw_1
    data_mdw_2 = mdw_2

    date_format = "%d-%m-%Y"
    time_zone = 'Asia/Kuala_Lumpur'

    
    business_address_info = mdw_1["rocBusinessAddressInfo"]
    business_address_info['stateString'] = state_mapping(business_address_info["state"]) 
    registered_address_info = mdw_1["rocRegAddressInfo"]
    registered_address_info['stateString'] = state_mapping(registered_address_info["state"]) 

    #weird_change_date_old = data_mdw_1['rocCompanyInfo']['dateOfChange']
    weird_incorp_date_old = data_mdw_1['rocCompanyInfo']['incorpDate']['#text']


    #temp_change_date_old = make_aware(datetime.strptime(weird_change_date_old, '%Y-%m-%dT%H:%M:%S.000Z'))
    #temp_change_date_new = temp_change_date_old.astimezone(pytz.timezone(time_zone)).strftime(date_format)
    temp_incorp_date_old = make_aware(datetime.strptime(weird_incorp_date_old, '%Y-%m-%dT%H:%M:%S.000Z'))
    temp_incorp_date_new = temp_incorp_date_old.astimezone(pytz.timezone(time_zone)).strftime(date_format)


    temp_comp_type_old = data_mdw_1['rocCompanyInfo']['companyStatus']
    if temp_comp_type_old == 'R':
        temp_comp_type_new = 'PRIVATE LIMITED'
    elif temp_comp_type_old == 'U':
        temp_comp_type_new = 'PUBLIC LIMITED'
    
    temp_comp_status_old = data_mdw_1['rocCompanyInfo']['companyType']
    if temp_comp_status_old == 'S':
        temp_comp_status_new = 'LIMITED BY SHARES'
    elif temp_comp_status_old == 'G':
        temp_comp_status_new = 'LIMITED BY GUARANTEE'
    elif temp_comp_status_old == 'B':
        temp_comp_status_new = 'LIMITED BY SHARE AND GUARANTEE'
    elif temp_comp_status_old == 'U':
        temp_comp_status_new = 'UNLIMITED'

    temp_status_of_comp_old = data_mdw_1['rocCompanyInfo']['statusOfCompany']
    if temp_status_of_comp_old == 'E':
        temp_status_of_comp_new = 'Existing'
    elif temp_status_of_comp_old == 'W':
        temp_status_of_comp_new = 'Winding Up'
    elif temp_status_of_comp_old == 'D':
        temp_status_of_comp_new = 'Dissolved'
    
    temp_reg_address_1_old = data_mdw_1['rocRegAddressInfo']['address1']
    temp_reg_address_2_old = data_mdw_1['rocRegAddressInfo']['address2']
    temp_reg_address_3_old = data_mdw_1['rocRegAddressInfo']['address3']
    temp_reg_postcode_old = data_mdw_1['rocRegAddressInfo']['postcode']
    temp_reg_town_old = data_mdw_1['rocRegAddressInfo']['town']
    temp_reg_state_old = data_mdw_1['rocRegAddressInfo']['state']

    if temp_reg_address_1_old == 'TIADA FAIL':
        temp_reg_address_1_new = None
    elif temp_reg_address_1_old == None:
        temp_reg_address_1_new = None
    else:
        temp_reg_address_1_new = temp_reg_address_1_old

    if temp_reg_address_2_old == 'TIADA FAIL':
        temp_reg_address_2_new = None
    elif temp_reg_address_2_old == None:
        temp_reg_address_2_new = None
    else:
        temp_reg_address_2_new = temp_reg_address_2_old

    if temp_reg_address_3_old == 'TIADA FAIL':
        temp_reg_address_3_new = None
    elif temp_reg_address_3_old == None:
        temp_reg_address_3_new = None
    else:
        temp_reg_address_3_new = temp_reg_address_3_old

    if temp_reg_state_old == 'TIADA FAIL':
        temp_reg_state_new = None
    elif temp_reg_state_old == None:
        temp_reg_state_new = None
    else:
        temp_reg_state_new = temp_reg_state_old

    if temp_reg_state_old == 'R':
        temp_reg_state_new = 'PERLIS'
    elif temp_reg_state_old == 'K':
        temp_reg_state_new = 'KEDAH'
    elif temp_reg_state_old == 'P':
        temp_reg_state_new = 'PULAU PINANG'
    elif temp_reg_state_old == 'D':
        temp_reg_state_new = 'KELANTAN'
    elif temp_reg_state_old == 'T':
        temp_reg_state_new = 'TERENGGANU'
    elif temp_reg_state_old == 'A':
        temp_reg_state_new = 'PERAK'
    elif temp_reg_state_old == 'B':
        temp_reg_state_new = 'SELANGOR'
    elif temp_reg_state_old == 'C':
        temp_reg_state_new = 'PAHANG'
    elif temp_reg_state_old == 'M':
        temp_reg_state_new = 'MELAKA'
    elif temp_reg_state_old == 'J':
        temp_reg_state_new = 'JOHOR'
    elif temp_reg_state_old == 'X':
        temp_reg_state_new = 'SABAH'
    elif temp_reg_state_old == 'Y':
        temp_reg_state_new = 'SARAWAK'
    elif temp_reg_state_old == 'L':
        temp_reg_state_new = 'LABUAN'
    elif temp_reg_state_old == 'W':
        temp_reg_state_new = 'WILAYAH PERSEKUTUAN'
    elif temp_reg_state_old == 'Q':
        temp_reg_state_new = 'SINGAPURA'
    elif temp_reg_state_old == 'U':
        temp_reg_state_new = 'WILAYAH PERSEKUTUAN PUTRAJAYA'
    elif temp_reg_state_old == 'F':
        temp_reg_state_new = 'FOREIGN'
    elif temp_reg_state_old == 'I':
        temp_reg_state_new = 'INTERNET'
    elif temp_reg_state_old == 'S':
        temp_reg_state_new = 'SABAH'
    elif temp_reg_state_old == 'E':
        temp_reg_state_new = 'SARAWAK'
    
    if temp_reg_postcode_old == 'TIADA FAIL':
        temp_reg_postcode_new = None
    elif temp_reg_postcode_old == None:
        temp_reg_postcode_new = None
    else:
        temp_reg_postcode_new = temp_reg_postcode_old

    if temp_reg_town_old == 'TIADA FAIL':
        temp_reg_town_new = None
    elif temp_reg_town_old == None:
        temp_reg_town_new = None
    else:
        temp_reg_town_new = temp_reg_town_old
    
    temp_comp_origin_old = data_mdw_1['rocCompanyInfo']['companyCountry']

    if temp_comp_origin_old == 'MAL':
        temp_comp_origin_new = 'MALAYSIA'
    elif temp_comp_origin_old == None:
        temp_comp_origin_new = None
    else:
        temp_comp_origin_new = None
    
    temp_biz_address_1_old = data_mdw_1['rocBusinessAddressInfo']['address1']
    temp_biz_address_2_old = data_mdw_1['rocBusinessAddressInfo']['address2']
    temp_biz_address_3_old = data_mdw_1['rocBusinessAddressInfo']['address3']
    temp_biz_postcode_old = data_mdw_1['rocBusinessAddressInfo']['postcode']
    temp_biz_town_old = data_mdw_1['rocBusinessAddressInfo']['town']
    temp_biz_state_old = data_mdw_1['rocBusinessAddressInfo']['state']

    if temp_biz_address_1_old == 'TIADA FAIL':
        temp_biz_address_1_new = None
    elif temp_biz_address_1_old == None:
        temp_biz_address_1_new = None
    else:
        temp_biz_address_1_new = temp_biz_address_1_old

    if temp_biz_address_2_old == 'TIADA FAIL':
        temp_biz_address_2_new = None
    elif temp_biz_address_2_old == None:
        temp_biz_address_2_new = None
    else:
        temp_biz_address_2_new = temp_biz_address_2_old

    if temp_biz_address_3_old == 'TIADA FAIL':
        temp_biz_address_3_new = None
    elif temp_biz_address_3_old == None:
        temp_biz_address_3_new = None
    else:
        temp_biz_address_3_new = temp_biz_address_3_old

    if temp_biz_state_old == 'TIADA FAIL':
        temp_biz_state_new = None
    elif temp_biz_state_old == None:
        temp_biz_state_new = None
    else:
        temp_biz_state_new = temp_biz_state_old

    if temp_biz_state_old == 'R':
        temp_biz_state_new = 'PERLIS'
    elif temp_biz_state_old == 'K':
        temp_biz_state_new = 'KEDAH'
    elif temp_biz_state_old == 'P':
        temp_biz_state_new = 'PULAU PINANG'
    elif temp_biz_state_old == 'D':
        temp_biz_state_new = 'KELANTAN'
    elif temp_biz_state_old == 'T':
        temp_biz_state_new = 'TERENGGANU'
    elif temp_biz_state_old == 'A':
        temp_biz_state_new = 'PERAK'
    elif temp_biz_state_old == 'B':
        temp_biz_state_new = 'SELANGOR'
    elif temp_biz_state_old == 'C':
        temp_biz_state_new = 'PAHANG'
    elif temp_biz_state_old == 'M':
        temp_biz_state_new = 'MELAKA'
    elif temp_biz_state_old == 'J':
        temp_biz_state_new = 'JOHOR'
    elif temp_biz_state_old == 'X':
        temp_biz_state_new = 'SABAH'
    elif temp_biz_state_old == 'Y':
        temp_biz_state_new = 'SARAWAK'
    elif temp_biz_state_old == 'L':
        temp_biz_state_new = 'LABUAN'
    elif temp_biz_state_old == 'W':
        temp_biz_state_new = 'WILAYAH PERSEKUTUAN'
    elif temp_biz_state_old == 'Q':
        temp_biz_state_new = 'SINGAPURA'
    elif temp_biz_state_old == 'U':
        temp_biz_state_new = 'WILAYAH PERSEKUTUAN PUTRAJAYA'
    elif temp_biz_state_old == 'F':
        temp_biz_state_new = 'FOREIGN'
    elif temp_biz_state_old == 'I':
        temp_biz_state_new = 'INTERNET'
    elif temp_biz_state_old == 'S':
        temp_biz_state_new = 'SABAH'
    elif temp_biz_state_old == 'E':
        temp_biz_state_new = 'SARAWAK'
    
    if temp_biz_postcode_old == 'TIADA FAIL':
        temp_biz_postcode_new = None
    elif temp_biz_postcode_old == None:
        temp_biz_postcode_new = None
    else:
        temp_biz_postcode_new = temp_biz_postcode_old

    if temp_biz_town_old == 'TIADA FAIL':
        temp_biz_town_new = None
    elif temp_biz_town_old == None:
        temp_biz_town_new = None
    else:
        temp_biz_town_new = temp_biz_town_old


    temp_current_officers = data_mdw_1['rocCompanyOfficerListInfo']['rocCompanyOfficerInfos']['rocCompanyOfficerInfos']
    temp_current_officers_arr = []
    temp_current_officers_arr_inside = []

    print('item',temp_current_officers)
    print('instance',isinstance(temp_current_officers, list))
    if isinstance(temp_current_officers, list):
        for officer in temp_current_officers:
        
            if officer['idType'] == 'MK':

                nric_1 = officer["idNo"][0:6]
                nric_2 = officer["idNo"][6:8]
                nric_3 = officer["idNo"][8:]
                nric = nric_1 + '-' + nric_2 + '-' + nric_3
            else:
                nric = officer["idNo"]        
            officer['idNo'] = nric
            officer['state'] = state_mapping(officer['state'])
            officer['designationCode'] = officer_designation_mapping(officer['designationCode'])
            print('sadasdsad', officer)
            if officer['startDate']['#text']:
                officer['startDate'] = make_aware(datetime.strptime(officer['startDate']['#text'], '%Y-%m-%dT%H:%M:%S.000Z')).astimezone(pytz.timezone(time_zone)).strftime(date_format)

            if len(temp_current_officers_arr_inside) < 5:
                temp_current_officers_arr_inside.append(officer)

                if len(temp_current_officers) == temp_current_officers.index(officer) + 1:
                    temp_current_officers_arr.append(temp_current_officers_arr_inside)    
            else:
                temp_current_officers_arr.append(temp_current_officers_arr_inside)
                temp_current_officers_arr_inside = []
    else:
        if officer['idType'] == 'MK':
            nric_1 = officer["idNo"][0:6]
            nric_2 = officer["idNo"][6:8]
            nric_3 = officer["idNo"][8:]
            nric = nric_1 + '-' + nric_2 + '-' + nric_3
        else:
            nric = officer["idNo"]    

        officer['idNo'] = nric
        officer['state'] = state_mapping(officer['state'])
        officer['designationCode'] = officer_designation_mapping(officer['designationCode'])
        print('sadasdsad', officer)
        officer['startDate'] = make_aware(datetime.strptime(officer['startDate']['#text'], '%Y-%m-%dT%H:%M:%S.000Z')).astimezone(pytz.timezone(time_zone)).strftime(date_format)

    if 'rocChangeCompanyOfficerListInfo' in data_mdw_1:
        if 'rocCompanyOfficerChgsInfos' in data_mdw_1['rocChangeCompanyOfficerListInfo']:
            if data_mdw_1['rocChangeCompanyOfficerListInfo']['rocCompanyOfficerChgsInfos']:
                temp_previous_officers = data_mdw_1['rocChangeCompanyOfficerListInfo']['rocCompanyOfficerChgsInfos']['rocCompanyOfficerChgsInfos']
                temp_previous_officers_arr = []
                temp_previous_officers_arr_inside = []
            else:
                temp_previous_officers = []
                temp_previous_officers_arr = []
    else:
        temp_previous_officers = []
        temp_previous_officers_arr = []


    for officer in temp_previous_officers:
        if officer['idType'] == 'MK':

            nric_1 = officer["idNo"][0:6]
            nric_2 = officer["idNo"][6:8]
            nric_3 = officer["idNo"][8:]
            nric = nric_1 + '-' + nric_2 + '-' + nric_3
        else:
            nric = officer["idNo"]        
        officer['idNo'] = nric
        officer['state'] = state_mapping(officer['state'])
        officer['designationCode'] = officer_designation_mapping(officer['designationCode'])
        officer['startDate'] = make_aware(datetime.strptime(officer['startDate']['#text'], '%Y-%m-%dT%H:%M:%S.000Z')).astimezone(pytz.timezone(time_zone)).strftime(date_format)
        officer['resignDate'] = make_aware(datetime.strptime(officer['resignDate']['#text'], '%Y-%m-%dT%H:%M:%S.000Z')).astimezone(pytz.timezone(time_zone)).strftime(date_format)
        
        if len(temp_previous_officers_arr_inside) < 5:
            temp_previous_officers_arr_inside.append(officer)

            if len(temp_previous_officers) == temp_previous_officers.index(officer) + 1:
                temp_previous_officers_arr.append(temp_previous_officers_arr_inside)               
        else:
            temp_previous_officers_arr.append(temp_previous_officers_arr_inside)
            temp_previous_officers_arr_inside = []


    company_info = mdw_1["rocCompanyInfo"]

    if 'dateOfChange' in data_mdw_1["rocCompanyInfo"]:
        if '#text' in data_mdw_1["rocCompanyInfo"]['dateOfChange']:
            date_of_change = make_aware(datetime.strptime(data_mdw_1["rocCompanyInfo"]['dateOfChange']['#text'], '%Y-%m-%dT%H:%M:%S.000Z'))
            date_of_change_str = date_of_change.astimezone(pytz.timezone(time_zone)).strftime(date_format)
        else:
            date_of_change_str = 'NIL'
    else:
        date_of_change_str = 'NIL'    

    data_ready = {
        'mdw1': data_mdw_1,
        'mdw2': data_mdw_2,
        'corpInfo': {
            'compName': data_mdw_1['rocCompanyInfo']['companyName'],
            'compOldName': data_mdw_1['rocCompanyInfo']['companyOldName'],
            #'changeDate': temp_change_date_new,
            'checkDigit': data_mdw_1['rocCompanyInfo']['checkDigit'],
            'companyType': temp_comp_type_new,
            'companyStatus': temp_comp_status_new,        
            'statusOfCompany': temp_status_of_comp_new,
            'reg_address1': temp_reg_address_1_new,
            'reg_address2': temp_reg_address_2_new,
            'reg_address3': temp_reg_address_3_new,
            'reg_state': temp_reg_state_new,
            'reg_town': temp_reg_town_new,
            'reg_postcode': temp_reg_postcode_new,
            'reg_origin': temp_comp_origin_new,
            'biz_address1': temp_biz_address_1_new,
            'biz_address3': temp_biz_address_2_new,
            'biz_address3': temp_biz_address_3_new,
            'biz_state': temp_biz_state_new,
            'biz_town': temp_biz_town_new,
            'biz_postcode': temp_biz_postcode_new,            
            'biz_nature': data_mdw_1['rocCompanyInfo']['businessDescription']
        },
        'current': temp_current_officers_arr,
        'previous': temp_previous_officers_arr,
        'company_info': company_info,
        'date_of_change': date_of_change_str,
        'compNoNew': data_mdw_2['newFormatNo'],
        'compNoOld': data_mdw_2['oldFormatNo'],   
        'incorp_date': temp_incorp_date_new,
        'business_address_info': business_address_info,
        'registered_address_info': registered_address_info,
    }

    return data_ready