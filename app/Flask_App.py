
# coding: utf-8
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import (Flask, render_template, request, redirect, jsonify)

# create database
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
    results = session.query(
        stock_data.date,
        stock_data.symbol,
        stock_data.source,
        stock_data.event,
        stock_data.open,
        stock_data.high,
        stock_data.low,
        stock_data.close,
        stock_data.volume
        ).all()

    return jsonify(results)


@app.route("/tickers")
def get_tickers():
    results = session.query(stock_data.symbol).limit(7).all()
    return jsonify(results)


@app.route("/stocks/<select>")
def get_stock(select):
    ticker = select
    query = [
        stock_data.symbol,
        stock_data.date,
        stock_data.source,
        stock_data.event,
        stock_data.open,
        stock_data.high,
        stock_data.low,
        stock_data.close,
        stock_data.volume]
    results = session.query(*query).filter(stock_data.symbol == ticker).all()

    try:
        return jsonify(results)
    except:
        return 'not found'


@app.route("/hashtags")
def hashtag_select():
    results = session.query(
        hashtag_data.event,
        hashtag_data.hashtag,
        hashtag_data.count
        ).all()

    return jsonify(results)


if __name__ == "__main__":
    app.run(debug=True)
