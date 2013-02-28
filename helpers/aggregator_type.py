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
                for field in fieldnames:
                    if field != 'dist_code':
                        agg_row['dist_code'] = 'TU'
                        if row[field] and row2[field]:
                            agg_row[field] = (int(row[field]) + int(row2[field])) / 2
                        elif row[field]:
                            agg_row[field] = row[field]
                        else:
                            agg_row[field] = row2[field]
                writer.writerow(agg_row)

    elif row['dist_code'] == 'CC':
        csv_file_again = open(sys.argv[1], 'r')
        reader2 = csv.DictReader(csv_file_again, fieldnames=fieldnames)
        writer.writerow(row)
        for row2 in reader2:
            if row2['dist_code'] == 'CA':
                for field in fieldnames:
                    if field != 'dist_code':
                        agg_row['dist_code'] = 'KO'
                        if row[field] and row2[field]:
                            print row[field], row2[field]
                            agg_row[field] = (int(row[field]) + int(row2[field])) / 2
                        elif row[field]:
                            agg_row[field] = row[field]
                        else:
                            agg_row[field] = row2[field]
                writer.writerow(agg_row)        

    elif row['dist_code'] == 'NN':
        csv_file_again = open(sys.argv[1], 'r')
        reader2 = csv.DictReader(csv_file_again, fieldnames=fieldnames)
        writer.writerow(row)
        for row2 in reader2:
            if row2['dist_code'] == 'NA':
                for field in fieldnames:
                    if field != 'dist_code':
                        agg_row['dist_code'] = 'BE'
                        agg_row[field] = (int(row[field]) + int(row2[field])) / 2
                writer.writerow(agg_row)

    elif row['dist_code'] == 'BB':
        csv_file_again = open(sys.argv[1], 'r')
        reader2 = csv.DictReader(csv_file_again, fieldnames=fieldnames)
        for row2 in reader2:
            if row2['dist_code'] == 'BA':
                for field in fieldnames:
                    if field != 'dist_code' and row2[field]:
                        print row[field], row2[field]
                        agg_row[field] = (int(row[field]) + int(row2[field])) / 2
                    else:
                        agg_row[field] = row[field]
                agg_row['dist_code'] = 'BR'
                writer.writerow(agg_row)

    elif row['dist_code'] == 'AN':
        csv_file_again = open(sys.argv[1], 'r')
        reader2 = csv.DictReader(csv_file_again, fieldnames=fieldnames)
        writer.writerow(row)
        for row2 in reader2:
            if row2['dist_code'] == 'AS':
                for field in fieldnames:
                    if field != 'dist_code':
                        agg_row['dist_code'] = 'BG'
                        agg_row[field] = (int(row[field]) + int(row2[field])) / 2
                writer.writerow(agg_row)

    elif row['dist_code'] == 'PP':
        csv_file_again = open(sys.argv[1], 'r')
        reader2 = csv.DictReader(csv_file_again, fieldnames=fieldnames)
        for row2 in reader2:
            if row2['dist_code'] == 'PA':
                for field in fieldnames:
                    if field != 'dist_code' and row2[field]:
                        print row[field], row2[field]
                        agg_row[field] = (int(row[field]) + int(row2[field])) / 2
                    else:
                        agg_row[field] = row[field]
                agg_row['dist_code'] = 'UK'
                writer.writerow(agg_row)
    else:
        writer.writerow(row)
