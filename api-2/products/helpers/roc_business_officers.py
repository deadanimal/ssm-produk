import string
import pytz
import json

from datetime import datetime
from django.utils.timezone import make_aware

def roc_business_officers(mdw_1, mdw_2, lang):
    
    data_mdw_1 = mdw_1
    data_mdw_2 = mdw_2

    date_format = "%d-%m-%Y"
    time_zone = 'Asia/Kuala_Lumpur'

    print(mdw_1)

    #weird_change_date_old = data_mdw_1['rocCompanyInfo']['dateOfChange']
    weird_incorp_date_old = data_mdw_1['rocCompanyInfo']['incorpDate']['#text']
    print(weird_incorp_date_old)

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
    for x in temp_current_officers:
        # print('xxx', x)
        if x['state'] == 'R':
            x['state'] = 'PERLIS'
        elif x['state'] == 'K':
            x['state'] = 'KEDAH'
        elif x['state'] == 'P':
            x['state'] = 'PULAU PINANG'
        elif x['state'] == 'D':
            x['state'] = 'KELANTAN'
        elif x['state'] == 'T':
            x['state'] = 'TERENGGANU'
        elif x['state'] == 'A':
            x['state'] = 'PERAK'
        elif x['state'] == 'B':
            x['state'] = 'SELANGOR'
        elif x['state'] == 'C':
            x['state'] = 'PAHANG'
        elif x['state'] == 'M':
            x['state'] = 'MELAKA'
        elif x['state'] == 'J':
            x['state'] = 'JOHOR'
        elif x['state'] == 'X':
            x['state'] = 'SABAH'
        elif x['state'] == 'Y':
            x['state'] = 'SARAWAK'
        elif x['state'] == 'L':
            x['state'] = 'LABUAN'
        elif x['state'] == 'W':
            x['state'] = 'WILAYAH PERSEKUTUAN'
        elif x['state'] == 'Q':
            x['state'] = 'SINGAPURA'
        elif x['state'] == 'U':
            x['state'] = 'WILAYAH PERSEKUTUAN PUTRAJAYA'
        elif x['state'] == 'F':
            x['state'] = 'FOREIGN'
        elif x['state'] == 'I':
            x['state'] = 'INTERNET'
        elif x['state'] == 'S':
            x['state'] = 'SABAH'
        elif x['state'] == 'E':
            x['state'] = 'SARAWAK'

        if x['designationCode'] == 'D':
            designation = 'DIRECTOR'
        elif x['designationCode'] == 'S':
            designation = 'SECRETARY'

        date_format_n = '%d/%m/%Y'
        temp_dateAppointment = make_aware(datetime.strptime(x['startDate']['#text'], '%Y-%m-%dT%H:%M:%S.000Z'))
        temp_dateAppointment = temp_dateAppointment.astimezone(pytz.timezone(time_zone)).strftime(date_format_n)
        
        temp_current_officers_arr.append({
            'name': x['name'],
            'address1': x['address1'],
            'address2': x['address2'],
            'address3': x['address3'],
            'postcode': x['postcode'],
            'town': x['town'],
            'state': x['state'],
            'idNo': x['idNo'],
            'designation': designation,
            'dateAppointment': temp_dateAppointment
        })

    temp_previous_officers = data_mdw_1['rocChangeCompanyOfficerListInfo']['rocCompanyOfficerChgsInfos']['rocCompanyOfficerChgsInfos']

    temp_previous_officers_arr = []
    for x in temp_previous_officers:
        # print('xxx', x)
        if x['state'] == 'R':
            x['state'] = 'PERLIS'
        elif x['state'] == 'K':
            x['state'] = 'KEDAH'
        elif x['state'] == 'P':
            x['state'] = 'PULAU PINANG'
        elif x['state'] == 'D':
            x['state'] = 'KELANTAN'
        elif x['state'] == 'T':
            x['state'] = 'TERENGGANU'
        elif x['state'] == 'A':
            x['state'] = 'PERAK'
        elif x['state'] == 'B':
            x['state'] = 'SELANGOR'
        elif x['state'] == 'C':
            x['state'] = 'PAHANG'
        elif x['state'] == 'M':
            x['state'] = 'MELAKA'
        elif x['state'] == 'J':
            x['state'] = 'JOHOR'
        elif x['state'] == 'X':
            x['state'] = 'SABAH'
        elif x['state'] == 'Y':
            x['state'] = 'SARAWAK'
        elif x['state'] == 'L':
            x['state'] = 'LABUAN'
        elif x['state'] == 'W':
            x['state'] = 'WILAYAH PERSEKUTUAN'
        elif x['state'] == 'Q':
            x['state'] = 'SINGAPURA'
        elif x['state'] == 'U':
            x['state'] = 'WILAYAH PERSEKUTUAN PUTRAJAYA'
        elif x['state'] == 'F':
            x['state'] = 'FOREIGN'
        elif x['state'] == 'I':
            x['state'] = 'INTERNET'
        elif x['state'] == 'S':
            x['state'] = 'SABAH'
        elif x['state'] == 'E':
            x['state'] = 'SARAWAK'

        if x['designationCode'] == 'D':
            designation = 'DIRECTOR'
        elif x['designationCode'] == 'S':
            designation = 'SECRETARY'

        date_format_n = '%d/%m/%Y'
        temp_dateAppointment = make_aware(datetime.strptime(x['startDate']['#text'], '%Y-%m-%dT%H:%M:%S.000Z'))
        temp_dateAppointment = temp_dateAppointment.astimezone(pytz.timezone(time_zone)).strftime(date_format_n)

        temp_dateResign = make_aware(datetime.strptime(x['resignDate']['#text'], '%Y-%m-%dT%H:%M:%S.000Z'))
        temp_dateResign = temp_dateResign.astimezone(pytz.timezone(time_zone)).strftime(date_format_n)
        
        temp_previous_officers_arr.append({
            'name': x['name'],
            'address1': x['address1'],
            'address2': x['address2'],
            'address3': x['address3'],
            'postcode': x['postcode'],
            'town': x['town'],
            'state': x['state'],
            'idNo': x['idNo'],
            'designation': designation,
            'dateAppointment': temp_dateAppointment,
            'dateResign': temp_dateResign
        })

    data_ready = {
        'corpInfo': {
            'compName': data_mdw_1['rocCompanyInfo']['companyName'],
            'compOldName': data_mdw_1['rocCompanyInfo']['companyOldName'],
            #'changeDate': temp_change_date_new,
            'compNoNew': data_mdw_2['newFormatNo'],
            'compNoOld': data_mdw_2['oldFormatNo'],
            'checkDigit': data_mdw_1['rocCompanyInfo']['checkDigit'],
            'incorpDate': temp_incorp_date_new,
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
        'previous': temp_previous_officers_arr
    }

    print(data_ready)

    return data_ready