# import csv
import requests
import json
# Reading an excel file using Python 
import xlrd
import csv


with open('data/audit.txt', mode='r') as txt_file:
    txt_reader = csv.reader(txt_file, delimiter='|')
    fields = [next(txt_reader)]
    base_url = 'https://ssm-product-api.pipe.my/'
    index_counter = 0

    for row in txt_reader:

        # print(row[2])
        index_counter = index_counter + 1
        audit = {
            'name': row[0],
            'audit_firm_number': row[1],
            'type_of_entity': 'AD'
        }
        # print(audit)

        r_reg = requests.post(base_url + 'v1/outfits/', data=audit)
        print(index_counter, r_reg.status_code)
        # res_reg = r_reg.json()

