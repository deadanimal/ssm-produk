import string
import pytz
import json
import subprocess

from .mapping import officer_designation_mapping, state_mapping, charge_code
from datetime import datetime
from django.utils.timezone import make_aware
from products.services.get_new_format_entity import get_new_format_entity

def comp_prof(mdw_1, mdw_2, lang):
    
    data_mdw_1 = mdw_1
    data_mdw_2 = mdw_2

    date_format = "%d-%m-%Y"
    time_zone = 'Asia/Kuala_Lumpur'

    tz = pytz.timezone('Asia/Kuala_Lumpur')
    now = datetime.now(tz=tz) 
    print(now)
    now_string = now.strftime("%Y-%m-%d %H:%M:%S")

    url_info = 'http://integrasistg.ssm.com.my/InfoService/1'
    auth_code = subprocess.check_output(['java', '-jar', 'authgen.jar', 'SSMProduk', now_string, '27522718']).decode("utf-8").rstrip("\n")
    headers = {
        'content-type': "text/xml;charset=UTF-8",
        'authorization': auth_code
    }

    temp_comp_status_old = data_mdw_1["rocCompanyInfo"]['companyStatus']
    
    if temp_comp_status_old == 'E':
        temp_comp_status_new = 'Existing'
    elif temp_comp_status_old == 'W':
        temp_comp_status_new = 'Winding Up'
    elif temp_comp_status_old == 'D':
        temp_comp_status_new = 'Dissolved'
        

    temp_incorpDate_old = make_aware(datetime.strptime(data_mdw_1["rocCompanyInfo"]['incorpDate'], '%Y-%m-%dT%H:%M:%S.000Z')).astimezone(pytz.timezone(time_zone))
    temp_incorpDate_new = temp_incorpDate_old.astimezone(pytz.timezone(time_zone)).strftime(date_format)
    
    
    if 'dateOfChange' in data_mdw_1["rocCompanyInfo"]:
        date_of_change = make_aware(datetime.strptime(data_mdw_1["rocCompanyInfo"]['dateOfChange'], '%Y-%m-%dT%H:%M:%S.000Z')).astimezone(pytz.timezone(time_zone))
        date_of_change_str = date_of_change.astimezone(pytz.timezone(time_zone)).strftime(date_format)
    else:
        date_of_change_str = 'NIL'
    
    total_issued = float(mdw_1["rocShareCapitalInfo"]['totalIssued'])

    ordinary_issue_cash = int(mdw_1["rocShareCapitalInfo"]["ordIssuedCash"]["#text"])
    ordinary_issue_noncash = int(mdw_1["rocShareCapitalInfo"]["ordIssuedNonCash"]["#text"])
    preference_issue_cash = int(mdw_1["rocShareCapitalInfo"]["prefIssuedCash"]["#text"])
    preference_issue_noncash = int(mdw_1["rocShareCapitalInfo"]["prefIssuedNonCash"]["#text"])
    others_issue_cash = int(mdw_1["rocShareCapitalInfo"]["othIssuedCash"]["#text"])
    others_issue_noncash = int(mdw_1["rocShareCapitalInfo"]["othIssuedNonCash"]["#text"])


    if mdw_1["rocCompanyInfo"]['localforeignCompany'] == 'L':
        if mdw_1["rocCompanyInfo"]['companyStatus'] == 'U':
            if mdw_1["rocCompanyInfo"]['companyType'] == 'G' or mdw_1["rocCompanyInfo"]['companyType'] == 'U':
                shareholders = []
            else:
                shareholders = mdw_1["rocShareholderListInfo"]["rocShareholderInfos"]["rocShareholderInfos"]    
        else:
            shareholders = mdw_1["rocShareholderListInfo"]["rocShareholderInfos"]["rocShareholderInfos"]
            
        shareholder_list = shareholders
        shareholders_data = []
        if isinstance(shareholders, list): 
            for shareholder in shareholders:

                if shareholder['idType'] == 'MK':

                    nric_1 = shareholder["idNo"][0:6]
                    nric_2 = shareholder["idNo"][6:8]
                    nric_3 = shareholder["idNo"][8:]
                    nric = nric_1 + '-' + nric_2 + '-' + nric_3
                    company_no = None
                else:
                    nric = shareholder["idNo"]
                    company_no__ = get_new_format_entity(url_info, headers, shareholder["idNo"][:-2], 'ROC')

                    if company_no__['errorMsg']:
                        company_no = ''
                    else:
                        company_no = company_no__['newFormatNo']

                shareholders_data.append({
                    'name': shareholder["name"],
                    'id': nric,
                    'companyNo': company_no,
                    'idType': shareholder["idType"],
                    'share': float(shareholder["share"])
                })
        else: 
            if shareholders['idType'] == 'MK':

                nric_1 = shareholders["idNo"][0:6]
                nric_2 = shareholders["idNo"][6:8]
                nric_3 = shareholders["idNo"][8:]
                nric = nric_1 + '-' + nric_2 + '-' + nric_3
                company_no = None
            else:
                nric = shareholders["idNo"]
                company_no__ = get_new_format_entity(url_info, headers, shareholder["idNo"][:-2], 'ROC')

                if company_no__['errorMsg']:
                    company_no = ''
                else:
                    company_no = company_no__['newFormatNo']

            shareholders_data.append({
                'name': shareholders["name"],
                'id': nric,
                'companyNo': company_no,
                'idType': shareholders["idType"],
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
    business_address_info['stateString'] = state_mapping(business_address_info["state"]) 
    registered_address_info = mdw_1["rocRegAddressInfo"]
    registered_address_info['stateString'] = state_mapping(registered_address_info["state"]) 

    share_capital_info = mdw_1["rocShareCapitalInfo"]





    chargesinfotemp = mdw_1["rocChargesListInfo"]
    

    # print('ci', charges_info['errorMsg'])
    # print('         ')
    # print('charges', chargesinfotemp)
    # print('         ')
    charges_info = []
    
    # print('1', chargesinfotemp['errorMsg'] == None )
    # print('2', chargesinfotemp['errorMsg'] != 'No Data' )
    # print('3', chargesinfotemp['rocChargesInfos'] != None )
    # print('4', chargesinfotemp['rocChargesInfos'] != 'No Data' )
    # print('5',(chargesinfotemp['errorMsg'] != None and chargesinfotemp['errorMsg']) != 'No Data' and (chargesinfotemp['rocChargesInfos'] != None and chargesinfotemp['rocChargesInfos'] != 'No Data'))
    if chargesinfotemp['errorMsg'] == None and chargesinfotemp['errorMsg'] != 'No Data' and chargesinfotemp['rocChargesInfos'] != None and chargesinfotemp['rocChargesInfos'] != 'No Data':
        # print('   ')
        # print('charges', chargesinfotemp['rocChargesInfos'])
        # print('   ')
        charges_info_temp = chargesinfotemp["rocChargesInfos"]["rocChargesInfos"]
        if isinstance(charges_info_temp, list):
            for charge in charges_info_temp:
                charge['chargeStatus'] = charge_code(charge['chargeStatus'])
                if charge['chargeAmount']:
                   charge['chargeAmount'] = float(charge['chargeAmount'])
                else:
                   charge['chargeAmount'] = None
                charge['chargeCreateDate'] = make_aware(datetime.strptime(charge['chargeCreateDate'], '%Y-%m-%dT%H:%M:%S.000Z')).astimezone(pytz.timezone(time_zone)).strftime(date_format)
                print('tes', charge['chargeCreateDate'])
                # print(charges_info)
                charges_info.append(charge)
        else:
            charges_info_temp["chargeStatus"] = charge_code(charges_info_temp["chargeStatus"])
            charges_info_temp["chargeAmount"] = float(charges_info_temp["chargeAmount"])
            charges_info_temp["chargeCreateDate"] = make_aware(datetime.strptime(charges_info_temp['chargeCreateDate'], '%Y-%m-%dT%H:%M:%S.000Z')).astimezone(pytz.timezone(time_zone)).strftime(date_format)
            charges_info.append(charges_info_temp)
            # print('ouuuk', charges_info_temp)
    else:
        # print('dee')
        charges_info = chargesinfotemp

    company_info = mdw_1["rocCompanyInfo"]

    if 'latestDocUpdateDate' in company_info.keys():
        company_info['latestDocUpdateDate'] = make_aware(datetime.strptime(company_info['latestDocUpdateDate'], '%Y-%m-%dT%H:%M:%S.000Z')).astimezone(pytz.timezone(time_zone)).strftime(date_format)
    else:
         company_info['latestDocUpdateDate'] = None

    officer_info = mdw_1["rocCompanyOfficerListInfo"]["rocCompanyOfficerInfos"]["rocCompanyOfficerInfos"]

    for officer in officer_info:
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


        if 'startDate' in officer.keys():
            officer['startDate'] = make_aware(datetime.strptime(officer['startDate'], '%Y-%m-%dT%H:%M:%S.000Z')).astimezone(pytz.timezone(time_zone)).strftime(date_format)
        else:
            officer['startDate'] = None

        # officer['startDate'] = make_aware(datetime.strptime(officer['startDate'], '%Y-%m-%dT%H:%M:%S.000Z')).astimezone(pytz.timezone(time_zone)).strftime(date_format)
    
    # def get_designation(officer_info):
    #     return officer_info.get('designationCode')

    # sorted(officer_info, key=get_designation)

    if mdw_1["rocCompanyInfo"]['localforeignCompany'] == 'L' and len(balance_sheet_list) > 0:
        if len(balance_sheet_list) == 1:
            bss_ = balance_sheet_list[0]
            pll_ =  profit_loss_list[0]
        else:
            temp_bss = [datetime.strptime(sheet['financialYearEndDate'], "%Y-%m-%dT%H:%M:%S.000Z") for sheet in balance_sheet_list]
            temp_bss.sort()
            length_temp_bss = len(temp_bss)

            latest_date_bs = temp_bss[length_temp_bss-1]

            for sheet in balance_sheet_list:
                if datetime.strptime(sheet['financialYearEndDate'], "%Y-%m-%dT%H:%M:%S.000Z") == latest_date_bs:
                    # print(sheet)
                    bss_ = sheet
            
            temp_pll = [datetime.strptime(sheet['financialYearEndDate'], "%Y-%m-%dT%H:%M:%S.000Z") for sheet in profit_loss_list]
            temp_pll.sort()
            length_temp_pll = len(temp_pll)

            # print('gegfege')
            # print(temp_pll)
            latest_date_pl = temp_pll[length_temp_pll-1]

            for sheet in profit_loss_list:
                if datetime.strptime(sheet['financialYearEndDate'], "%Y-%m-%dT%H:%M:%S.000Z") == latest_date_pl:
                    # print(sheet)
                    pll_ = sheet

        financial_year_end_old = make_aware(datetime.strptime(bss_['financialYearEndDate'], '%Y-%m-%dT%H:%M:%S.000Z')).astimezone(pytz.timezone(time_zone))
        financial_year_end_new = financial_year_end_old.astimezone(pytz.timezone(time_zone)).strftime(date_format)

        date_of_tabling_old = make_aware(datetime.strptime(bss_['dateOfTabling'], '%Y-%m-%dT%H:%M:%S.000Z')).astimezone(pytz.timezone(time_zone))
        date_of_tabling_new = date_of_tabling_old.astimezone(pytz.timezone(time_zone)).strftime(date_format)
    else:
        financial_year_end_new = 'NONE'
        date_of_tabling_new = 'NONE'

    if mdw_1["rocCompanyInfo"]['localforeignCompany'] == 'L' and len(balance_sheet_list) > 0:
        bs_data = {
            'auditor_name': bss_['auditFirmName'],
            'auditor_no': bss_["auditFirmNo"],
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
        financial_year_end_old = make_aware(datetime.strptime(profit_loss_list[-1]['financialYearEndDate'], '%Y-%m-%dT%H:%M:%S.000Z')).astimezone(pytz.timezone(time_zone))
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
        'date_of_change': date_of_change_str,
        'generated_at': datetime.now().astimezone(pytz.timezone(time_zone)).strftime("%d-%m-%Y %-H:%M:%S"),
        'printing_time': datetime.now().astimezone(pytz.timezone(time_zone)).strftime("%d-%m-%Y"),
    }


    return data_ready
