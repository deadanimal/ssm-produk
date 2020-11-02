import requests
import json
import xmltodict

def get_info_branch_listing(url, headers, registration_number):

   payload = """
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:inf="http://inf.ssm.com.my">
    <soapenv:Header/>
    <soapenv:Body>
        <inf:getInfoBranchListing>
            <header>
                <customerId>SSMProduk</customerId>
                <customerReferenceNo></customerReferenceNo>
                <customerRequestDate></customerRequestDate>
            </header>
            
            <request>
                <supplyBranchReq>
                    <addressId></addressId> 
                    <brNo>""" + str(registration_number) + """</brNo> 
                    <ipaddress></ipaddress> 
                    <remark></remark> 
                    <type></type> 
                </supplyBranchReq>
            </request>
        </inf:getInfoBranchListing>
    </soapenv:Body> 
</soapenv:Envelope>
"""

   response = requests.request("POST", url, data=payload, headers=headers)
   response_xml = response.content
   middleware_response_json = json.loads(json.dumps(xmltodict.parse(response_xml)))
   print('wiekiek', middleware_response_json)
   return middleware_response_json['soapenv:Envelope']['soapenv:Body']['inf:getInfoBranchListingResponse']['response']['getInfoBranchListingReturn']
