import requests
import json
import xmltodict

def get_info_incorp(url, headers, registration_number):

    payload = """
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:inf="http://inf.ssm.com.my">
   <soapenv:Header/>
   <soapenv:Body>
      <inf:getInfoIncorp>
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
            <supplyIncorpReq>
               <!--Optional:-->
               <checkDigit></checkDigit>
               <!--Optional:-->
               <companyNo>""" + str(registration_number) + """</companyNo>
               <gstAmount></gstAmount>
               <infoAmount></infoAmount>
               <!--Optional:-->
               <invoiceNo></invoiceNo>
               <!--Optional:-->
               <type>rocinfo</type>
            </supplyIncorpReq>
         </request>
      </inf:getInfoIncorp>
   </soapenv:Body>
</soapenv:Envelope> 
"""
    response = requests.request("POST", url, data=payload, headers=headers)
    response_xml = response.content
    middleware_response_json = json.loads(json.dumps(xmltodict.parse(response_xml)))
    parsed_response = middleware_response_json['soapenv:Envelope']['soapenv:Body']['inf:getInfoIncorpResponse']['response']['getInfoIncorpReturn']
    print('incorp', parsed_response)
    if parsed_response['errorMsg']:
        return False
    else:
        return True








