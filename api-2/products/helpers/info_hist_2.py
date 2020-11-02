import string
import pytz
import json

from datetime import datetime
from django.utils.timezone import make_aware

def info_hist_2(mdw_1, mdw_2, lang):
    
    data_mdw_1 = mdw_1
    data_mdw_2 = mdw_2

    date_format = "%d-%m-%Y"
    time_zone = 'Asia/Kuala_Lumpur'


    import pprint
    pp = pprint.PrettyPrinter(indent=1)
    #pp.pprint(mdw_1)
    print('   ')
    print('historical year 1: ', data_mdw_1)
    print('   ')
    temp_comp_status_old = data_mdw_1['rocCompanyInfo']['companyStatus']
    
    if temp_comp_status_old == 'E':
        temp_comp_status_new = 'Existing'
    elif temp_comp_status_old == 'W':
        temp_comp_status_new = 'Winding Up'
    elif temp_comp_status_old == 'D':
        temp_comp_status_new = 'Dissolved'

    temp_incorpDate_old = make_aware(datetime.strptime(data_mdw_1['rocCompanyInfo']['incorpDate'], '%Y-%m-%dT%H:%M:%S.000Z'))
    temp_incorpDate_new = temp_incorpDate_old.astimezone(pytz.timezone(time_zone)).strftime(date_format)
    
    temp_comp_info_change_date_old = make_aware(datetime.strptime(data_mdw_1['rocCompanyInfo']['dateOfChange'], '%Y-%m-%dT%H:%M:%S.000Z'))
    temp_comp_info_change_date_new = temp_comp_info_change_date_old.astimezone(pytz.timezone(time_zone)).strftime(date_format)

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

    balance_sheet_list = data_mdw_1['rocBalanceSheetListInfo']['rocBalanceSheetInfos']['rocBalanceSheetInfos']
    profit_loss_list = data_mdw_1['rocProfitLossListInfo']['rocProfitLossInfos']['rocProfitLossInfos']

    balance_sheet_data = []

    
    temp_audit_address_1_old = balance_sheet_list['auditFirmAddress1']
    temp_audit_address_2_old = balance_sheet_list['auditFirmAddress2']
    temp_audit_address_3_old = balance_sheet_list['auditFirmAddress3']
    temp_audit_postcode_old = balance_sheet_list['auditFirmPostcode']
    temp_audit_town_old = balance_sheet_list['auditFirmTown']
    temp_audit_state_old = balance_sheet_list['auditFirmState']

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
    
    financial_year_end_old = make_aware(datetime.strptime(balance_sheet_list['financialYearEndDate'], '%Y-%m-%dT%H:%M:%S.000Z'))
    financial_year_end_new = financial_year_end_old.astimezone(pytz.timezone(time_zone)).strftime(date_format)

    date_of_tabling_old = make_aware(datetime.strptime(balance_sheet_list['dateOfTabling'], '%Y-%m-%dT%H:%M:%S.000Z'))
    date_of_tabling_new = date_of_tabling_old.astimezone(pytz.timezone(time_zone)).strftime(date_format)

    year_data = {
        'auditor_name': balance_sheet_list['auditFirmName'],
        'auditor_address1': temp_audit_address_1_new,
        'auditor_address2': temp_audit_address_2_new,
        'auditor_address3': temp_audit_address_3_new,
        'auditor_postcode': temp_audit_postcode_new,
        'auditor_town': temp_audit_town_new,
        'auditor_state': temp_audit_state_new,
        'financial_year_end': financial_year_end_new,
        'financialReportType': balance_sheet_list['financialReportType'],
        'accrualAccType': balance_sheet_list['accrualAccType'],
        'dateOfTabling': date_of_tabling_new,
        'nonCurrAsset':float(balance_sheet_list['nonCurrAsset']),
        'currentAsset':float(balance_sheet_list['currentAsset']),
        'nonCurrentLiability':float(balance_sheet_list['nonCurrentLiability']),
        'liability':float(balance_sheet_list['liability']),
        'paidUpCapital':float(balance_sheet_list['paidUpCapital']),
        'reserves':float(balance_sheet_list['reserves']),
        'minorityInterest':float(balance_sheet_list['minorityInterest']),
    }
    
    balance_sheet_data.append(year_data)

    profit_loss_data = []

    
    financial_year_end_old = make_aware(datetime.strptime(profit_loss_list['financialYearEndDate'], '%Y-%m-%dT%H:%M:%S.000Z'))
    financial_year_end_new = financial_year_end_old.astimezone(pytz.timezone(time_zone)).strftime(date_format)

    year_data = {
        'extraOrdinaryItem': profit_loss_list['extraOrdinaryItem'],
        'financialReportType': profit_loss_list['financialReportType'],
        'financialYearEndDate': profit_loss_list['financialYearEndDate'],
        'grossDividendRate': profit_loss_list['grossDividendRate'],
        'inappropriateProfitBf': profit_loss_list['inappropriateProfitBf'],
        'inappropriateProfitCf': profit_loss_list['inappropriateProfitCf'],
        'minorityInterest': float(profit_loss_list['minorityInterest']),
        'netDividend': float(profit_loss_list['netDividend']),
        'others': profit_loss_list['others'],
        'priorAdjustment': profit_loss_list['priorAdjustment'],
        'profitAfterTax': float(profit_loss_list['profitAfterTax']),
        'profitBeforeTax': float(profit_loss_list['profitBeforeTax']),
        'profitShareholder': profit_loss_list['profitShareholder'],
        'revenue': float(profit_loss_list['revenue']),
        'surplusAfterTax': profit_loss_list['surplusAfterTax'],
        'surplusBeforeTax': profit_loss_list['surplusBeforeTax'],
        'surplusDeficitAfterTax': profit_loss_list['surplusDeficitAfterTax'],
        'surplusDeficitBeforeTax': profit_loss_list['surplusDeficitBeforeTax'],
        'totalExpenditure': profit_loss_list['totalExpenditure'],
        'totalIncome': profit_loss_list['totalIncome'],
        'totalRevenue': profit_loss_list['totalRevenue'],
        'transferred': profit_loss_list['transferred'],
        'turnover': profit_loss_list['turnover']
    }


    
    profit_loss_data.append(year_data)

    data_ready = {
        'corpInfo': {
            'compName': data_mdw_1['rocCompanyInfo']['companyName'],
            'compOldName': data_mdw_1['rocCompanyInfo']['companyOldName'],
            'changeDate': temp_comp_info_change_date_new,
            'compNoNew': data_mdw_2['newFormatNo'],
            'compNoOld': data_mdw_2['oldFormatNo'],
            'checkDigit': data_mdw_1['rocCompanyInfo']['checkDigit'],
            'incorpDate': temp_comp_info_incorp_date_new,
            'companyType': temp_comp_type_old,
            'companyStatus': temp_comp_status_old,
            'statusOfCompany': temp_status_of_comp_new,
            'reg_address1': temp_reg_address_1_new,
            'reg_address2': temp_reg_address_2_new,
            'reg_address3': temp_reg_address_3_new,
            'reg_state': temp_reg_state_new,
            'reg_town': temp_reg_town_new,
            'reg_postcode': temp_reg_postcode_new,
            'reg_origin': temp_comp_origin_new,
            'biz_address1': temp_biz_address_1_new,
            'biz_address2': temp_biz_address_2_new,
            'biz_address3': temp_biz_address_3_new,
            'biz_state': temp_biz_state_new,
            'biz_town': temp_biz_town_new,
            'biz_postcode': temp_biz_postcode_new,
            'biz_nature': data_mdw_1['rocCompanyInfo']['businessDescription']
        },
        'balance_sheet': balance_sheet_data,
        'profit_loss': profit_loss_data
    }

    return data_ready