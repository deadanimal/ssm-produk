import requests
import json
import xmltodict

def get_roc_changes_registered_address_ctc(url, headers, registration_number, entity_type):

   payload = """
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:inf="http://inf.ssm.com.my"> 
    <soapenv:Header/>
    <soapenv:Body>
        <inf:getRocChgRegAddrCtc> 
            <!--Optional:-->
            <header>
                <!--Optional:-->
                <customerId>SSMProduk</customerId>
                <!--Optional:-->
                <customerReferenceNo></customerReferenceNo>
                <!--Optional:--> 
                <customerRequestDate>2018-10-16T00:00:00Z</customerRequestDate>
            </header>
            <!--Optional:--> 
            <request>
                <!--Optional:--> 
                <cRegisteredAddr>
                <!--Optional:-->
                <checkDigit>V</checkDigit>
                <!--Optional:--> 
                <fromDate>1990-02-01T00:00:00</fromDate> 
                <gstAmount></gstAmount> 
                <infoAmount></infoAmount>
                <!--Optional:--> 
                <invoiceNo></invoiceNo> 
                <!--Optional:--> 
                <ipaddress></ipaddress> 
                <!--Optional:--> 
                <regNo>""" + str(registration_number) + """</regNo>
                <!--Optional:--> 
                <remark></remark> 
                <!--Optional:--> 
                <type>INFOPROFILE</type>
            </cRegisteredAddr> </request>
        </inf:getRocChgRegAddrCtc> 
    </soapenv:Body>
</soapenv:Envelope>
"""

   response = requests.request("POST", url, data=payload, headers=headers)
   response_xml = response.content
   middleware_response_json = json.loads(json.dumps(xmltodict.parse(response_xml)))
   return middleware_response_json['soapenv:Envelope']['soapenv:Body']['inf:getRocChgRegAddrCtcResponse']['response']['getRocChgRegAddrCtcReturn']