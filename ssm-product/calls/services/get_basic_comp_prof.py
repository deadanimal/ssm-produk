import requests
import json
import xmltodict

def get_basic_company_profile(url, headers, registration_number):


   payload = """
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:inf="http://inf.ssm.com.my"> <soapenv:Header/>
<soapenv:Body>
<inf:getCompProfile> <!--Optional:--><header>
<!--Optional:-->
<customerId>SSMProduk</customerId>
<!--Optional:-->
<customerReferenceNo>?</customerReferenceNo>
<!--Optional:--> <customerRequestDate>2018-10-16T00:00:00Z</customerRequestDate>
</header> <!--Optional:--> <request>
<!--Optional:--> <supplyCompReq>
<!--Optional:--> <checkDigit>V</checkDigit> <gstAmount>0</gstAmount> <infoAmount>0</infoAmount> <!--Optional:--> <invoiceNo>0</invoiceNo> <!--Optional:--> <ipaddress></ipaddress> <!--Optional:--> <lastUpdateDate></lastUpdateDate> <!--Optional:--> 
<regNo>"""+ str(registration_number) +"""</regNo> <!--Optional:-->
<remark></remark> <!--Optional:--> <tableId>ROCINFO</tableId> <!--Optional:--> <type>INFOPROFILE</type>
</supplyCompReq> </request>
</inf:getCompProfile> </soapenv:Body>
</soapenv:Envelope>
    """

   #payload = payload % ('960536')

   response = requests.request("POST", url, data=payload, headers=headers)
   response_xml = response.content
   print(response_xml)
   #print('\n')
   middleware_response_json = json.loads(json.dumps(xmltodict.parse(response_xml)))
   #print(middleware_response_json)
   return middleware_response_json['soapenv:Envelope']['soapenv:Body']['inf:getCompProfileResponse']['response']['getCompProfileReturn']