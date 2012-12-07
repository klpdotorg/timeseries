import csv
import json
import sys

csv_file = open(sys.argv[1], 'r')
reader = csv.DictReader(csv_file, fieldnames=csv_file.next().strip('\n\r').split(','))
out = json.dumps({row['dist_code']:[row] for row in reader})
json_file = open(sys.argv[1].split('.')[0] + '.json', 'w')
json_file.write(out)
