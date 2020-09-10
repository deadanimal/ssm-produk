import requests
import json
import xmltodict

def get_particulars_of_cosec(url, headers, registration_number):

   payload = """
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://10.7.31.182/InfoServiceStg/1/WS">
    <soapenv:Header />
    <soapenv:Body>
        <ws:getParticularsOfCosec>
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
                <req>
                    <!--Optional:-->
                    <companyNo>""" + str(registration_number) + """</companyNo>
                    <!--Optional:-->
                    <designation>S</designation>
                </req>
            </request>
        </ws:getParticularsOfCosec>
    </soapenv:Body>
</soapenv:Envelope>
"""

   response = requests.request("POST", url, data=payload, headers=headers)
   response_xml = response.content
   middleware_response_json = json.loads(json.dumps(xmltodict.parse(response_xml)))
   return ['tak dapat middleware response lagi']
   #return middleware_response_json['soapenv:Envelope']['soapenv:Body']['inf:getBizProfileResponse']['response']['getBizProfileReturn']