import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template

app = Flask(__name__)

#################################################
# Database Setup
#################################################

# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:passowrd@server/happiness'
# db = SQLAlchemy(app)

# import pymysql

# db = pymysql.connect(host='localhost',
#         user='root',
#         password='password',
#         db='happiness',
#         cursorclass=pymysql.cursors.DictCursor)
# cursor = db.cursor()

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/info")
def info():

	return render_template("info.html")

@app.route("/map")
def map():

    return render_template("map.html")


@app.route("/scatter")
def scatter():
    
    return render_template("scatter.html")


@app.route("/charts")
def charts():

    return render_template("charts.html")

@app.route("/world")
def world():

    return render_template("world.html")

@app.route("/api/scatter/<dt>")
def apiScatter(dt):
	sql = "SELECT * FROM happiness_master WHERE happiness_year = '"+dt+"'"
	cursor.execute(sql)
	results = cursor.fetchall()

	return jsonify(results)

@app.route("/api/charts/<dt>")
def apiCharts(dt):
	
	sql='select avg(happiness_score) as "Average", country_region.region from happiness_master join country_region on happiness_master.country = country_region.country  where happiness_master.happiness_year="'+dt+'" group by country_region.region order by average asc'
	cursor.execute(sql)
	results = cursor.fetchall()

	return jsonify(results)

@app.route("/api/bar/<dt>")
def apiBar(dt):
	
	sql = "SELECT * FROM happiness_master WHERE happiness_year = '"+dt+"' order by happiness_rank asc limit 50"
	cursor.execute(sql)
	results = cursor.fetchall()

	return jsonify(results)

@app.route("/api/world")
def apiWorld():
	send=[]
	sql = "select * from happiness_master join country_lon_lng on happiness_master.country = country_lon_lng.country where happiness_rank < 11 and happiness_year = '2015'"
	cursor.execute(sql)
	results = cursor.fetchall()
	send.append(results)
	sql = "select * from happiness_master join country_lon_lng on happiness_master.country = country_lon_lng.country where happiness_rank < 11 and happiness_year = '2016'"
	cursor.execute(sql)
	results = cursor.fetchall()
	send.append(results)
	sql = "select * from happiness_master join country_lon_lng on happiness_master.country = country_lon_lng.country where happiness_rank < 11 and happiness_year = '2017'"
	cursor.execute(sql)
	results = cursor.fetchall()
	send.append(results)
	
	sql = "select * from happiness_master join country_lon_lng on happiness_master.country = country_lon_lng.country where Happiness_year = '2015' order by happiness_rank desc limit 10"
	cursor.execute(sql)
	results = cursor.fetchall()
	send.append(results)
	sql = "select * from happiness_master join country_lon_lng on happiness_master.country = country_lon_lng.country where Happiness_year = '2016' order by happiness_rank desc limit 10"
	cursor.execute(sql)
	results = cursor.fetchall()
	send.append(results)
	sql = "select * from happiness_master join country_lon_lng on happiness_master.country = country_lon_lng.country where Happiness_year = '2017' order by happiness_rank desc limit 10"
	cursor.execute(sql)
	results = cursor.fetchall()
	send.append(results)

	return jsonify(send)

if __name__ == "__main__":
    app.run()
