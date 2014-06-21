import csv
import json
import sys
import collections

def get_arrays(row):
    gov_array = []
    pvt_array = []
    print row
    gov_array.append(row['04_05_g'])
    gov_array.append(row['05_06_g'])
    gov_array.append(row['06_07_g'])
    gov_array.append(row['07_08_g'])
    gov_array.append(row['08_09_g'])
    gov_array.append(row['09_10_g'])
    gov_array.append(row['10_11_g'])
    gov_array.append(row['11_12_g'])
    gov_array.append(row['12_13_g'])
    pvt_array.append(row['04_05_p'])
    pvt_array.append(row['05_06_p'])
    pvt_array.append(row['06_07_p'])
    pvt_array.append(row['07_08_p'])
    pvt_array.append(row['08_09_p'])
    pvt_array.append(row['09_10_p'])
    pvt_array.append(row['10_11_p'])
    pvt_array.append(row['11_12_p'])
    pvt_array.append(row['12_13_p'])
    # for key in row.keys():
    #     if key != 'dist_code':
    #         if key.endswith('g'):
    #             gov_array.append(row[key])
    #         else:
    #             pvt_array.append(row[key])
    return [gov_array, pvt_array]


csv_file = open(sys.argv[1], 'r')
reader = csv.DictReader(csv_file, fieldnames=csv_file.next().strip(' \n\r').split(','))
json_file = open(sys.argv[1].split('.')[0] + '.json', 'w')
out = json.dumps({row['dist_code']:get_arrays(row) for row in reader})
json_file.write(out)


