import requests
import json
import xmltodict

def get_biz_profile(url, headers, registration_number, entity_type):

   payload = """
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:inf="http://inf.ssm.com.my">
    <soapenv:Header />
    <soapenv:Body>
        <inf:getBizProfile>
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
                <supplyBizReq>
                    <!--Optional:-->
                    <checkDigit></checkDigit>
                    <gstAmount>0</gstAmount>
                    <infoAmount>0</infoAmount>
                    <!--Optional:-->
                    <invoiceNo>0</invoiceNo>
                    <!--Optional:-->
                    <ipaddress></ipaddress>
                    <!--Optional:-->
                    <lastUpdateDate></lastUpdateDate>
                    <!--Optional:-->
                    <regNo>""" + str(registration_number) + """</regNo>
                    <!--Optional:-->
                    <remark></remark>
                    <!--Optional:-->
                    <tableId>ROBINFO</tableId>
                    <!--Optional:-->
                    <type>INFOPROFILE</type>
                </supplyBizReq>
            </request>
        </inf:getBizProfile>
    </soapenv:Body>
</soapenv:Envelope>
"""

   response = requests.request("POST", url, data=payload, headers=headers)
   response_xml = response.content
   middleware_response_json = json.loads(json.dumps(xmltodict.parse(response_xml)))
   return middleware_response_json['soapenv:Envelope']['soapenv:Body']['inf:getBizProfileResponse']['response']['getBizProfileReturn']