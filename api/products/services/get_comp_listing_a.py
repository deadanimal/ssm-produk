import requests
import json
import xmltodict

def get_comp_listing_a(url, headers, registration_number):

   payload = """
<sopenv:Envelope xmlns:sopenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://integrasistg.ssm.com.my/ListingService/1/WS"> 
    <sopenv:Header/>
    <sopenv:Body>
        <ws:getCompListingA> 
            <header>
                <customerId>SSMProduk</customerId> 
                <customerReferenceNo></customerReferenceNo> 
                <customerRequestDate>2020-09-01T15:13:40</customerRequestDate>
            </header> 
            <request>
                <compListingAReq> 
                    <bizCode>10799,10712,20131,22192</bizCode> 
                    <compLocation>B</compLocation> 
                    <compOrigin>L</compOrigin> 
                    <compStatus>E</compStatus> 
                    <compType>R</compType> 
                    <incorpDtFrom>2018-01-01T00:00:00</incorpDtFrom> 
                    <incorpDtTo>2018-01-31T00:00:00</incorpDtTo> 
                    <pageNo>1</pageNo>
                </compListingAReq> 
            </request>
        </ws:getCompListingA> 
    </sopenv:Body>
</sopenv:Envelope>
"""

   response = requests.request("POST", url, data=payload, headers=headers)
   response_xml = response.content
   middleware_response_json = json.loads(json.dumps(xmltodict.parse(response_xml)))
#    return middleware_response_json['middleware tak response lagi']
   return middleware_response_json['sopenv:Envelope']['sopenv:Body']['ws:getCompListingAResponse']['response']['getCompListingAReturn']