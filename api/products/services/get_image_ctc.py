import requests
import json
import xmltodict

def get_image_ctc(url, headers, registration_number):

   payload = """
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://integrasistg.ssm.com.my/DocufloService/1/WS">
    <soapenv:Header />
    <soapenv:Body>
        <ws:getImageCtc>
            <header>
                <customerId>SSMProduk</customerId>
                <customerReferenceNo></customerReferenceNo>
                <customerRequestDate></customerRequestDate>
            </header>
            <request>
                <docufloImgCtc>
                    <companyNo>""" + str(registration_number) + """</companyNo>
                    <docProfile></docProfile>
                    <gstAmount></gstAmount>
                    <infoAmount></infoAmount>
                    <invoiceNo></invoiceNo>
                    <ipaddress></ipaddress>
                    <remark></remark>
                    <tableId></tableId>
                    <type></type>
                    <userName>appadmin</userName>
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