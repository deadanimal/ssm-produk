import string
import pytz
import json

from datetime import datetime
from django.utils.timezone import make_aware

def info_fin_2(mdw_1, mdw_2, lang):
    
    data_mdw_1 = mdw_1
    data_mdw_2 = mdw_2

    date_format = "%d-%m-%Y"
    time_zone = 'Asia/Kuala_Lumpur'

    temp_comp_status_old = data_mdw_1['compStatus']
    
    if temp_comp_status_old == 'E':
        temp_comp_status_new = 'Existing'
    elif temp_comp_status_old == 'W':
        temp_comp_status_new = 'Winding Up'
    elif temp_comp_status_old == 'D':
        temp_comp_status_new = 'Dissolved'

    temp_incorpDate_old = make_aware(datetime.strptime(data_mdw_1['incorpDate'], '%Y-%m-%dT%H:%M:%S.000Z'))
    temp_incorpDate_new = temp_incorpDate_old.astimezone(pytz.timezone(time_zone)).strftime(date_format)


    temp_comp_info_change_date_old = make_aware(datetime.strptime(data_mdw_1['rocCompanyInfo']['dateOfChange'], '%Y-%m-%dT%H:%M:%S.000Z'))
    temp_comp_info_change_date_new = temp_comp_info_change_date_old(pytz.timezone(time_zone)).strftime(date_format)

    temp_comp_info_incorp_date_old = make_aware(datetime.strptime(data_mdw_1['rocCompanyInfo']['incorpDate'], '%Y-%m-%dT%H:%M:%S.000Z'))
    temp_comp_info_incorp_date_new = temp_comp_info_incorp_date_old.astimezone(pytz.timezone(time_zone)).strftime(date_format)

    temp_comp_type_old = data_mdw_1['rocCompanyInfo']['companyType']
    if temp_comp_type_old == 'R':
        temp_comp_type_new = 'PRIVATE LIMITED'
    elif temp_comp_type_old == 'U':
        temp_comp_type_new = 'PUBLIC LIMITED'
    
    temp_comp_status_old = data_mdw_1['rocCompanyInfo']['companyStatus']
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

    financial_1 = data_mdw_1['rocBalanceSheetListInfo']['rocBalanceSheetInfos']['rocBalanceSheetInfos']
    financial_2 = data_mdw_1['rocProfitLossListInfo']['rocProfitLossInfos']['rocProfitLossInfos']
    
    temp_audit_address_1_old = financial_1['auditFirmAddress1']
    temp_audit_address_2_old = financial_1['auditFirmAddress2']
    temp_audit_address_3_old = financial_1['auditFirmAddress3']
    temp_audit_postcode_old = financial_1['auditFirmPostcode']
    temp_audit_town_old = financial_1['auditFirmTown']
    temp_audit_state_old = financial_1['auditFirmState']

    if temp_audit_address_1_old == 'TIADA FAIL':
        temp_audit_address_1_new = None
    elif temp_audit_address_1_old == None:
        temp_audit_address_1_new = None
    else:
        temp_audit_address_1_new = temp_audit_address_1_old

    if temp_audit_address_2_old == 'TIADA FAIL':
        temp_audit_address_2_new = None
    elif temp_audit_address_2_old == None:
        temp_audit_address_2_new = None
    else:
        temp_audit_address_2_new = temp_audit_address_2_old

    if temp_audit_address_3_old == 'TIADA FAIL':
        temp_audit_address_3_new = None
    elif temp_audit_address_3_old == None:
        temp_audit_address_3_new = None
    else:
        temp_audit_address_3_new = temp_audit_address_3_old

    if temp_audit_state_old == 'TIADA FAIL':
        temp_audit_state_new = None
    elif temp_audit_state_old == None:
        temp_audit_state_new = None
    else:
        temp_audit_state_new = temp_audit_state_old

    if temp_audit_state_old == 'R':
        temp_audit_state_new = 'PERLIS'
    elif temp_audit_state_old == 'K':
        temp_audit_state_new = 'KEDAH'
    elif temp_audit_state_old == 'P':
        temp_audit_state_new = 'PULAU PINANG'
    elif temp_audit_state_old == 'D':
        temp_audit_state_new = 'KELANTAN'
    elif temp_audit_state_old == 'T':
        temp_audit_state_new = 'TERENGGANU'
    elif temp_audit_state_old == 'A':
        temp_audit_state_new = 'PERAK'
    elif temp_audit_state_old == 'B':
        temp_audit_state_new = 'SELANGOR'
    elif temp_audit_state_old == 'C':
        temp_audit_state_new = 'PAHANG'
    elif temp_audit_state_old == 'M':
        temp_audit_state_new = 'MELAKA'
    elif temp_audit_state_old == 'J':
        temp_audit_state_new = 'JOHOR'
    elif temp_audit_state_old == 'X':
        temp_audit_state_new = 'SABAH'
    elif temp_audit_state_old == 'Y':
        temp_audit_state_new = 'SARAWAK'
    elif temp_audit_state_old == 'L':
        temp_audit_state_new = 'LABUAN'
    elif temp_audit_state_old == 'W':
        temp_audit_state_new = 'WILAYAH PERSEKUTUAN'
    elif temp_audit_state_old == 'Q':
        temp_audit_state_new = 'SINGAPURA'
    elif temp_audit_state_old == 'U':
        temp_audit_state_new = 'WILAYAH PERSEKUTUAN PUTRAJAYA'
    elif temp_audit_state_old == 'F':
        temp_audit_state_new = 'FOREIGN'
    elif temp_audit_state_old == 'I':
        temp_audit_state_new = 'INTERNET'
    elif temp_audit_state_old == 'S':
        temp_audit_state_new = 'SABAH'
    elif temp_audit_state_old == 'E':
        temp_audit_state_new = 'SARAWAK'
    
    if temp_audit_postcode_old == 'TIADA FAIL':
        temp_audit_postcode_new = None
    elif temp_audit_postcode_old == None:
        temp_audit_postcode_new = None
    else:
        temp_audit_postcode_new = temp_audit_postcode_old

    if temp_audit_town_old == 'TIADA FAIL':
        temp_audit_town_new = None
    elif temp_audit_town_old == None:
        temp_audit_town_new = None
    else:
        temp_audit_town_new = temp_audit_town_old
    
    financial_year_end_1_old = make_aware(datetime.strptime(financial_1['financialYearEndDate'], '%Y-%m-%dT%H:%M:%S.000Z'))
    financial_year_end_1_new = financial_year_end_1_old(pytz.timezone(time_zone)).strftime(date_format)

    financial_year_end_2_old = make_aware(datetime.strptime(financial_2['financialYearEndDate'], '%Y-%m-%dT%H:%M:%S.000Z'))
    financial_year_end_2_new = financial_year_end_2_old(pytz.timezone(time_zone)).strftime(date_format)

    date_of_tabling_1_old = make_aware(datetime.strptime(financial_1['dateOfTabling'], '%Y-%m-%dT%H:%M:%S.000Z'))
    date_of_tabling_1_new = date_of_tabling_1_old(pytz.timezone(time_zone)).strftime(date_format)

    date_of_tabling_2_old = make_aware(datetime.strptime(financial_1['dateOfTabling'], '%Y-%m-%dT%H:%M:%S.000Z'))
    date_of_tabling_2_new = date_of_tabling_2_old(pytz.timezone(time_zone)).strftime(date_format)

    data_ready = {
        'corpInfo': {
            'compName': data_mdw_1['rocCompanyInfo']['companyName']
            'compOldName': data_mdw_1['rocCompanyInfo']['companyOldName']
            'changeDate': temp_comp_info_change_date_new,
            'compNoNew': data_mdw_2['newFormatNo'],
            'compNoOld': data_mdw_2['oldFormatNo'],
            'checkDigit': data_mdw_1['rocCompanyInfo']['checkDigit'],
            'incorpDate': temp_comp_info_incorp_date_new,
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
        'keyFinancial': {
            'auditor_name': financial_1['auditFirmName'],
            'auditor_address1': temp_audit_address_1_new,
            'auditor_address2': temp_audit_address_2_new,
            'auditor_address3': temp_audit_address_3_new,
            'auditor_postcode': temp_audit_postcode_new,
            'auditor_town': temp_audit_town_new,
            'auditor_state': temp_audit_state_new,
            'exempt': 'N',
            'financial_year_end_1': financial_year_end_1_new,
            'financial_year_end_2': financial_year_end_2_new,
            'financialReportType_1': financial_1['financialReportType'],
            'financialReportType_2': financial_2['financialReportType'],
            'accrualAccType_1': financial_1['accrualAccount'],
            'accrualAccType_2': financial_2['accrualAccount'],
            'dateOfTabling_1': date_of_tabling_2_new,
            'dateOfTabling_2': date_of_tabling_2_new,
            'nonCurrAsset_1': financial_1['nonCurrAsset'],
            'nonCurrAsset_2': financial_2['nonCurrAsset'],
            'currentAsset_1': financial_1['currentAsset'],
            'currentAsset_2': financial_2['currentAsset'],
            'nonCurrentLiability_1': financial_1['nonCurrentLiability'],
            'nonCurrentLiability_2': financial_2['nonCurrentLiability'],
            'liability_1': financial_1['liability'],
            'liability_2': financial_2['liability'],
            'paidUpCapital_1': financial_1['paidUpCapital'],
            'paidUpCapital_2': financial_2['paidUpCapital'],
            'reserves_1': financial_1['reserves'],
            'reserves_2': financial_2['reserves'],

            'minorityInterest_1': financial_1['minorityInterest'],
            'minorityInterest_2': financial_2['minorityInterest'],
            'revenue_1': financial_1['revenue'],
            'revenue_2': financial_2['revenue'],
        }
    }

    return data_ready