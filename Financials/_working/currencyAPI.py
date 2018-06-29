import json
import requests
import statistics as st
import pandas as pd
import numpy as np
import datetime as dt
import time
!pip install pyprind
import pyprind as bar
from dateutil import parser
from config import cur_lay_api

currencyDate = []
currencyId = []
currencyTitle = []
currencyConv = []
currencyVal = []
cur_con_pfx = "USD"
cur_conv = {"KPW":"North Korean Won",
            "KRW":"South Korean Won",
            "GBP":"British Pound Sterling",
            "EUR":"Euro",
            "HKD":"Hong Kong Dollar"}

currency_titles = pd.read_html("cur_table.html",encoding="latin-1")[0:]

currencyTitles = currency_titles[0].set_index(["Code", "Name"])

currencyTitles.head()

start = dt.date(2018,5,15)
today = dt.date.today()
end = dt.date(today.year,today.month,today.day-1)
duration = (end - start).days

run_s = time.time()
for cur in cur_conv.keys():
    days = 0
    progress = bar.ProgBar(duration, monitor=True, title="\n\n\n\nRetrieving historical currency data for {0}".format(cur))
    while days <= duration:
        date_it = (start+dt.timedelta(days=(days))).strftime("%Y-%m-%d")
        base_url = "https://apilayer.net/api/historical?access_key={0}&date={1}&source=USD&format=1".format(cur_lay_api,date_it)
        response = requests.get(base_url)
        data = response.json()
        currencyId.append(cur)
        currencyTitle.append(cur_conv[cur])
        currencyConv.append("USD")
        currencyDate.append(parser.parse(date_it))
        currencyVal.append(float(data["quotes"][cur_con_pfx+cur]))
        days+=1
        progress.update()
run_e = time.time()
total_time = run_e - run_s
print("\n\n\nAPI Retrieval Completed in {:0.4f} seconds".format(total_time))

col_dtypes = {"date":"datetime64[ns]",
              "currency":"object",
              "currencyName":"object",
              "toCurrency":"object",
              "rate":"float64"}

currency_df = pd.DataFrame(np.column_stack([currencyDate, currencyId, currencyTitle, currencyConv, currencyVal]),
                           columns=["date","currency","currencyName","toCurrency","rate"]).astype(col_dtypes)


currency_df.dtypes

currency_df["valueUSD"]=1/currency_df["rate"]

currencyRatePivot = pd.pivot_table(currency_df, values=["rate"], index=["date"], columns=["currency"])

currencyRatePivot

currencyUSDPivot = pd.pivot_table(currency_df, values=["valueUSD"], index=["date"], columns=["currency"])

currencyUSDPivot

curRateDeviation = currencyRatePivot.std(axis=0)
print(curRateDeviation)

curRateVariance = currencyRatePivot.var(axis=0)
print(curRateVariance)

curUSDDeviation = currencyUSDPivot.std(axis=0)
print(curUSDDeviation)

curUSDVariance = currencyUSDPivot.var(axis=0)
print(curUSDVariance)

