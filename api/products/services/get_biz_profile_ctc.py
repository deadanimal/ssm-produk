import requests
import json
import xmltodict

def get_biz_profile_ctc(url, headers, registration_number):

   payload = """
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:inf="http://inf.ssm.com.my">
    <soapenv:Header />
    <soapenv:Body>
        <inf:getBizProfileCtc>
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
                <supplyBizCtcReq>
                    <!--Optional:-->
                    <checkDigit>V</checkDigit>
                    <gstAmount>10</gstAmount>
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
                    <remark>Diana Test</remark>
                    <!--Optional:-->
                    <tableId>ROCINFO</tableId>
                    <!--Optional:-->
                    <type>INFOPROFILE</type>
                </supplyBizCtcReq>
            </request>
        </inf:getBizProfileCtc>
    </soapenv:Body>
</soapenv:Envelope>
"""

   response = requests.request("POST", url, data=payload, headers=headers)
   response_xml = response.content
   middleware_response_json = json.loads(json.dumps(xmltodict.parse(response_xml)))
   return middleware_response_json['soapenv:Envelope']['soapenv:Body']['inf:getBizProfileCtcResponse']['response']['getBizProfileCtcReturn']