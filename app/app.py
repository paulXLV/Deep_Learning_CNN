import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, request, redirect, url_for, jsonify,  jsonify, render_template


app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = 'static/images/uploads'

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

@app.route("/getfile", methods=['GET', 'POST'])
def getFile():
	send=[]

	if request.method == 'POST':
		if request.files.get('imageFile'):
			print("file if")
			file=request.files['imageFile']
			filename = file.filename
			filepath= os.path.join(app.config['UPLOAD_FOLDER'], filename)
			file.save(filepath)

			send.append({"filepath": filename})

	import models.model

	from models.model import predict_animal

	prediction = predict_animal(filepath)
	print(prediction)
	send.append({"prediction": prediction})
	return jsonify(send)

if __name__ == "__main__":
    app.run()
