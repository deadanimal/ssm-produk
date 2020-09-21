import requests
import json
import xmltodict

def get_image_ctc(url, headers, registration_number):

   payload = """
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://integrasistg.ssm.com.my/DocufloService/1/WS">
    <soapenv:Header />
    <soapenv:Body>
        <ws:getImageCtc>
            <!--Optional:-->
            <header>
                <!--Optional:-->
                <customerId>SSMProduk</customerId>
                <!--Optional:-->
                <customerReferenceNo></customerReferenceNo>
                <!--Optional:-->
                <customerRequestDate>2020-09-01T15:13:40</customerRequestDate>
            </header>
            <!--Optional:-->
            <request>
                <!--Optional:-->
                <docufloImgCtc>
                    <!--Optional:-->
                    <companyNo>""" + str(registration_number) + """</companyNo>
                    <!--Optional:-->
                    <docProfile></docProfile>
                    <!--Optional:-->
                    <gstAmount></gstAmount>
                    <!--Optional:-->
                    <infoAmount></infoAmount>
                    <!--Optional:-->
                    <invoiceNo></invoiceNo>
                    <!--Optional:-->
                    <ipaddress></ipaddress>
                    <!--Optional:-->
                    <remark>test</remark>
                    <!--Optional:-->
                    <tableId></tableId>
                    <!--Optional:-->
                    <type></type>
                    <!--Optional:-->
                    <userName>appadmin</userName>
                    <!--Optional:-->
                    <userPwd>p@ss1234</userPwd>
                    <verId>3412175</verId>
                </docufloImgCtc>
            </request>
        </ws:getImageCtc>
    </soapenv:Body>
</soapenv:Envelope>
"""

   response = requests.request("POST", url, data=payload, headers=headers)
   response_xml = response.content
   middleware_response_json = json.loads(json.dumps(xmltodict.parse(response_xml)))
#    return middleware_response_json['takdaresponse lagi']
   return middleware_response_json['soapenv:Envelope']['soapenv:Body']['doc:getImageCtcResponse']['response']['getImageCtcReturn']