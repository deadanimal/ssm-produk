# import csv
import requests
import json
# Reading an excel file using Python 
import xlrd
import csv


with open('data/department.txt', mode='r') as txt_file:
    txt_reader = csv.reader(txt_file, delimiter='|')
    fields = [next(txt_reader)]
    base_url = 'https://ssm-product-api.pipe.my/'
    index_counter = 0

    for row in txt_reader:

        print(row)
        index_counter = index_counter + 1
        department = {
            'ministry': row[0],
            'name': row[1],
            'active': True
        }
        # print(department)

        r_reg = requests.post(base_url + 'v1/egovernment-departments/', data=department)
        print(index_counter, r_reg.status_code)
        # res_reg = r_reg.json()

