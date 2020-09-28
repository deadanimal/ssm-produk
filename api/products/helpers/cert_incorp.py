import string
import pytz
import json

from datetime import datetime
from django.utils.timezone import make_aware

from products.helpers.mapping import comp_type_mapping, comp_status_mapping, comp_status_mapping

def cert_incorp(mdw_1, mdw_2, lang):
    
    data_mdw_1 = mdw_1
    data_mdw_2 = mdw_2
    

    date_format = "%d-%m-%Y"
    time_zone = 'Asia/Kuala_Lumpur'

    incorp_date = data_mdw_1['incorpDate']
    incorp_date = make_aware(datetime.strptime(incorp_date, '%Y-%m-%dT%H:%M:%S.000Z'))
    incorp_date = incorp_date.astimezone(pytz.timezone(time_zone)).strftime(date_format)

    data_ready = {
        'mdw1': mdw_1,
        'mdw2': mdw_2,
        'companyStatus': comp_status_mapping(mdw_1['companyStatus'],lang),
        'companyType': comp_type_mapping(mdw_1['companyType'],lang),
        'incorpDate': incorp_date
    }


    return data_ready