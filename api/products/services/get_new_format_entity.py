import requests
import json
import xmltodict

def get_new_format_entity(url, headers, registration_number, entity_type):

   payload = """
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:inf="http://inf.ssm.com.my">
    <soapenv:Header />
    <soapenv:Body>
        <inf:getNewFormatEntityNo>
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
                <newFormatEntityNoReq>
                    <!--Optional:-->
                    <agencyId>SSMProduk</agencyId>
                    <!--Optional:-->
                    <checkDigit>H</checkDigit>
                    <!--Optional:-->
                    <formatType></formatType>
                    <!--Optional:-->
                    <regNo>""" + str(registration_number) + """</regNo>
                    <!--Optional:-->
                    <tableId></tableId>
                    <!--Optional:-->
                    <type>""" + entity_type + """</type>
                </newFormatEntityNoReq>
            </request>
        </inf:getNewFormatEntityNo>
    </soapenv:Body>
</soapenv:Envelope>
"""

   response = requests.request("POST", url, data=payload, headers=headers)
   response_xml = response.content
   middleware_response_json = json.loads(json.dumps(xmltodict.parse(response_xml)))
   return middleware_response_json['soapenv:Envelope']['soapenv:Body']['inf:getNewFormatEntityNoResponse']['response']['getNewFormatEntityNoReturn']