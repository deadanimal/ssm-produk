import requests
import json
import xmltodict

def get_fin2(url, headers, registration_number):


   payload = """<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:inf="http://inf.ssm.com.my"> <soapenv:Header/>
    <soapenv:Body>
<inf:getInfoFin2> <!--Optional:--> <header>
<!--Optional:-->
<customerId>ssmproduk</customerId>
<!--Optional:-->
<customerReferenceNo></customerReferenceNo>
<!--Optional:--> <customerRequestDate>2018-10-16T00:00:00Z</customerRequestDate>
</header> <!--Optional:--> <request>
<!--Optional:--> <supplyFin2Req> <!--Optional:-->
<coNo>"""+ str(registration_number) +"""</coNo> <!--Optional:--> <endYear></endYear> <!--Optional:--> <ipaddress></ipaddress> <!--Optional:--> <remark></remark> <!--Optional:--> <startYear></startYear> <!--Optional:--> <type>INFOFINHISTY</type></supplyFin2Req> </request>
</inf:getInfoFin2> </soapenv:Body>
</soapenv:Envelope>"""  

   #payload = payload % ('960536')

   response = requests.request("POST", url, data=payload, headers=headers)
   response_xml = response.content
   #print(response_xml)
   #print('\n')
   middleware_response_json = json.loads(json.dumps(xmltodict.parse(response_xml)))
   print(middleware_response_json)
   return middleware_response_json['soapenv:Envelope']['soapenv:Body']['inf:getInfoFin2Response']['response']['getInfoFin2Return']