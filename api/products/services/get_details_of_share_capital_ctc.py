import requests
import json
import xmltodict

def get_details_of_share_capital_ctc(url, headers, registration_number):

   payload = """
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:inf="http://inf.ssm.com.my">
    <soapenv:Body> 
        <inf:getDtlsOfShareCapCtc>
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
                <req>
                    <!--Optional:--> 
                    <checkDigit>M</checkDigit> 
                    <!--Optional:--> 
                    <companyNo>""" + str(registration_number) + """</companyNo> 
                    <gstAmount>0</gstAmount> 
                    <infoAmount>0</infoAmount> 
                    <!--Optional:--> 
                    <invoiceNo>0</invoiceNo> 
                    <!--Optional:-->
                    <type>0</type> 
                </req>
            </request> 
        </inf:getDtlsOfShareCapCtc>
    </soapenv:Body> 
</soapenv:Envelope>
"""

   response = requests.request("POST", url, data=payload, headers=headers)
   response_xml = response.content
   middleware_response_json = json.loads(json.dumps(xmltodict.parse(response_xml)))
   return middleware_response_json['soapenv:Envelope']['soapenv:Body']['inf:getDtlsOfShareCapCtcResponse']['response']['getDtlsOfShareCapCtcReturn']