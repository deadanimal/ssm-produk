import requests
import json
import xmltodict

def get_info_rob_termination(url, headers, registration_number):

   payload = """
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:inf="http://inf.ssm.com.my">
    <soapenv:Header />
    <soapenv:Body>
        <inf:getInfoRobTermination>
            <header>
                <customerId>SSMProduk</customerId>
                <customerReferenceNo></customerReferenceNo>
                <customerRequestDate></customerRequestDate>
            </header>
            <request>
                <supplyInfoReq>
                    <checkDigit></checkDigit>
                    <gstAmount>0</gstAmount>
                    <infoAmount>0</infoAmount>
                    <invoiceNo></invoiceNo>
                    <ipaddress></ipaddress>
                    <lastUpdateDate></lastUpdateDate>
                    <regNo>""" + registration_number + """</regNo>
                    <remark></remark>
                    <tableId>ROBINFO</tableId>
                    <type>INFOROBTERLT</type>
                </supplyInfoReq>
            </request>
        </inf:getInfoRobTermination>
    </soapenv:Body>
</soapenv:Envelope>
"""

   response = requests.request("POST", url, data=payload, headers=headers)
   response_xml = response.content
   middleware_response_json = json.loads(json.dumps(xmltodict.parse(response_xml)))
   return middleware_response_json['soapenv:Envelope']['soapenv:Body']['inf:getInfoRobTerminationResponse']['response']['getInfoRobTerminationReturn']