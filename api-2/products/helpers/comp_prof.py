import string
import pytz
import json

from .mapping import officer_designation_mapping, state_mapping, charge_code
from datetime import datetime
from django.utils.timezone import make_aware

def comp_prof(mdw_1, mdw_2, lang):
    
    data_mdw_1 = mdw_1
    data_mdw_2 = mdw_2

    date_format = "%d-%m-%Y"
    time_zone = 'Asia/Kuala_Lumpur'

    temp_comp_status_old = data_mdw_1["rocCompanyInfo"]['companyStatus']
    
    if temp_comp_status_old == 'E':
        temp_comp_status_new = 'Existing'
    elif temp_comp_status_old == 'W':
        temp_comp_status_new = 'Winding Up'
    elif temp_comp_status_old == 'D':
        temp_comp_status_new = 'Dissolved'
        

    temp_incorpDate_old = make_aware(datetime.strptime(data_mdw_1["rocCompanyInfo"]['incorpDate'], '%Y-%m-%dT%H:%M:%S.000Z'))
    temp_incorpDate_new = temp_incorpDate_old.astimezone(pytz.timezone(time_zone)).strftime(date_format)
    
    """
    if data_mdw_1["rocCompanyInfo"]['dateOfChange']:
        date_of_change = make_aware(datetime.strptime(data_mdw_1["rocCompanyInfo"]['dateOfChange'], '%Y-%m-%dT%H:%M:%S.000Z'))
        date_of_change_str = date_of_change.astimezone(pytz.timezone(time_zone)).strftime(date_format)
    else:
        date_of_change_str = 'NIL'
    """
    total_issued = float(mdw_1["rocShareCapitalInfo"]['totalIssued'])

    ordinary_issue_cash = float(mdw_1["rocShareCapitalInfo"]["ordIssuedCash"]["#text"])
    ordinary_issue_noncash = float(mdw_1["rocShareCapitalInfo"]["ordIssuedNonCash"]["#text"])
    preference_issue_cash = float(mdw_1["rocShareCapitalInfo"]["prefIssuedCash"]["#text"])
    preference_issue_noncash = float(mdw_1["rocShareCapitalInfo"]["prefIssuedNonCash"]["#text"])
    others_issue_cash = float(mdw_1["rocShareCapitalInfo"]["othIssuedCash"]["#text"])
    others_issue_noncash = float(mdw_1["rocShareCapitalInfo"]["othIssuedNonCash"]["#text"])

    if mdw_1["rocCompanyInfo"]['localforeignCompany'] == 'L':
        if mdw_1["rocCompanyInfo"]['companyStatus'] == 'U' and mdw_1["rocCompanyInfo"]['companyStatus'] != 'S':
            shareholders = []
        else:
            shareholders = mdw_1["rocShareholderListInfo"]["rocShareholderInfos"]["rocShareholderInfos"]
            
        shareholder_list = shareholders
        shareholders_data = []
        if isinstance(shareholders, list): 
            for shareholder in shareholders:
                shareholders_data.append({
                    'name': shareholder["name"],
                    'id': shareholder["idNo"],
                    'share': float(shareholder["share"])
                })
        else: 
            shareholders_data.append({
                'name': shareholders["name"],
                'id': shareholders["idNo"],
                'share': float(shareholders["share"])
            })
    else:
        shareholders = []
        shareholder_list = shareholders
        shareholders_data = []
    

    if mdw_1["rocCompanyInfo"]['localforeignCompany'] == 'L':
        if mdw_1["rocBalanceSheetListInfo"]['errorMsg'] == 'No Data':
            balance_sheet_list = []
            profit_loss_list = []
        else:
            balance_sheet_list = mdw_1["rocBalanceSheetListInfo"]["rocBalanceSheetInfos"]["rocBalanceSheetInfos"]
            profit_loss_list = mdw_1["rocProfitLossListInfo"]["rocProfitLossInfos"]["rocProfitLossInfos"]

            if isinstance(balance_sheet_list, list): 
                pass
            else:
                balance_sheet_list = [balance_sheet_list] 
                profit_loss_list = [profit_loss_list]
    else:
        balance_sheet_list = []
        profit_loss_list = []

    business_address_info = mdw_1["rocBusinessAddressInfo"]
    registered_address_info = mdw_1["rocRegAddressInfo"]

    share_capital_info = mdw_1["rocShareCapitalInfo"]





    charges_info = mdw_1["rocChargesListInfo"]

    if charges_info['errorMsg'] == None:
        for charge in charges_info["rocChargesInfos"]["rocChargesInfos"]:
            charge['chargeStatus'] = charge_code(charge['chargeStatus'])
            charge['chargeAmount'] = float(charge['chargeAmount'])
            charge['chargeCreateDate'] = make_aware(datetime.strptime(charge['chargeCreateDate'], '%Y-%m-%dT%H:%M:%S.000Z')).astimezone(pytz.timezone(time_zone)).strftime(date_format)

    company_info = mdw_1["rocCompanyInfo"]
    officer_info = mdw_1["rocCompanyOfficerListInfo"]["rocCompanyOfficerInfos"]["rocCompanyOfficerInfos"]

    for officer in officer_info:
        officer['state'] = state_mapping(officer['state'])
        officer['designationCode'] = officer_designation_mapping(officer['designationCode'])
        officer['startDate'] = make_aware(datetime.strptime(officer['startDate'], '%Y-%m-%dT%H:%M:%S.000Z')).astimezone(pytz.timezone(time_zone)).strftime(date_format)



    if mdw_1["rocCompanyInfo"]['localforeignCompany'] == 'L' and len(balance_sheet_list) > 0:
        if len(balance_sheet_list) == 1:
            bss_ = balance_sheet_list[0]
            pll_ =  profit_loss_list[0]
        else:
            bss_ = balance_sheet_list[-1]
            pll_ =  profit_loss_list[-1]
        financial_year_end_old = make_aware(datetime.strptime(bss_['financialYearEndDate'], '%Y-%m-%dT%H:%M:%S.000Z'))
        financial_year_end_new = financial_year_end_old.astimezone(pytz.timezone(time_zone)).strftime(date_format)

        date_of_tabling_old = make_aware(datetime.strptime(bss_['dateOfTabling'], '%Y-%m-%dT%H:%M:%S.000Z'))
        date_of_tabling_new = date_of_tabling_old.astimezone(pytz.timezone(time_zone)).strftime(date_format)
    else:
        financial_year_end_new = 'NONE'
        date_of_tabling_new = 'NONE'

    if mdw_1["rocCompanyInfo"]['localforeignCompany'] == 'L' and len(balance_sheet_list) > 0:
        bs_data = {
            'auditor_name': bss_['auditFirmName'],
            'auditFirmAddress1': bss_['auditFirmAddress1'],
            'auditFirmAddress2': bss_['auditFirmAddress2'],
            'auditFirmAddress3': bss_['auditFirmAddress3'],
            "auditFirmPostcode":  bss_['auditFirmPostcode'],
            "auditFirmState": state_mapping(bss_['auditFirmState']),
            "auditFirmTown": bss_['auditFirmTown'], 
            'financial_year_end': financial_year_end_new,
            'inappropriateProfit': bss_['inappropriateProfit'],
            'financialReportType': bss_['financialReportType'],
            'accrualAccType': bss_['accrualAccType'],
            'dateOfTabling': date_of_tabling_new,
            'nonCurrAsset':float(bss_['nonCurrAsset']),
            'currentAsset':float(bss_['currentAsset']),
            'nonCurrentLiability':float(bss_['nonCurrentLiability']),
            'liability':float(bss_['liability']),
            'paidUpCapital':float(bss_['paidUpCapital']),
            'reserves':float(bss_['reserves']),
            'minorityInterest':float(bss_['minorityInterest']),
        }
    else:
        bs_data = {
            'auditor_name': 'NONE',
            'auditFirmAddress1': 'NONE',
            'auditFirmAddress2': 'NONE',
            'auditFirmAddress3': 'NONE',
            "auditFirmPostcode":  'NONE',
            "auditFirmState": 'NONE',
            "auditFirmTown": 'NONE',
            'financial_year_end': financial_year_end_new,
            'inappropriateProfit': 'NONE',
            'financialReportType': 'NONE',
            'accrualAccType': 'NONE',
            'dateOfTabling': date_of_tabling_new,
            'nonCurrAsset':'NONE',
            'currentAsset':'NONE',
            'nonCurrentLiability':'NONE',
            'liability':'NONE',
            'paidUpCapital':'NONE',
            'reserves':'NONE',
            'minorityInterest':'NONE',
        }        



    if mdw_1["rocCompanyInfo"]['localforeignCompany'] == 'L' and len(balance_sheet_list) > 0:
        financial_year_end_old = make_aware(datetime.strptime(profit_loss_list[-1]['financialYearEndDate'], '%Y-%m-%dT%H:%M:%S.000Z'))
        financial_year_end_new = financial_year_end_old.astimezone(pytz.timezone(time_zone)).strftime(date_format)
    else:
        financial_year_end_new = 'NONE'

    if mdw_1["rocCompanyInfo"]['localforeignCompany'] == 'L' and len(balance_sheet_list) > 0:
        pl_data = {
            'extraOrdinaryItem': pll_['extraOrdinaryItem'],
            'financialReportType': pll_['financialReportType'],
            'financialYearEndDate': pll_['financialYearEndDate'],
            'grossDividendRate': pll_['grossDividendRate'],
            'inappropriateProfitBf': pll_['inappropriateProfitBf'],
            'inappropriateProfitCf': pll_['inappropriateProfitCf'],
            'minorityInterest': float(pll_['minorityInterest']),
            'netDividend': float(pll_['netDividend']),
            'others': pll_['others'],
            'priorAdjustment': pll_['priorAdjustment'],
            'profitAfterTax': float(pll_['profitAfterTax']),
            'profitBeforeTax': float(pll_['profitBeforeTax']),
            'profitShareholder': pll_['profitShareholder'],
            'revenue': float(pll_['revenue']),
            'surplusAfterTax': pll_['surplusAfterTax'],
            'surplusBeforeTax': pll_['surplusBeforeTax'],
            'surplusDeficitAfterTax': pll_['surplusDeficitAfterTax'],
            'surplusDeficitBeforeTax': pll_['surplusDeficitBeforeTax'],
            'totalExpenditure': pll_['totalExpenditure'],
            'totalIncome': pll_['totalIncome'],
            'totalRevenue': pll_['totalRevenue'],
            'transferred': pll_['transferred'],
            'turnover': pll_['turnover']
        }
    else:
        pl_data = {
            'extraOrdinaryItem': 'NONE',
            'financialReportType': 'NONE',
            'financialYearEndDate': 'NONE',
            'grossDividendRate': 'NONE',
            'inappropriateProfitBf': 'NONE',
            'inappropriateProfitCf': 'NONE',
            'minorityInterest': 'NONE',
            'netDividend': 'NONE',
            'others': 'NONE',
            'priorAdjustment': 'NONE',
            'profitAfterTax': 'NONE',
            'profitBeforeTax': 'NONE',
            'profitShareholder': 'NONE',
            'revenue': 'NONE',
            'surplusAfterTax': 'NONE',
            'surplusBeforeTax': 'NONE',
            'surplusDeficitAfterTax': 'NONE',
            'surplusDeficitBeforeTax': 'NONE',
            'totalExpenditure': 'NONE',
            'totalIncome': 'NONE',
            'totalRevenue': 'NONE',
            'transferred': 'NONE',
            'turnover': 'NONE',
        }


    data_ready = {
        'balance_sheet_list': balance_sheet_list,
        'profit_loss_list': profit_loss_list,
        'business_address_info': business_address_info,
        'registered_address_info': registered_address_info,
        'share_capital_info': share_capital_info,
        'shareholder_list': shareholder_list,
        'charges_info': charges_info,
        'company_info': company_info,
        'officer_info': officer_info,
        'compNoNew': data_mdw_2['newFormatNo'],
        'compNoOld': data_mdw_2['oldFormatNo'],
        'total_issued': total_issued,
        'ordinary_issue_cash': ordinary_issue_cash,
        'ordinary_issue_noncash': ordinary_issue_noncash,
        'preference_issue_cash': preference_issue_cash,
        'preference_issue_noncash': preference_issue_noncash,
        'others_issue_cash': others_issue_cash,
        'others_issue_noncash': others_issue_noncash,
        'shareholders_data': shareholders_data,
        'bs_data': bs_data ,
        'pl_data': pl_data,
        'incorp_date': temp_incorpDate_new,
        #'date_of_change': date_of_change_str,
        'printing_time': datetime.now().astimezone(pytz.timezone(time_zone)).strftime("%d-%m-%Y %H:%M:%S"),
    }


    return data_ready
