import requests
import json
import xmltodict

def get_comp_listing_cnt(url, headers, registration_number):

   payload = """
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <listing:getCompListingCntResponse xmlns:listing="http://listing.ssm.com.my" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
            <header>
                <customerId>SSMProduk</customerId>
                <customerReferenceNo></customerReferenceNo>
                <customerRequestDate></customerRequestDate>
                <errorCode />
                <errorMessage />
                <hostErrorCode />
                <hostErrorMessage />
                <requestTimestamp>2019-05-17T16:15:29.194</requestTimestamp>
                <responseTimestamp>2019-05-17T16:15:29.430</responseTimestamp>
            </header>
            <request>
                <compListingCntReq>
                    <bizCode>10799,10712</bizCode>
                    <chargeStatus>D</chargeStatus>
                    <chargeType>O</chargeType>
                    <compLocation>B</compLocation>
                    <compOrigin>L</compOrigin>
                    <compStatus>E</compStatus>
                    <compType>R</compType>
                    <directorNat>MAL,SIN</directorNat>
                    <finYrEndMax>2017-10-31T00:00:00</finYrEndMax>
                    <finYrEndMin>2017-06-01T00:00:00</finYrEndMin>
                    <incorpDtFrom>2018-01-01T00:00:00</incorpDtFrom>
                    <incorpDtTo>2018-01-31T00:00:00</incorpDtTo>
                    <netProfRangeMax>10000</netProfRangeMax>
                    <netProfRangeMin>0</netProfRangeMin>
                    <packageType>C,D</packageType>
                    <shareholderNat>MAL,SIN</shareholderNat>
                </compListingCntReq>
            </request>
            <response>
                <getCompListingCntReturn>
                    <errorMsg />
                    <recCount>22024</recCount>
                    <successCode>00</successCode>
                    <totalPages>2203</totalPages>
                </getCompListingCntReturn>
            </response>
        </listing:getCompListingCntResponse>
    </soap:Body>
</soap:Envelope>
"""

   response = requests.request("POST", url, data=payload, headers=headers)
   response_xml = response.content
   middleware_response_json = json.loads(json.dumps(xmltodict.parse(response_xml)))
   return middleware_response_json['middleware tak bagi response lagi']
   #return middleware_response_json['soapenv:Envelope']['soapenv:Body']['inf:getRocChangesRegisteredAddressResponse']['response']['getRocChangesRegisteredAddressReturn']