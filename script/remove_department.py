# import csv
import requests
import json
# Reading an excel file using Python 
import xlrd
import csv

base_url = 'https://ssm-product-api.pipe.my/'
response = requests.get(base_url + 'v1/egovernment-departments/')

print(response.content)
for file in response.json():
    print(file)
    if file['ministry'] == None:
        r_reg = requests.delete(base_url + 'v1/egovernment-departments/' + file['id'])
        print(r_reg.status_code)
    

