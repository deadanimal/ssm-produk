import csv
import json
import time
csv.field_size_limit(1000000000)

input_csv_path = './data/original/rob.txt'
output_json_path = './output/rob.json'

data = []

with open(input_csv_path, mode='r') as csv_input:
    start_time = time.perf_counter()
    csv_reader = csv.reader(csv_input, delimiter='|')
    fields = [next(csv_reader)]
    index = 1

    for business in csv_reader:
        # print(rob)
        data_json_ = {
            'model': 'entities.entity',
            'fields': {
                'name': business[0],
                'local_or_foreign': 'LC',
                'type_of_entity': 'BS',
                'check_digit': business[2],
                'registration_number': business[1],
                'registration_number_new': business[3]
            }
        }
        data.append(data_json_)
        print(index)
        index = index + 1
    
with open(output_json_path, 'w') as json_output:
    json_output.write(json.dumps(data, indent=4))
    end_time = time.perf_counter()
    print(f"Process finished in {(end_time - start_time)/60:0.4f} minute(s)")
