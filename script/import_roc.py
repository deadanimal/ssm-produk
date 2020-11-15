# import csv
import requests
import json
# Reading an excel file using Python 
import xlrd
import csv


with open('output/roc.json', mode='r') as txt_file:
    txt_reader = csv.reader(txt_file, delimiter='|')
    fields = [next(txt_reader)]
    base_url = 'https://ssm-product-api.pipe.my/'
    index_counter = 0   

    for row in txt_reader:

        # print(row[2])
        index_counter = index_counter + 1
        company = {
            'name': row[0],
            'company_number': row[1],
            'company_number_new': row[3],
            'check_digit': row[2],
            'type_of_entity': 'CP'
        }
        # print(company)

        r_reg = requests.post(base_url + 'v1/entities/', data=company)
        print(index_counter, r_reg.status_code)
        # res_reg = r_reg.json()

