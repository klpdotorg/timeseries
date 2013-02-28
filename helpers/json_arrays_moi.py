import csv
import json
import sys
import collections

def get_arrays(row):
    count_array = []
    avg_array = []
    count_array.append(row['sch_cnt_E'])
    count_array.append(row['sch_cnt_K'])
    count_array.append(row['sch_cnt_U'])
    count_array.append(row['sch_cnt_O'])
    return [count_array]


csv_file = open(sys.argv[1], 'r')
reader = csv.DictReader(csv_file, fieldnames=csv_file.next().strip(' \n\r').split(','))
json_file = open(sys.argv[1].split('.')[0] + '.json', 'w')
out = json.dumps({row['dist_code']:get_arrays(row) for row in reader})
json_file.write(out)


