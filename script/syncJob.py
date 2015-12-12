#!/usr/bin/python
import sys
import traceback
import gspread
import json
import requests
from oauth2client.client import SignedJwtAssertionCredentials

## 1 download sheet
## 2.1 compare 
def main():
    json_key = json.load(open('fangzhzh.json'))
    scope = ['https://spreadsheets.google.com/feeds']
    credentials = SignedJwtAssertionCredentials(json_key['client_email'], json_key['private_key'], scope)
    
    gc = gspread.authorize(credentials)
    
    #  source doc
    docid = "1UTfPykXSB95VTB_k98XPM44ELJQsJUmPOlJRSKN93ic"
    spreadsheet = gc.open_by_key(docid)
    worksheet = spreadsheet.worksheet("uva")
    print 'worksheet rown count:{0}'.format(worksheet.row_count)
    print 'worksheet updatetime:{0}'.format(worksheet.updated)
    try:
        with open('config.json','r+') as f:
            try:
                data=json.load(f)
                print 'local record last update time{0}'.format(data['lastUpdateTime'])
                if(data['lastUpdateTime'] != worksheet.updated) or True:
                    processSheet(worksheet)
                    data = {'lastUpdateTime' : worksheet.updated}
                    f.seek(0)
                    f.write('')
                    f.flush()
                    json.dump(data, f);
            except Exception, err:
                print "config json load erro is invalid:{0}" .format(sys.exc_info())
                traceback.print_exception(*sys.exc_info())
    except:
        print "open config.json:{0}" .format(sys.exc_info())
        traceback.print_exception(*sys.exc_info())
        with open('config.json', 'w') as config:
            data = {'lastUpdateTime' : worksheet.updated}
            config.flush()
            json.dump(data, config);


def processSheet( worksheet ):
    print   "worksheet {0} has row count:{1}".format(worksheet.title, worksheet.row_count)
    rows = []
    for index in range(2, worksheet.row_count):
        row = worksheet.row_values(index)
        if len(row) == 0:
            break;
        for column in row:
            if(column != None and "githubusercontent" in column):
                print "removed {0}".format(row)
                break;

        rows.append(row)
    print rows 


if __name__ == "__main__":
    main()
