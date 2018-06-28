
# coding: utf-8

# In[ ]:


from flask import Flask, render_template, jsonify, redirect, request
from sqlalchemy import create_engine, func

#create database
engine = create_engine("stocks_hashtags.sqlite")

@app.route("/")
def home():
    render_template("index.html")
    
@app.route("/stocks")
def stock_select():
    
    Symbols = ['DJA', 'GSPC', 'EUXL']
    Rescheduled = []
    Summit = []

    #iterate through Symbols list and query results
    for i in Symbols:
        result = engine.execute("Select * FROM stocks WHERE Symbol = ('%s') AND Event = 'Rescheduled'" % (i)).fetchall()
        Rescheduled.append(result)

    for i in Symbols: 
        result = engine.execute("Select * FROM stocks WHERE Symbol = ('%s') AND Event = 'Summit'" % (i)).fetchall()
        Summit.append(result)
        
    return jsonify(Rescheduled, Summit)

@app.route("/hashtags")
def hashtag_select():
    Rescheduled = engine.execute("SELECT * FROM hashtags WHERE Event = 'Rescheduled'").fetchall()

    Summit = engine.execute("SELECT * FROM hashtags WHERE Event = 'Summit'").fetchall()
    
    return jsonify(Rescheduled, Summit)

if __name__ == "__main__":
    app.run(debug=True)

