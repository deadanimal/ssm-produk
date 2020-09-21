import requests
import json
import xmltodict

def get_details_of_shareholders_ctc(url, headers, registration_number):

   payload = """
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:inf="http://inf.ssm.com.my"> 
    <soapenv:Header/>
    <soapenv:Body>
        <inf:getDtlsOfShareholdersCtc> 
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
                <req>
                    <!--Optional:--> 
                    <checkDigit>M</checkDigit> 
                    <!--Optional:--> 
                    <companyNo>1002311</companyNo> 
                    <gstAmount></gstAmount> 
                    <infoAmount></infoAmount> 
                    <!--Optional:--> 
                    <invoiceNo></invoiceNo> 
                    <!--Optional:-->
                    <type>0</type> 
                </req>
            </request> 
        </inf:getDtlsOfShareholdersCtc>
    </soapenv:Body> 
</soapenv:Envelope>
"""

   response = requests.request("POST", url, data=payload, headers=headers)
   response_xml = response.content
   middleware_response_json = json.loads(json.dumps(xmltodict.parse(response_xml)))
   return middleware_response_json['soapenv:Envelope']['soapenv:Body']['inf:getDtlsOfShareholdersCtcResponse']['response']['getDtlsOfShareholdersCtcReturn']