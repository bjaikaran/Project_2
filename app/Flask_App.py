
# coding: utf-8

# In[ ]:
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import (Flask, render_template, request, redirect, jsonify)

#create database
engine = create_engine("sqlite:///data/stocks_hashtags_V1.sqlite")

Base = automap_base()

Base.prepare(engine, reflect=True)

hashtag_data = Base.classes.hashtags
stock_data = Base.classes.stock_data

session = Session(engine)

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")
    
@app.route("/stocks")
def stock_select():

    results = session.query(stock_data.)
    
    # Symbols = ['DJA', 'GSPC', 'EUXL']
    # Rescheduled = []
    # Summit = []

    # #iterate through Symbols list and query results
    # for i in Symbols:
    #     result = engine.execute("Select * FROM stocks WHERE Symbol = ('%s') AND Event = 'Rescheduled'" % (i)).fetchall()
    #     Rescheduled.append(result)

    # for i in Symbols: 
    #     result = engine.execute("Select * FROM stocks WHERE Symbol = ('%s') AND Event = 'Summit'" % (i)).fetchall()
    #     Summit.append(result)
        
    # return jsonify(Rescheduled, Summit)

@app.route("/hashtags")
def hashtag_select():
    Rescheduled = engine.execute("SELECT * FROM hashtags WHERE Event = 'Rescheduled'").fetchall()

    Summit = engine.execute("SELECT * FROM hashtags WHERE Event = 'Summit'").fetchall()
    
    return jsonify(Rescheduled, Summit)

if __name__ == "__main__":
    app.run(debug=True)

