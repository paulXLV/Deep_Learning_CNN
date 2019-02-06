import os,sys

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, request, redirect, url_for, jsonify,  jsonify, render_template

import string
import datetime

import cloudinary
import cloudinary.uploader
import cloudinary.api

cloudinary.config(
	cloud_name = "dmxampqzw",
	api_key = "395587197797289",
	api_secret ="TO5ElOeLRESKgs3JXWO8nTsi8Aw")


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = os.path.realpath('static/images/uploads')

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
			cd = cloudinary.uploader.upload(file,folder = "rudsfinal")
			cdFilename= cd['secure_url']
			send.append({"filepath": cdFilename})

	from models.model import predict_animal, toDb

	prediction = predict_animal(cdFilename)

	dataSet = {
		'accuracy' : prediction['accuracy'],
        'prediction': prediction['animal'],
        'accuracy_outline': prediction['accuracy_outline'],
        'prediction_outline': prediction['animal_outline'],
        'filePath': cdFilename,
        'score_list': prediction['score_list'],
        'score_list_outline': prediction['score_list_outline'],
        'scrapedOn': now
    }

	toDb(dataSet)
	send.append({"prediction": prediction})
	return jsonify(send)

@app.route("/stats", methods=['GET', 'POST'])
def stats():
	from models.model import getDbItems

	dbInfo = getDbItems()
	
	return render_template("stats.html", data=dbInfo)

@app.route("/statsjson", methods=['GET', 'POST'])
def statsjson():
	from models.model import getDbItemsJson

	dbInfo = getDbItemsJson()
	return jsonify(dbInfo)

if __name__ == "__main__":
    app.run()
