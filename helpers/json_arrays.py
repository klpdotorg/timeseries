import csv
import json
import sys
import collections

def get_arrays(row):
    gov_array = []
    pvt_array = []
    # gov_array.append(row['govt_pass'])
    # pvt_array.append(row['pvt_pass'])
    gov_array.append(row['04_05g'])
    gov_array.append(row['05_06g'])
    gov_array.append(row['06_07g'])
    gov_array.append(row['07_08g'])
    gov_array.append(row['08_09g'])
    gov_array.append(row['09_10g'])
    gov_array.append(row['10_11g'])
    pvt_array.append(row['04_05n'])
    pvt_array.append(row['05_06n'])
    pvt_array.append(row['06_07n'])
    pvt_array.append(row['07_08n'])
    pvt_array.append(row['08_09n'])
    pvt_array.append(row['09_10n'])
    pvt_array.append(row['10_11n'])
    return [gov_array, pvt_array]
    # for key in row.keys():
    #     if key != 'dist_code':
    #         if key.endswith('g'):
    #             gov_array.append(row[key])
    #         else:
    #             pvt_array.append(row[key])


csv_file = open(sys.argv[1], 'r')
reader = csv.DictReader(csv_file, fieldnames=csv_file.next().strip(' \n\r').split(','))
json_file = open(sys.argv[1].split('.')[0] + '.json', 'w')
out = json.dumps({row['dist_code']:get_arrays(row) for row in reader})
json_file.write(out)


