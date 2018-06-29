
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
    results = session.query(stock_data.Event, stock_data.Symbol, stock_data.Date, stock_data.Open, stock_data.High, stock_data.Low, stock_data.Close).all()

    return jsonify(results)
    
@app.route("/hashtags")
def hashtag_select():
    results = session.query(hashtag_data.event, hashtag_data.hashtag, hashtag_data.count)
    
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)

