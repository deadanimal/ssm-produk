import string
import pytz
import json
import locale

from datetime import datetime
from django.utils.timezone import make_aware

def acgs(mdw_1, mdw_2, lang):
    
    data_mdw_1 = mdw_1
    data_mdw_2 = mdw_2

    print(data_mdw_1['compName'])

    date_format = "%d %B %Y"
    time_zone = 'Asia/Kuala_Lumpur'

    temp_comp_status_old = data_mdw_1['compStatus']
    
    if temp_comp_status_old == 'E':
        temp_comp_status_new = 'Existing'
    elif temp_comp_status_old == 'W':
        temp_comp_status_new = 'Winding Up'
    elif temp_comp_status_old == 'D':
        temp_comp_status_new = 'Dissolved'

    print(mdw_1)

    incorp_date = data_mdw_1['incorpDate']
    incorp_date = make_aware(datetime.strptime(incorp_date, '%Y-%m-%dT%H:%M:%S.000Z'))
    incorp_date = incorp_date.astimezone(pytz.timezone(time_zone))
    incorp_date_str = incorp_date.strftime("%d %B %Y")

    if lang == 'ms':
        if incorp_date.month == 1:
            incorp_month = "Januari"
        elif incorp_date.month == 2:
            incorp_month = "Februari"
        elif incorp_date.month == 3:
            incorp_month = "Mac"            
        elif incorp_date.month == 4:
            incorp_month = "April"            
        elif incorp_date.month == 5:
            incorp_month = "Mei"            
        elif incorp_date.month == 6:
            incorp_month = "Jun"            
        elif incorp_date.month == 7:
            incorp_month = "Julai"            
        elif incorp_date.month == 8:
            incorp_month = "Ogos"            
        elif incorp_date.month == 9:
            incorp_month = "September"            
        elif incorp_date.month == 10:
            incorp_month = "Oktober"            
        elif incorp_date.month == 11:
            incorp_month = "November"            
        elif incorp_date.month == 12:
            incorp_month = "Disember"  
    else:
        if incorp_date.month == 1:
            incorp_month = "January"
        elif incorp_date.month == 2:
            incorp_month = "February"
        elif incorp_date.month == 3:
            incorp_month = "March"            
        elif incorp_date.month == 4:
            incorp_month = "April"            
        elif incorp_date.month == 5:
            incorp_month = "May"            
        elif incorp_date.month == 6:
            incorp_month = "June"            
        elif incorp_date.month == 7:
            incorp_month = "July"            
        elif incorp_date.month == 8:
            incorp_month = "August"            
        elif incorp_date.month == 9:
            incorp_month = "September"            
        elif incorp_date.month == 10:
            incorp_month = "October"            
        elif incorp_date.month == 11:
            incorp_month = "November"            
        elif incorp_date.month == 12:
            incorp_month = "December"

    latest_doc_date = data_mdw_1['latest_doc_date']
    latest_doc_date = make_aware(datetime.strptime(latest_doc_date, '%Y-%m-%dT%H:%M:%S.000Z'))
    latest_doc_date = latest_doc_date.astimezone(pytz.timezone(time_zone))
    latest_doc_date_str = latest_doc_date.strftime("%d %B %Y")

    if lang == 'ms':
        if latest_doc_date.month == 1:
            latest_doc_month = "Januari"
        elif latest_doc_date.month == 2:
            latest_doc_month = "Februari"
        elif latest_doc_date.month == 3:
            latest_doc_month = "Mac"            
        elif latest_doc_date.month == 4:
            latest_doc_month = "April"            
        elif latest_doc_date.month == 5:
            latest_doc_month = "Mei"            
        elif latest_doc_date.month == 6:
            latest_doc_month = "Jun"            
        elif latest_doc_date.month == 7:
            latest_doc_month = "Julai"            
        elif latest_doc_date.month == 8:
            latest_doc_month = "Ogos"            
        elif latest_doc_date.month == 9:
            latest_doc_month = "September"            
        elif latest_doc_date.month == 10:
            latest_doc_month = "Oktober"            
        elif latest_doc_date.month == 11:
            latest_doc_month = "November"            
        elif latest_doc_date.month == 12:
            latest_doc_month = "Disember"  
    else:
        if latest_doc_date.month == 1:
            latest_doc_month = "January"
        elif latest_doc_date.month == 2:
            latest_doc_month = "February"
        elif latest_doc_date.month == 3:
            latest_doc_month = "March"            
        elif latest_doc_date.month == 4:
            latest_doc_month = "April"            
        elif latest_doc_date.month == 5:
            latest_doc_month = "May"            
        elif latest_doc_date.month == 6:
            latest_doc_month = "June"            
        elif latest_doc_date.month == 7:
            latest_doc_month = "July"            
        elif latest_doc_date.month == 8:
            latest_doc_month = "August"            
        elif latest_doc_date.month == 9:
            latest_doc_month = "September"            
        elif latest_doc_date.month == 10:
            latest_doc_month = "October"            
        elif latest_doc_date.month == 11:
            latest_doc_month = "November"            
        elif latest_doc_date.month == 12:
            latest_doc_month = "December"

    temp_regAddress_address_1_old = data_mdw_1['regAddress']['address1']
    temp_regAddress_address_2_old = data_mdw_1['regAddress']['address2']
    temp_regAddress_address_3_old = data_mdw_1['regAddress']['address3']
    temp_regAddress_postcode_old = data_mdw_1['regAddress']['postcode']
    temp_regAddress_town_old = data_mdw_1['regAddress']['town']
    temp_regAddress_state_old = data_mdw_1['regAddress']['state']

    if temp_regAddress_address_1_old == 'TIADA FAIL':
        temp_regAddress_address_1_new = None
    elif temp_regAddress_address_1_old == None:
        temp_regAddress_address_1_new = None
    else:
        temp_regAddress_address_1_new = string.capwords(temp_regAddress_address_1_old)

    if temp_regAddress_address_2_old == 'TIADA FAIL':
        temp_regAddress_address_2_new = None
    elif temp_regAddress_address_2_old == None:
        temp_regAddress_address_2_new = None
    else:
        temp_regAddress_address_2_new = string.capwords(temp_regAddress_address_2_old)

    if temp_regAddress_address_3_old == 'TIADA FAIL':
        temp_regAddress_address_3_new = None
    elif temp_regAddress_address_3_old == None:
        temp_regAddress_address_3_new = None
    else:
        temp_regAddress_address_3_new = string.capwords(temp_regAddress_address_3_old)

    if temp_regAddress_postcode_old == 'TIADA FAIL':
        temp_regAddress_postcode_new = None
    elif temp_regAddress_postcode_old == None:
        temp_regAddress_postcode_new = None
    else:
        temp_regAddress_postcode_new = temp_regAddress_postcode_old

    if temp_regAddress_town_old == 'TIADA FAIL':
        temp_regAddress_town_new = None
    elif temp_regAddress_town_old == None:
        temp_regAddress_town_new = None
    else:
        temp_regAddress_town_new = string.capwords(temp_regAddress_town_old)

    if temp_regAddress_state_old == 'TIADA FAIL':
        temp_regAddress_state_new = None
    elif temp_regAddress_state_old == None:
        temp_regAddress_state_new = None
    else:
        temp_regAddress_state_new = temp_regAddress_state_old

    if temp_regAddress_state_old == 'R':
        temp_regAddress_state_new = 'Perlis'
    elif temp_regAddress_state_old == 'K':
        temp_regAddress_state_new = 'Kedah'
    elif temp_regAddress_state_old == 'P':
        temp_regAddress_state_new = 'Pulau Pinang'
    elif temp_regAddress_state_old == 'D':
        temp_regAddress_state_new = 'Kelantan'
    elif temp_regAddress_state_old == 'T':
        temp_regAddress_state_new = 'Terengganu'
    elif temp_regAddress_state_old == 'A':
        temp_regAddress_state_new = 'Perak'
    elif temp_regAddress_state_old == 'B':
        temp_regAddress_state_new = 'Selangor'
    elif temp_regAddress_state_old == 'C':
        temp_regAddress_state_new = 'Pahang'
    elif temp_regAddress_state_old == 'M':
        temp_regAddress_state_new = 'Melaka'
    elif temp_regAddress_state_old == 'J':
        temp_regAddress_state_new = 'Johor'
    elif temp_regAddress_state_old == 'X':
        temp_regAddress_state_new = 'Sabah'
    elif temp_regAddress_state_old == 'Y':
        temp_regAddress_state_new = 'Sarawak'
    elif temp_regAddress_state_old == 'L':
        temp_regAddress_state_new = 'Labuan'
    elif temp_regAddress_state_old == 'W':
        temp_regAddress_state_new = 'Wilayah Persekutuan'
    elif temp_regAddress_state_old == 'Q':
        temp_regAddress_state_new = 'Singapura'
    elif temp_regAddress_state_old == 'U':
        temp_regAddress_state_new = 'Wilayah Persekutuan Putrajaya'
    elif temp_regAddress_state_old == 'F':
        temp_regAddress_state_new = 'Foreign'
    elif temp_regAddress_state_old == 'I':
        temp_regAddress_state_new = 'Internet'
    elif temp_regAddress_state_old == 'S':
        temp_regAddress_state_new = 'Sabah'
    elif temp_regAddress_state_old == 'E':
        temp_regAddress_state_new = 'Sarawak'

    data_ready = {
        'compName': data_mdw_1['compName'],
        'compNo': data_mdw_1['compNo'],
        'compStatus': data_mdw_1['compStatus'],
        'compNoNew': data_mdw_2['newFormatNo'],
        'compNoOld': data_mdw_2['oldFormatNo'],
        'compType': data_mdw_1['compType'],
        'isAuditedFs': data_mdw_1['isAuditedFs'],
        'isBlacklist': data_mdw_1['isBlacklist'],
        'isDirNoOutsCompound': data_mdw_1['isDirNoOutsCompound'],
        'isDirNoPerseCase': data_mdw_1['isDirNoPerseCase'],
        'isDormant': data_mdw_1['isDormant'],
        'isExemptComp': data_mdw_1['isExemptComp'],
        'isIncorp18Months': data_mdw_1['isIncorp18Months'],
        'isLatestArLodged': data_mdw_1['isLatestArLodged'],
        'isRegAddrExist': data_mdw_1['isRegAddrExist'],
        'incorpDate': incorp_date_str,
        'incorporate_day': incorp_date.day,
        'incorporate_month': incorp_month,
        'incorporate_year': incorp_date.year,
        'regAddress_address1': temp_regAddress_address_1_new.title(),
        'regAddress_address2': temp_regAddress_address_2_new,
        'regAddress_address3': temp_regAddress_address_3_new,
        'regAddress_postcode': temp_regAddress_postcode_new,
        'regAddress_state': temp_regAddress_state_new,
        'regAddress_town': temp_regAddress_town_new,
        'extract_date': datetime.now().astimezone(pytz.timezone(time_zone)).strftime("%d %B %Y"),
        'printing_time': datetime.now().astimezone(pytz.timezone(time_zone)).strftime("%d-%m-%Y"),
        'generated_time': datetime.now().astimezone(pytz.timezone(time_zone)).strftime("%d-%m-%Y %-H:%M:%S"),
        'latestDocDate': latest_doc_date_str,
        'latest_doc_day': latest_doc_date.day,
        'latest_doc_month': latest_doc_month,
        'latest_doc_year': latest_doc_date.year
    }

    return data_ready