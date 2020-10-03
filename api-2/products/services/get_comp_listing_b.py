import requests
import json
import xmltodict

# Package B is more about the nationality of the shareholder director

def get_comp_listing_b(url, headers, 
    company_location, company_origin, company_status, 
    company_type, director_nationality, shareholder_nationality):
    
    payload = """
<x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://10.7.31.199/ListingService/1/WS"> 
    <x:Header/>
    <x:Body>
        <ws:getCompListingB> 
            <header>
                <customerId>SSMProduk</customerId> 
                <customerReferenceNo>?</customerReferenceNo>
                <customerRequestDate>?</customerRequestDate> 
            </header>
            <request>
                <compListingBReq> 
                <compLocation>""" + company_location + """</compLocation> 
                <compOrigin>""" + company_origin + """</compOrigin> 
                <compStatus>""" + company_status + """</compStatus> 
                <compType>""" + company_type + """</compType> 
                <directorNat>""" + director_nationality + """</directorNat> 
                <shareholderNat>""" + shareholder_nationality + """</shareholderNat> 
                <packageType>B</packageType>
                </compListingBReq> 
            </request>
        </ws:getCompListingB> 
    </x:Body>
</x:Envelope>
"""

    response = requests.request("POST", url, data=payload, headers=headers)
    response_xml = response.content
    middleware_response_json = json.loads(json.dumps(xmltodict.parse(response_xml)))
    return middleware_response_json['sopenv:Envelope']['sopenv:Body']['ws:getCompListingAResponse']['response']['getCompListingAReturn']




"""
<compLocation>C</compLocation> 
<compOrigin>L</compOrigin> 
<compStatus>D</compStatus> 
<compType>U</compType> 
<directorNat>MAL,SIN</directorNat> 
<shareholderNat>MAL,SIN</shareholderNat> 
<packageType>B</packageType>
"""    