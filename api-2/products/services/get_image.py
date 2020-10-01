import requests
import json
import xmltodict

def get_image(url, headers, registration_number):

   payload = """
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://integrasistg.ssm.com.my/DocufloService/1/WS">
    <soapenv:Header />
    <soapenv:Body>
        <ws:getImage>
            <header>
                <customerId>SSMProduk</customerId>
                <customerReferenceNo></customerReferenceNo>
                <customerRequestDate></customerRequestDate>
            </header>
            <request>
                <docufloImg>
                    <companyNo>1097967-P</companyNo>
                    <docProfile>ROC7</docProfile>
                    <gstAmount>0</gstAmount>
                    <infoAmount>0</infoAmount>
                    <invoiceNo>0</invoiceNo>
                    <ipaddress></ipaddress>
                    <remark>test</remark>
                    <tableId>ROCINFO</tableId>
                    <type>INFODOCPURC</type>
                    <userName>appadmin</userName>
                    <userPwd>p@ss1234</userPwd>
                    <verId>3412175</verId>
                </docufloImg>
            </request>
        </ws:getImage>
    </soapenv:Body>
</soapenv:Envelope>
"""

   response = requests.request("POST", url, data=payload, headers=headers)
   response_xml = response.content
   middleware_response_json = json.loads(json.dumps(xmltodict.parse(response_xml)))
#    return middleware_response_json['takdaresponse lagi']
   return middleware_response_json['soapenv:Envelope']['soapenv:Body']['doc:getImageResponse']['response']['getImageReturn']