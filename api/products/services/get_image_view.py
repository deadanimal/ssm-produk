import requests
import json
import xmltodict

def get_image_view(url, headers, registration_number):

   payload = """
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:doc="http://integrasistg.ssm.com.my/DocufloService/1/WS"> 
    <soapenv:Header/>
    <soapenv:Body>
        <doc:getImageView> 
            <header>
                <customerId>SSMProduk</customerId>
                <customerReferenceNo></customerReferenceNo>
                <customerRequestDate></customerRequestDate>
            </header> 
            <request>
                <docufloReq>
                    <criteria>CompanyNo</criteria>
                    <docProfile></docProfile> 
                    <gstAmount>0</gstAmount> 
                    <infoAmount>0</infoAmount> 
                    <invoiceNo>0</invoiceNo> 
                    <ipaddress></ipaddress> 
                    <maxResult>1</maxResult>
                    <remark></remark>
                    <searchValue>""" + str(registration_number) + """</searchValue> 
                    <tableId></tableId> 
                    <type></type> 
                    <userName>appadmin</userName> 
                    <userPwd>p@ss1234</userPwd>
                </docufloReq>
            </request> 
        </doc:getImageView>
    </soapenv:Body> 
</soapenv:Envelope>
"""

   response = requests.request("POST", url, data=payload, headers=headers)
   response_xml = response.content
   middleware_response_json = json.loads(json.dumps(xmltodict.parse(response_xml)))
#    return middleware_response_json['takdaresponse lagi']
   return middleware_response_json['soapenv:Envelope']['soapenv:Body']['doc:getImageViewResponse']['response']['getImageViewReturn']