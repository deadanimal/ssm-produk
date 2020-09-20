import requests
import json
import xmltodict

def get_roc_business_officers_ctc(url, headers, registration_number):

   payload = """
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:inf="http://inf.ssm.com.my"> 
    <soapenv:Header/>
    <soapenv:Body>
        <inf:getRocBizOfficersCtc> 
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
                <rocCompanyOfficersReq>
                    <!--Optional:-->
                    <checkDigit>V</checkDigit>
                    <!--Optional:--> 
                    <fromDate>2000-02-02T00:00:00</fromDate> 
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
                </rocCompanyOfficersReq> 
            </request>
        </inf:getRocBizOfficersCtc> 
    </soapenv:Body>
</soapenv:Envelope>
"""

   response = requests.request("POST", url, data=payload, headers=headers)
   response_xml = response.content
   middleware_response_json = json.loads(json.dumps(xmltodict.parse(response_xml)))
   return middleware_response_json['soapenv:Envelope']['soapenv:Body']['inf:getRocBizOfficersCtcResponse']['response']['getRocBizOfficersCtcReturn']