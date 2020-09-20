import requests
import json
import xmltodict

def get_image_view(url, headers, registration_number):

   payload = """
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:doc="http://integrasistg.ssm.com.my/DocufloService/1/WS"> 
    <soapenv:Header/>
    <soapenv:Body>
        <doc:getImageView> 
            <!--Optional:--> 
            <header>
                <!--Optional:-->
                <customerId>SSMProduk</customerId>
                <!--Optional:-->
                <customerReferenceNo></customerReferenceNo>
                <!--Optional:--> 
                <customerRequestDate>2020-09-29T00:00:00Z</customerRequestDate>
            </header> 
            <!--Optional:--> 
            <request>
                <!--Optional:--> 
                <docufloReq>
                    <!--Optional:--> 
                    <criteria>CompanyNo</criteria>
                    <!--Optional:--> 
                    <docProfile></docProfile> 
                    <!--Optional:--> 
                    <gstAmount>0</gstAmount> 
                    <!--Optional:--> 
                    <infoAmount>0</infoAmount> 
                    <!--Optional:--> 
                    <invoiceNo>0</invoiceNo> 
                    <!--Optional:--> 
                    <ipaddress></ipaddress> 
                    <maxResult>1</maxResult>
                     <!--Optional:-->
                    <remark></remark>
                    <!--Optional:--> 
                    <searchValue>""" + str(registration_number) + """</searchValue> 
                    <!--Optional:--> 
                    <tableId></tableId> 
                    <!--Optional:--> 
                    <type></type> 
                    <!--Optional:--> 
                    <userName>appadmin</userName> 
                    <!--Optional:--> 
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