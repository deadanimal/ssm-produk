import requests
import json
import xmltodict

def get_info_fin3(url, headers, registration_number):

   payload = """
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:inf="http://inf.ssm.com.my">
    <soapenv:Header />
    <soapenv:Body>
        <inf:getInfoFin3>
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
                <supplyFin3Req>
                    <!--Optional:-->
                    <coNo>""" + str(registration_number) + """</coNo>
                    <!--Optional:-->
                    <endYear>2019</endYear>
                    <!--Optional:-->
                    <ipaddress></ipaddress>
                    <!--Optional:-->
                    <remark></remark>
                    <!--Optional:-->
                    <startYear>2016</startYear>
                    <!--Optional:-->
                    <type>INFOFINHISTY</type>
                </supplyFin3Req>
            </request>
        </inf:getInfoFin3>
    </soapenv:Body>
</soapenv:Envelope>
"""

   response = requests.request("POST", url, data=payload, headers=headers)
   response_xml = response.content
   middleware_response_json = json.loads(json.dumps(xmltodict.parse(response_xml)))
   return middleware_response_json['soapenv:Envelope']['soapenv:Body']['inf:getInfoFin3Response']['response']['getInfoFin3Return']