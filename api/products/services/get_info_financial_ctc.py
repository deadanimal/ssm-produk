import requests
import json
import xmltodict

def get_info_financial_ctc(url, headers, registration_number):

   payload = """
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:inf="http://inf.ssm.com.my"> 
    <soapenv:Header/>
    <soapenv:Body>
        <inf:getInfoFinancialCtc> 
            <!--Optional:--> 
            <header>
                <!--Optional:-->
                <customerId>SSMProduk</customerId>
                <!--Optional:-->
                <customerReferenceNo>T1234</customerReferenceNo>
                <!--Optional:--> 
                <customerRequestDate>2019-09-11T00:00:00Z</customerRequestDate>
            </header>
            <!--Optional:--> 
            <request>
                <!--Optional:--> 
                <supplyFinancialReq>
                    <!--Optional:--> 
                    <coNo>""" + str(registration_number) + """</coNo>  
                    <!--Optional:--> 
                    <endYear></endYear> 
                    <!--Optional:--> 
                    <ipaddress></ipaddress> 
                    <!--Optional:--> 
                    <remark></remark> 
                    <!--Optional:--> 
                    <startYear></startYear> 
                    <!--Optional:--> 
                    <type>INFOFINHISTY</type>
                </supplyFinancialReq> 
            </request>
        </inf:getInfoFinancialCtc> 
    </soapenv:Body>
</soapenv:Envelope>
    
"""

   response = requests.request("POST", url, data=payload, headers=headers)
   response_xml = response.content
   middleware_response_json = json.loads(json.dumps(xmltodict.parse(response_xml)))
   return middleware_response_json['soapenv:Envelope']['soapenv:Body']['inf:getInfoFinancialCtcResponse']['response']['getInfoFinancialCtcReturn']