import requests
import json
import xmltodict

def get_co_count(url, headers, registration_number):

   payload = """
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:inf="http://inf.ssm.com.my">
    <soapenv:Header />
    <soapenv:Body>
        <inf:getInfoListingByDateRangeCnt>
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
                <supplyPageCntReq>
                    <!--Optional:-->
                    <endDate>2020-08-31T17:05:00Z</endDate>
                    <!--Optional:-->
                    <regNo />
                    <!--Optional:-->
                    <startDate>2020-08-31T17:00:00Z</startDate>
                    <!--Optional:-->
                    <tableId>ROCINFO</tableId>
                </supplyPageCntReq>
            </request>
        </inf:getInfoListingByDateRangeCnt>
    </soapenv:Body>
</soapenv:Envelope>
"""

   response = requests.request("POST", url, data=payload, headers=headers)
   response_xml = response.content
   middleware_response_json = json.loads(json.dumps(xmltodict.parse(response_xml)))
   return middleware_response_json['soapenv:Envelope']['soapenv:Body']['inf:getInfoListingByDateRangeCntResponse']['response']['getInfoListingByDateRangeCntReturn']