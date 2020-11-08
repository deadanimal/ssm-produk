import string
import pytz
import json

from datetime import datetime
from django.utils.timezone import make_aware

def particular_shareholders(mdw_1, mdw_2, lang, entity_type):
    
    data_mdw_1 = mdw_1
    data_mdw_2 = mdw_2

    date_format = "%d-%m-%Y"
    time_zone = 'Asia/Kuala_Lumpur'

    data_ready = {
        'mdw1': mdw_1,
        'mdw2': mdw_2,
        'printing_time': datetime.now().astimezone(pytz.timezone(time_zone)).strftime("%d-%m-%Y"), 
        'generated_time': datetime.now().astimezone(pytz.timezone(time_zone)).strftime("%d-%m-%Y %-H:%M:%S")
    }

    # print(data_ready)

    return data_ready