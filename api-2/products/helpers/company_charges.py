import string
import pytz
import json

from datetime import datetime
from django.utils.timezone import make_aware

def company_charges(mdw_1, mdw_2, lang, entity_type):
    
    data_mdw_1 = mdw_1
    data_mdw_2 = mdw_2

    date_format = "%d-%m-%Y"
    time_zone = 'Asia/Kuala_Lumpur'

    data_ready = {
        'mdw1': mdw_1,
        'mdw2': mdw_2
    }

    print(data_ready)

    return data_ready