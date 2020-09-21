import requests
import json
import xmltodict

def get_image(url, headers, registration_number):

   payload = """
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://integrasistg.ssm.com.my/DocufloService/1/WS">
    <soapenv:Header />
    <soapenv:Body>
        <ws:getImage>
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
                <docufloImg>
                    <!--Optional:-->
                    <companyNo>1097967-P</companyNo>
                    <!--Optional:-->
                    <docProfile>ROC7</docProfile>
                    <!--Optional:-->
                    <gstAmount>0</gstAmount>
                    <!--Optional:-->
                    <infoAmount>0</infoAmount>
                    <!--Optional:-->
                    <invoiceNo>1234</invoiceNo>
                    <!--Optional:-->
                    <ipaddress></ipaddress>
                    <!--Optional:-->
                    <remark>test</remark>
                    <!--Optional:-->
                    <tableId>ROCINFO</tableId>
                    <!--Optional:-->
                    <type>INFODOCPURC</type>
                    <!--Optional:-->
                    <userName>appadmin</userName>
                    <!--Optional:-->
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