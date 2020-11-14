import csv
import json
import time

input_csv_path = './data/original/audit_firm.txt'
output_json_path = './output/audit.json'

data = []

with open(input_csv_path, mode='r') as csv_input:
    start_time = time.perf_counter()
    csv_reader = csv.reader(csv_input, delimiter='|')
    fields = [next(csv_reader)]
    index = 1

    for audit_firm in csv_reader:
        # print(audit_firm)
        data_json_ = {
            'model': 'entities.entity',
            'fields': {
                'name': audit_firm[0],
                'local_or_foreign': 'LC',
                'type_of_entity': 'AD',
                'audit_firm_number': audit_firm[1]
            }
        }
        data.append(data_json_)
        print(index)
        index = index + 1
    
with open(output_json_path, 'w') as json_output:
    json_output.write(json.dumps(data, indent=4))
    end_time = time.perf_counter()
    print(f"Process finished in {(end_time - start_time)/60:0.4f} minute(s)")

