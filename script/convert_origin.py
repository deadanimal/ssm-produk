import csv
import json
import time

input_csv_path = './data/original/Origin.csv'
# output_json_path = './output/origin.py'

data = []

with open(input_csv_path, mode='r') as csv_input:
    start_time = time.perf_counter()
    csv_reader = csv.reader(csv_input, delimiter=',')
    fields = [next(csv_reader)]
    index = 1

    for origin in csv_reader:
        # data.append(data_json_)
        if index == 1:
            print('if temp_origin == \'', origin[0], '\':')
            print(' temp_origin = \'', origin[1], '\'')
        else:
            print('elif temp_origin == \'', origin[0], '\':')
            print(' temp_origin = \'', origin[1], '\'')
        index = index + 1
    
# with open(output_json_path, 'w') as json_output:
#     json_output.write(json.dumps(data, indent=4))
end_time = time.perf_counter()
print(f"Process finished in {(end_time - start_time)/60:0.4f} minute(s)")

    

