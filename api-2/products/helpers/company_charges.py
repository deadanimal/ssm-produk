import string
import pytz
import json

from datetime import datetime
from django.utils.timezone import make_aware

def company_charges(mdw_1, mdw_2, lang, entity_type):
    

    date_format = "%d-%m-%Y"
    time_zone = 'Asia/Kuala_Lumpur'

    charges = mdw_1["SSMRegistrationChargesInfos"]["SSMRegistrationChargesInfos"]
    charges_list = []

    if isinstance(charges, list): 
        charges = charges
    else:
        charges = [charges]
                

    for charge in charges:
        
        if charge['chargeStatus'] == 'S':
            charge['chargeStatusString'] = 'FULLY SATISFIED'
        elif charge['chargeStatus'] == 'P':
            charge['chargeStatusString'] = 'PARTLY SATISFIED'
        elif charge['chargeStatus'] == 'R':
            charge['chargeStatusString'] = 'FULLY RELEASED'  
        elif charge['chargeStatus'] == 'Q':
            charge['chargeStatusString'] = 'PARTLY RELEASED'     
        elif charge['chargeStatus'] == 'U':
            charge['chargeStatusString'] = 'UNSATISFIED'
        elif charge['chargeStatus'] == 'B':
            charge['chargeStatusString'] = 'CANCELLATION'  
        elif charge['chargeStatus'] == 'C':
            charge['chargeStatusString'] = 'FULLY CEASED' 

        if charge['chargeMortgageType'] == 'O':
            charge['chargeMortgageTypeString'] = 'OPEN TYPE'
        elif charge['chargeMortgageType'] == 'F':
            charge['chargeMortgageTypeString'] = 'FOREIGN CURRENCY' 
        elif charge['chargeMortgageType'] == 'A':
            charge['chargeMortgageTypeString'] = 'AMOUNT'                
        elif charge['chargeMortgageType'] == 'M':
            charge['chargeMortgageTypeString'] = 'MULTIPLE CURRENCIES'   

        charge['chargeAmount'] = float(charge['chargeAmount'])
        charge['chargeCreateDateString'] = make_aware(datetime.strptime(charge['chargeCreateDate'], '%Y-%m-%dT%H:%M:%S.000Z')).astimezone(pytz.timezone(time_zone)).strftime(date_format)
        charge['form40DateString'] = make_aware(datetime.strptime(charge['form40Date'], '%Y-%m-%dT%H:%M:%S.000Z')).astimezone(pytz.timezone(time_zone)).strftime(date_format)
        if 'releaseDate' in charge:
            charge['releaseDateString'] = make_aware(datetime.strptime(charge['releaseDate'], '%Y-%m-%dT%H:%M:%S.000Z')).astimezone(pytz.timezone(time_zone)).strftime(date_format)
                      
        charges_list.append(charge)

    data_ready = {
        'mdw1': mdw_1,
        'mdw2': mdw_2,
        'charges_list': charges_list,
        'compNoNew': mdw_2['newFormatNo'],
        'compNoOld': mdw_2['oldFormatNo'],        
    }


    return data_ready