import requests
import json
import xmltodict

def get_image_list(url, headers, registration_number):

   payload = """
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:doc="http://integrasistg.ssm.com.my/DocufloService/1/WS"> 
    <soapenv:Header/>
    <soapenv:Body>
        <doc:getImageList> 
            <!--Optional:--> 
            <header>
                <!--Optional:-->
                <customerId>SSMProduk</customerId>
                <!--Optional:--> 
                <customerReferenceNo>SSMProduk</customerReferenceNo> 
                <!--Optional:--> 
                <customerRequestDate></customerRequestDate>
            </header> 
            <!--Optional:--> 
            <request>
                <!--Optional:--> 
                <docufloImgList>
                    <!--Optional:--> 
                    <companyNo>""" + str(registration_number) + """</companyNo> 
                    <!--Optional:--> 
                    <docProfile>ROC1</docProfile> 
                    <!--Optional:--> 
                    <gstAmount>0</gstAmount> 
                    <!--Optional:--> 
                    <infoAmount>0</infoAmount> 
                    <!--Optional:--> 
                    <invoiceNo></invoiceNo> 
                    <!--Optional:--> 
                    <ipaddress>?</ipaddress> 
                    <!--Optional:-->
                    <remark></remark>
                    <!--Optional:--> 
                    <tableId>ROCINFO</tableId> 
                    <!--Optional:--> 
                    <type>INFODOCPURC</type> 
                    <!--Optional:-->
                    <userName>appadmin</userName> 
                    <!--Optional:--> 
                    <userPwd>p@ss1234</userPwd> 
                    <verId>3412175</verId>
                </docufloImgList> 
            </request>
        </doc:getImageList> 
    </soapenv:Body>
</soapenv:Envelope>
"""

   response = requests.request("POST", url, data=payload, headers=headers)
   response_xml = response.content
   middleware_response_json = json.loads(json.dumps(xmltodict.parse(response_xml)))
#    return middleware_response_json['takdaresponse lagi']
   print(middleware_response_json['soapenv:Envelope']['soapenv:Body']['doc:getImageListResponse']['response'])
   return middleware_response_json['soapenv:Envelope']['soapenv:Body']['doc:getImageListResponse']['response']['getImageListReturn']