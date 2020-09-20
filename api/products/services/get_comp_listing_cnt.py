import requests
import json
import xmltodict

def get_comp_listing_cnt(url, headers, registration_number):

   payload = """
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:lis="http://listing.ssm.com.my"> 
    <soapenv:Header/>
    <soapenv:Body>
        <lis:getCompListingCnt> 
            <!--Optional:--> 
            <header>
                <!--Optional:--> 
                <customerId>SSMProduk</customerId> 
                <!--Optional:--> 
                <customerReferenceNo></customerReferenceNo> 
                <!--Optional:--> 
                <customerRequestDate></customerRequestDate>
            </header> 
            <!--Optional:--> 
            <request>
                <!--Optional:-->
                <compListingCntReq>
                    <!--Optional:-->
                    <bizCode>10799,10712</bizCode>
                    <!--Optional:-->
                    <chargeStatus>D</chargeStatus>
                    <!--Optional:-->
                    <chargeType>O</chargeType>
                    <!--Optional:-->
                    <compLocation>B</compLocation>
                    <!--Optional:-->
                    <compOrigin>L</compOrigin>
                    <!--Optional:-->
                    <compStatus>E</compStatus>
                    <!--Optional:-->
                    <compType>R</compType>
                    <!--Optional:-->
                    <directorNat>MAL,SIN</directorNat>
                    <!--Optional:--> 
                    <finYrEndMax>2017-10-31T00:00:00</finYrEndMax> 
                    <!--Optional:--> 
                    <finYrEndMin>2017-06-01T00:00:00</finYrEndMin> 
                    <!--Optional:--> 
                    <incorpDtFrom>2018-01-01T00:00:00</incorpDtFrom> 
                    <!--Optional:--> 
                    <incorpDtTo>2018-01-31T00:00:00</incorpDtTo> 
                    <!--Optional:--> 
                    <netProfRangeMax>10000</netProfRangeMax> 
                    <!--Optional:--> 
                    <netProfRangeMin>0</netProfRangeMin> 
                    <packageType>C,D</packageType>
                    <!--Optional:-->
                    <shareholderNat>MAL,SIN</shareholderNat> 
                </compListingCntReq>
            </request> 
        </lis:getCompListingCnt>
    </soapenv:Body> 
</soapenv:Envelope>
"""

   response = requests.request("POST", url, data=payload, headers=headers)
   response_xml = response.content
   middleware_response_json = json.loads(json.dumps(xmltodict.parse(response_xml)))
   print( middleware_response_json['soapenv:Envelope']['soapenv:Body']['lis:getCompListingCnt']['response'])
#    return middleware_response_json['middleware tak bagi response lagi']
   return middleware_response_json['soapenv:Envelope']['soapenv:Body']['lis:getCompListingCnt']['response']['getCompListingCntReturn']