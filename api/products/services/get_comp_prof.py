import requests
import json
import xmltodict

def get_comp_prof(url, headers, registration_number):

   payload = """
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:inf="http://inf.ssm.com.my">
    <soapenv:Header />
    <soapenv:Body>
        <inf:getCompProfile>
            <header>
                <customerId>SSMProduk</customerId>
                <!--Optional:-->
                <customerReferenceNo></customerReferenceNo>
                <!--Optional:-->
                <customerRequestDate></customerRequestDate>
            </header>
            <request>
                <supplyCompReq>
                    <!--Optional:-->
                    <checkDigit></checkDigit>
                    <gstAmount>0</gstAmount>
                    <infoAmount>0</infoAmount>
                    <!--Optional:-->
                    <invoiceNo></invoiceNo>
                    <!--Optional:-->
                    <ipaddress></ipaddress>
                    <!--Optional:-->
                    <lastUpdateDate></lastUpdateDate>
                    <regNo>""" + str(registration_number) + """</regNo>
                    <!--Optional:-->
                    <remark></remark>
                    <tableId>ROCINFO</tableId>
                    <type>INFOPROFILE</type>
                </supplyCompReq>
            </request>
        </inf:getCompProfile>
    </soapenv:Body>
</soapenv:Envelope>
    """

   response = requests.request("POST", url, data=payload, headers=headers)
   response_xml = response.content
   middleware_response_json = json.loads(json.dumps(xmltodict.parse(response_xml)))
   return middleware_response_json['soapenv:Envelope']['soapenv:Body']['inf:getCompProfileResponse']['response']['getCompProfileReturn']