import csv
import json
import time

input_csv_path = './data/original/roc.txt'
output_json_path = './output/roc.json'

data = []

with open(input_csv_path, mode='r') as csv_input:
    start_time = time.perf_counter()
    csv_reader = csv.reader(csv_input, delimiter='|')
    fields = [next(csv_reader)]
    index = 1

    for company in csv_reader:
        # print(company)
        data_json_ = {
            'model': 'entities.entity',
            'fields': {
                'name': company[0],
                'local_or_foreign': 'LC',
                'type_of_entity': 'CP',
                'check_digit': company[2],
                'company_number': company[1],
                'company_number_new': company[3],
                'created_date': '2020-09-30T23:50:19.071287Z',
                'modified_date': '2020-09-30T23:50:19.071314Z'
            }
        }
        data.append(data_json_)
        print(index)
        index = index + 1
    
with open(output_json_path, 'w') as json_output:
    json_output.write(json.dumps(data, indent=4))
    end_time = time.perf_counter()
    print(f"Process finished in {(end_time - start_time)/60:0.4f} minute(s)")

    

