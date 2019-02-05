import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, request, redirect, url_for, jsonify,  jsonify, render_template

import random
import string
import datetime

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = 'static/images/uploads'

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
			fileExtS = filename.split('.')
			fileExt = fileExtS[1]
			now = datetime.datetime.now()
			rep = str(now).replace(" ",'').replace(":",'').replace(".",'').replace("-",'')
			rand = ''.join([random.choice(string.ascii_letters + string.digits) for n in range(10)])
			testname= rand+rep+'.'+fileExt
			filepath= os.path.join(app.config['UPLOAD_FOLDER'], testname)
			file.save(filepath)

			send.append({"filepath": testname})

	import models.model

	from models.model import predict_animal, toDb

	prediction = predict_animal(filepath)
	print(prediction)
	dataSet = {
		'accuracy' : prediction['accuracy'],
        'prediction': prediction['animal'],
        'filePath': filepath,
        'scrapedOn': now
    }
	print(dataSet)



	toDb(dataSet)
	send.append({"prediction": prediction})
	return jsonify(send)

if __name__ == "__main__":
    app.run()
