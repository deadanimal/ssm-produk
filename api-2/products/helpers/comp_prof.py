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

    shareholders = mdw_1["rocShareholderListInfo"]["rocShareholderInfos"]["rocShareholderInfos"]
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
    


    balance_sheet_list = mdw_1["rocBalanceSheetListInfo"]["rocBalanceSheetInfos"]["rocBalanceSheetInfos"]
    profit_loss_list = mdw_1["rocProfitLossListInfo"]["rocProfitLossInfos"]["rocProfitLossInfos"]

    business_address_info = mdw_1["rocBusinessAddressInfo"]
    registered_address_info = mdw_1["rocRegAddressInfo"]

    share_capital_info = mdw_1["rocShareCapitalInfo"]

    shareholder_list = mdw_1["rocShareholderListInfo"]["rocShareholderInfos"]["rocShareholderInfos"]



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



    financial_year_end_old = make_aware(datetime.strptime(balance_sheet_list[-1]['financialYearEndDate'], '%Y-%m-%dT%H:%M:%S.000Z'))
    financial_year_end_new = financial_year_end_old.astimezone(pytz.timezone(time_zone)).strftime(date_format)

    date_of_tabling_old = make_aware(datetime.strptime(balance_sheet_list[-1]['dateOfTabling'], '%Y-%m-%dT%H:%M:%S.000Z'))
    date_of_tabling_new = date_of_tabling_old.astimezone(pytz.timezone(time_zone)).strftime(date_format)

    bs_data = {
        'auditor_name': balance_sheet_list[-1]['auditFirmName'],
        'auditFirmAddress1': balance_sheet_list[-1]['auditFirmAddress1'],
        'auditFirmAddress2': balance_sheet_list[-1]['auditFirmAddress2'],
        'auditFirmAddress3': balance_sheet_list[-1]['auditFirmAddress3'],
        "auditFirmPostcode":  balance_sheet_list[-1]['auditFirmPostcode'],
        "auditFirmState": state_mapping(balance_sheet_list[-1]['auditFirmState']),
        "auditFirmTown": balance_sheet_list[-1]['auditFirmTown'], 
        'financial_year_end': financial_year_end_new,
        'inappropriateProfit': balance_sheet_list[-1]['inappropriateProfit'],
        'financialReportType': balance_sheet_list[-1]['financialReportType'],
        'accrualAccType': balance_sheet_list[-1]['accrualAccType'],
        'dateOfTabling': date_of_tabling_new,
        'nonCurrAsset':float(balance_sheet_list[-1]['nonCurrAsset']),
        'currentAsset':float(balance_sheet_list[-1]['currentAsset']),
        'nonCurrentLiability':float(balance_sheet_list[-1]['nonCurrentLiability']),
        'liability':float(balance_sheet_list[-1]['liability']),
        'paidUpCapital':float(balance_sheet_list[-1]['paidUpCapital']),
        'reserves':float(balance_sheet_list[-1]['reserves']),
        'minorityInterest':float(balance_sheet_list[-1]['minorityInterest']),
    }


    
    financial_year_end_old = make_aware(datetime.strptime(profit_loss_list[-1]['financialYearEndDate'], '%Y-%m-%dT%H:%M:%S.000Z'))
    financial_year_end_new = financial_year_end_old.astimezone(pytz.timezone(time_zone)).strftime(date_format)

    pl_data = {
        'extraOrdinaryItem': profit_loss_list[-1]['extraOrdinaryItem'],
        'financialReportType': profit_loss_list[-1]['financialReportType'],
        'financialYearEndDate': profit_loss_list[-1]['financialYearEndDate'],
        'grossDividendRate': profit_loss_list[-1]['grossDividendRate'],
        'inappropriateProfitBf': profit_loss_list[-1]['inappropriateProfitBf'],
        'inappropriateProfitCf': profit_loss_list[-1]['inappropriateProfitCf'],
        'minorityInterest': float(profit_loss_list[-1]['minorityInterest']),
        'netDividend': float(profit_loss_list[-1]['netDividend']),
        'others': profit_loss_list[-1]['others'],
        'priorAdjustment': profit_loss_list[-1]['priorAdjustment'],
        'profitAfterTax': float(profit_loss_list[-1]['profitAfterTax']),
        'profitBeforeTax': float(profit_loss_list[-1]['profitBeforeTax']),
        'profitShareholder': profit_loss_list[-1]['profitShareholder'],
        'revenue': float(profit_loss_list[-1]['revenue']),
        'surplusAfterTax': profit_loss_list[-1]['surplusAfterTax'],
        'surplusBeforeTax': profit_loss_list[-1]['surplusBeforeTax'],
        'surplusDeficitAfterTax': profit_loss_list[-1]['surplusDeficitAfterTax'],
        'surplusDeficitBeforeTax': profit_loss_list[-1]['surplusDeficitBeforeTax'],
        'totalExpenditure': profit_loss_list[-1]['totalExpenditure'],
        'totalIncome': profit_loss_list[-1]['totalIncome'],
        'totalRevenue': profit_loss_list[-1]['totalRevenue'],
        'transferred': profit_loss_list[-1]['transferred'],
        'turnover': profit_loss_list[-1]['turnover']
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
