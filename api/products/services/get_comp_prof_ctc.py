import requests
import json
import xmltodict

def get_comp_prof_ctc(url, headers, registration_number):

   payload = """
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:inf="http://inf.ssm.com.my">
    <soapenv:Header />
    <soapenv:Body>
        <inf:getCompProfileCtc>
            <header>
                <customerId>SSMProduk</customerId>
                <!--Optional:-->
                <customerReferenceNo></customerReferenceNo>
                <!--Optional:-->
                <customerRequestDate></customerRequestDate>
            </header>
            <request>
                <!--Optional:--> 
                <supplyCompCtcReq>
                    <!--Optional:--> 
                    <checkDigit>V</checkDigit> 
                    <gstAmount>0</gstAmount> 
                    <infoAmount>0</infoAmount> 
                    <!--Optional:--> 
                    <invoiceNo>0</invoiceNo> 
                    <!--Optional:--> 
                    <ipaddress>0</ipaddress> 
                    <!--Optional:--> 
                    <lastUpdateDate></lastUpdateDate>
                    <!--Optional:--> 
                    <regNo>""" + str(registration_number) + """</regNo> 
                    <!--Optional:-->
                    <remark></remark> 
                    <!--Optional:--> 
                    <tableId>ROCINFO</tableId> 
                    <!--Optional:--> 
                    <type>INFOPROFILE</type>
                </supplyCompCtcReq>
            </request>
        </inf:getCompProfileCtc>
    </soapenv:Body>
</soapenv:Envelope>
"""

   response = requests.request("POST", url, data=payload, headers=headers)
   response_xml = response.content
   middleware_response_json = json.loads(json.dumps(xmltodict.parse(response_xml)))
   return middleware_response_json['soapenv:Envelope']['soapenv:Body']['inf:getCompProfileCtcResponse']['response']['getCompProfileCtcReturn']