import csv
import json
import sys
import collections

def get_arrays(row):
    gov_array = []
    pvt_array = []
    gov_array.append([row['04_05g_G'], row['04_05b_G']])
    gov_array.append([row['05_06g_G'], row['05_06b_G']])
    gov_array.append([row['06_07g_G'], row['06_07b_G']])
    gov_array.append([row['07_08g_G'], row['07_08b_G']])
    gov_array.append([row['08_09g_G'], row['08_09b_G']])
    gov_array.append([row['09_10g_G'], row['09_10b_G']])
    gov_array.append([row['10_11g_G'], row['10_11b_G']])
    gov_array.append([row['11_12g_G'], row['11_12b_G']])
    gov_array.append([row['12_13g_G'], row['12_13b_G']])
    # pvt_file = open("girl_vs_boy_p_aggregate.csv", 'r')
    # pvt_reader = csv.DictReader(pvt_file, fieldnames=pvt_file.next().strip(' \n\r').split(','))
    # for pvt_row in pvt_reader:
        # if pvt_row['dist_code'] == row['dist_code']:
    pvt_array.append([row['04_05g_N'], row['04_05b_N']])
    pvt_array.append([row['05_06g_N'], row['05_06b_N']])
    pvt_array.append([row['06_07g_N'], row['06_07b_N']])
    pvt_array.append([row['07_08g_N'], row['07_08b_N']])
    pvt_array.append([row['08_09g_N'], row['08_09b_N']])
    pvt_array.append([row['09_10g_N'], row['09_10b_N']])
    pvt_array.append([row['10_11g_N'], row['10_11b_N']])
    pvt_array.append([row['11_12g_N'], row['11_12b_N']])
    pvt_array.append([row['12_13g_N'], row['12_13b_N']])
    return [gov_array, pvt_array]

csv_file = open(sys.argv[1], 'r')
reader = csv.DictReader(csv_file, fieldnames=csv_file.next().strip(' \n\r').split(','))
json_file = open(sys.argv[1].split('.')[0] + '.json', 'w')
out = json.dumps({row['dist_code']:get_arrays(row) for row in reader})
json_file.write(out)