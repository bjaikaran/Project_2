import pandas as pd
import json
import statistics
import numpy as np
import datetime as dt
import iexfinance as iexf
import pyprind as bar

start = dt.date(2018,5,15)
end = dt.date(dt.date.today().year, dt.date.today().month,dt.date.today().day-1)
end_iexf = dt.date(dt.date.today().year, dt.date.today().month,dt.date.today().day-2)
end_t = dt.datetime(end.year,end.month,end.day-1, 4,0,0)

 stock_symbols = ["BP",
                "FDX",
                "INTC",
                "MSFT",
                "ORCL",
                "UPS",
                "XOM"
                ]
stock_descriptions = {"BP": "BP p.l.c.",
                      "FDX": "FedEx Corporation",
                      "INTC": "Intel Corporation",
                      "MSFT": "Microsoft Corporation",
                      "ORCL": "Oracle Corporation",
                      "UPS": "United Parcel Service Inc.",                      
                      "XOM": "Exxon Mobil Corporation"                      
                     }

#### Yahoo! Finance Data

start_utc = int(dt.datetime(2018,5,15,4,0,0).timestamp())
end_utc = int(end_t.timestamp())

yahoo_url = "https://finance.yahoo.com/quote/{0}/history?period1={1}&period2={2}&interval=1d&filter=history&frequency=1d"

yahoo_col_data = {"Date": "Date",
                  "Open": "Open",
                  "High": "High",
                  "Low": "Low",
                  "Close*": "Close",
                  "Adj Close**": "AdjClose",
                  "Volume": "Volume",
                  "Symbol": "Symbol",
                  "Event": "Event",
                  "Source": "Source"
}
yahoo_col_dtypes = {"Date": "datetime64[ns]",
                    "Open": "float64",
                    "High": "float64",
                    "Low": "float64",
                    "Close": "float64",
                    "AdjClose": "float64",
                    "Volume": "float64",
                    "Symbol": "object",
                    "Event": "object",
                    "Source": "object"
                   }


progress = bar.ProgBar(len(stock_symbols), monitor=True, title="Scraping Yahoo! Finance Historical Stock Performance")
for stock in stock_symbols:
    temp = pd.read_html(yahoo_url.format(sym,start_utc,end_utc))
    df = temp[0][:-1].copy()
    df["Symbol"] = stock
    df["Event"] = ""
    df["Source"] = "Yahoo!"
    df.rename(columns=yahoo_col_data,inplace=True)
    df.replace(to_replace = "-", value = 0, inplace=True)
    df.drop_duplicates("Date", keep="first", inplace=True)
    df["Event"] = ""
    df = df.astype(yahoo_col_dtypes)
    df = df.drop(columns="AdjClose")
    df["Date"] = df["Date"].dt.normalize()
    globals()["yahoo_%s" %stock] = df
    globals()["yahoo_%s_df" %stock] = df.set_index("Date")
    globals()["yahoo_%s_df" %stock].index = pd.to_datetime(globals()["yahoo_%s_df" %stock].index)
    globals()["yahoo_%s_df" %stock].sort_index(ascending = True, inplace = True)
    progress.update()

#### IEX Financial Data

iex_col_data = ["Date","Open","High","Low","Close","Volume","Symbol","Event","Source"]
iex_col_dtypes = {"Date": "datetime64[ns]",
                  "Open": "float64",
                  "High": "float64",
                  "Low": "float64",
                  "Close": "float64",
                  "Volume": "float64",
                  "Symbol": "object",
                  "Event": "object",
                  "Source": "object"
                 }

progress = bar.ProgBar(len(stock_symbols), monitor=True, title="Aggregating IEX Historical Stock Performance")
for stock in stock_symbols:
    globals()["iex_%s" %stock] = iexf.get_historical_data(stock, start=start, end=end_iexf)
    temp_date = []
    temp_open = []
    temp_high = []
    temp_low = []
    temp_close = []
    temp_vol = []
    temp_symbol = []
    temp_event = []
    temp_source = []
    

    temp_keys = globals()["iex_%s" %stock][stock]
    for key in temp_keys.keys():
        temp_date.append(key)
        temp_open.append(temp_keys[key]["open"])
        temp_high.append(temp_keys[key]["high"])
        temp_low.append(temp_keys[key]["low"])
        temp_close.append(temp_keys[key]["close"])
        temp_vol.append(temp_keys[key]["volume"])
        temp_symbol.append(stock)
        temp_event.append("")
        temp_source.append("IEX")
    globals()["iex_%s" %stock] = pd.DataFrame(np.column_stack([temp_date,
                                                               temp_open, 
                                                               temp_high,
                                                               temp_low,
                                                               temp_close,
                                                               temp_vol,
                                                               temp_symbol,
                                                               temp_event,
                                                               temp_source]),
                          columns=iex_col_data).astype(iex_col_dtypes)
    globals()["iex_%s_df" %stock] = globals()["iex_%s" %stock].set_index(["Date","Source"])
    progress.update()


##### Yahoo! Finance DataFrames Type and Index Validation

for stock in stock_symbols:
    total = len(globals()["yahoo_%s_df" %stock])
    print("yahoo_%s_df: \n*******************" %stock)
    print(str(globals()["yahoo_%s_df" %stock].dtypes)+
          "\n___________________\nINDEX\n-------------------\n"+
          str((globals()["yahoo_%s_df" %stock].index.name))+": "+
          (globals()["yahoo_%s_df" %stock].index.dtype_str)+
          "\nTotal Records: "+str(total)+"\n\n")
    
print("Total Stocks Captured: "+str(len(stock_symbols)))

##### IEX Financial DataFrames Type and Index Validation

for stock in stock_symbols:
    total = len(globals()["iex_%s_df" %stock])
    print("iex_%s_df: \n*******************" %stock)
    print(str(globals()["iex_%s_df" %stock].dtypes)+
          "\n___________________\nINDEX\n-------------------\n"+
          str((globals()["iex_%s_df" %stock].index.name))+": "+
          (globals()["iex_%s_df" %stock].index.dtype_str)+
          "\nTotal Records: "+str(total)+"\n\n")
    
print("Total Stocks Captured: "+str(len(stock_symbols)))

#### Consolidating each IEX and Yahoo! Dataframes into one per stock

for stock in stock_symbols:
    yahoo = globals()["yahoo_%s_df" %stock]
    iex = globals()["iex_%s_df" %stock]
    globals()["%s_df" %stock] = pd.concat([yahoo,iex])

#### Combining all Stock Dataframes into one Dataframe

Stocks_df = pd.concat([BP_df,FDX_df,INTC_df,MSFT_df,ORCL_df,UPS_df,XOM_df])

#### Assigning the categories of the Summit timeline to the stock data

events = { "Coordination": [dt.date(2018,5,15),
                            dt.date(2018,5,23)],
          
           "Cancelled":    [dt.date(2018,5,24)],
          
           "Rescheduled":  [dt.date(2018,5,25),
                            dt.date(2018,6,1)],
           
           "Awaiting":     [dt.date(2018,6,2),
                            dt.date(2018,6,11)],
          
           "Summit":       [dt.date(2018,6,12)],
           "Aftermath":    [dt.date(2018,6,13)]
         }

stockDates = pd.Series(Stocks_df.index.drop_duplicates())
event_date = pd.DataFrame(data=stockDates, columns=["Date","Event"]).set_index("Date")

for x in range(len(event_date)):
    e_date = event_date.index[x].date()
    if e_date == events["Summit"][0]:
        event_date.Event[x] = "Summit"
    elif e_date == events["Cancelled"][0]:
        event_date.Event[x] = "Cancelled"
    elif events["Coordination"][0] <= e_date <= events["Coordination"][1]:
        event_date.Event[x] = "Coordination"
    elif events["Rescheduled"][0] <= e_date <= events["Rescheduled"][1]:
        event_date.Event[x] = "Rescheduled"
    elif events["Awaiting"][0] <= e_date <= events["Awaiting"][1]:
        event_date.Event[x] = "Awaiting"
    else:
        event_date.Event[x] = "Aftermath"


eventMap = event_date.to_dict(orient="records")



eventMap[Stocks_df.index[3]["Event"]]

for x in range(len(Stocks_df)):
    Stocks_df.Event[x] = 

Stocks_df

