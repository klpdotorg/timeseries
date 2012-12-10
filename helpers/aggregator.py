import sys
import csv

aggregate = open(sys.argv[1].split('.')[0] + "_aggregate.csv", 'a')

csv_file = open(sys.argv[1], 'r')
fieldnames = csv_file.next().strip('\n').split(',')
reader = csv.DictReader(csv_file, fieldnames=fieldnames)
writer = csv.DictWriter(aggregate, fieldnames=fieldnames)
writer.writeheader()

agg_row = {}
for row in reader:
    print row
    if row['dist_code'] == 'DD':
        csv_file_again = open(sys.argv[1], 'r')
        reader2 = csv.DictReader(csv_file_again, fieldnames=fieldnames)
        writer.writerow(row)
        for row2 in reader2:
            if row2['dist_code'] == 'DA':
                agg_row['dist_code'] = "TU"
                agg_row['acad_year'] = row['acad_year']
                agg_row['govt_pass'] = (int(row['govt_pass']) + int(row2['govt_pass']))/2
                agg_row['nongovt_pass'] = (int(row['nongovt_pass']) + int(row2['nongovt_pass']))/2
                writer.writerow(agg_row)
    elif row['dist_code'] == "CC":
        csv_file_again = open(sys.argv[1], 'r')
        reader2 = csv.DictReader(csv_file_again, fieldnames=fieldnames)
        writer.writerow(row)
        for row2 in reader2:
            if row2['dist_code'] == 'CA':
                agg_row['dist_code'] = "KO"
                agg_row['acad_year'] = row['acad_year']
                agg_row['govt_pass'] = (int(row['govt_pass']) + int(row2['govt_pass']))/2
                agg_row['nongovt_pass'] = (int(row['nongovt_pass']) + int(row2['nongovt_pass']))/2
                writer.writerow(agg_row)
    elif row['dist_code'] == "NN":
        csv_file_again = open(sys.argv[1], 'r')
        reader2 = csv.DictReader(csv_file_again, fieldnames=fieldnames)
        writer.writerow(row)
        for row2 in reader2:
            if row2['dist_code'] == 'NA':
                agg_row['dist_code'] = "BE"
                agg_row['acad_year'] = row['acad_year']
                agg_row['govt_pass'] = (int(row['govt_pass']) + int(row2['govt_pass']))/2
                agg_row['nongovt_pass'] = (int(row['nongovt_pass']) + int(row2['nongovt_pass']))/2
                writer.writerow(agg_row)
    elif row['dist_code'] == "BA":
        csv_file_again = open(sys.argv[1], 'r')
        reader2 = csv.DictReader(csv_file_again, fieldnames=fieldnames)
        writer.writerow(row)
        for row2 in reader2:
            if row2['dist_code'] == 'BB':
                agg_row['dist_code'] = "BR"
                agg_row['acad_year'] = row['acad_year']
                agg_row['govt_pass'] = (int(row['govt_pass']) + int(row2['govt_pass']))/2
                agg_row['nongovt_pass'] = (int(row['nongovt_pass']) + int(row2['nongovt_pass']))/2
                writer.writerow(agg_row)
    elif row['dist_code'] == "AN":
        csv_file_again = open(sys.argv[1], 'r')
        reader2 = csv.DictReader(csv_file_again, fieldnames=fieldnames)
        writer.writerow(row)
        for row2 in reader2:
            if row2['dist_code'] == 'AS':
                agg_row['dist_code'] = "BG"
                agg_row['acad_year'] = row['acad_year']
                agg_row['govt_pass'] = (int(row['govt_pass']) + int(row2['govt_pass']))/2
                agg_row['nongovt_pass'] = (int(row['nongovt_pass']) + int(row2['nongovt_pass']))/2
                writer.writerow(agg_row)
    elif row['dist_code'] == 'PP':
        row['dist_code'] = 'UK'
        writer.writerow(row)
    elif row['dist_code'] == "BB":
        row['dist_code'] = 'BR'
        writer.writerow(row)
    else:
        writer.writerow(row)
