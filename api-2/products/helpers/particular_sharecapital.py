import string
import pytz
import json

from .mapping import officer_designation_mapping, state_mapping, charge_code
from datetime import datetime
from django.utils.timezone import make_aware

def particular_sharecapital(mdw_1, mdw_2, lang, entity_type):
    
    data_mdw_1 = mdw_1
    data_mdw_2 = mdw_2

    date_format = "%d-%m-%Y"
    time_zone = 'Asia/Kuala_Lumpur'


    business_address_info = mdw_1["rocBusinessAddressInfo"]
    registered_address_info = mdw_1["rocRegAddressInfo"]
    share_capital_info = mdw_1["shareCapitalSummary"]
    company_info = mdw_1["rocCompanyInfo"]

    # print('regggg >>>>', registered_address_info)
    registered_address_info['state'] = state_mapping(registered_address_info['state'])
    business_address_info['state'] = state_mapping(business_address_info['state'])
    temp_comp_status_old = data_mdw_1["rocCompanyInfo"]['companyStatus']
    
    if temp_comp_status_old == 'E':
        temp_comp_status_new = 'Existing'
    elif temp_comp_status_old == 'W':
        temp_comp_status_new = 'Winding Up'
    elif temp_comp_status_old == 'D':
        temp_comp_status_new = 'Dissolved'
        

    temp_incorpDate_old = make_aware(datetime.strptime(data_mdw_1["rocCompanyInfo"]['incorpDate'], '%Y-%m-%dT%H:%M:%S.000Z'))
    temp_incorpDate_new = temp_incorpDate_old.astimezone(pytz.timezone(time_zone)).strftime(date_format)
    
    total_issued = float(mdw_1["shareCapitalSummary"]['totalIssued'])
    #print(mdw_1["shareCapitalSummary"])
    ordinary_issue_cash = float(mdw_1["shareCapitalSummary"]["ordinaryCash"])
    ordinary_issue_noncash = float(mdw_1["shareCapitalSummary"]["ordinaryOtherwise"])
    preference_issue_cash = float(mdw_1["shareCapitalSummary"]["preferenceCash"])
    preference_issue_noncash = float(mdw_1["shareCapitalSummary"]["preferenceOtherwise"])
    others_issue_cash = float(mdw_1["shareCapitalSummary"]["othersCash"])
    others_issue_noncash = float(mdw_1["shareCapitalSummary"]["othersOtherwise"])

    print(mdw_1)
    print(mdw_1['allotmentOfShare'])
    list_of_allotments = mdw_1['allotmentOfShare']['allotmentShareList']['allotmentShareList']

    allotments_data = []
    
    for allotment in list_of_allotments:
        allotment_data = allotment['dtAllot']['#text']
        allotment_issued_share = allotment['issuedShare']
        print(allotment)
        print('\n')

    data_ready = {
        'mdw1': mdw_1,
        'mdw2': mdw_2,
        'business_address_info': business_address_info,
        'registered_address_info': registered_address_info,
        'share_capital_info': share_capital_info,
        'total_issued': total_issued,
        'ordinary_issue_cash': ordinary_issue_cash,
        'ordinary_issue_noncash': ordinary_issue_noncash,
        'preference_issue_cash': preference_issue_cash,
        'preference_issue_noncash': preference_issue_noncash,
        'others_issue_cash': others_issue_cash,
        'others_issue_noncash': others_issue_noncash,
        'incorp_date': temp_incorpDate_new,    
        'company_info': company_info    
    }


    return data_ready