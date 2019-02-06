import cv2
# from cv2 import *
from PIL import Image

import os
import numpy as np
import tensorflow as tf

import keras
from keras.preprocessing import image

# Load the model
from keras.models import load_model
model = load_model(os.path.realpath('models/predict_v3.h5'))
modelOutline = load_model(os.path.realpath('models/predict_v5.h5'))

categories = []
# categories = [[0, 'ants'], [1, 'armadillos'], [2, 'bats'], [3, 'black_widows'], [4, 'cats'], [5, 'cows']]
categories = [[0, 'bats'], [1, 'ducks'], [2, 'penguins'], [3, 'rhinos'], [4, 'spiders'], [5, 'turtles']]
# i = 0
# categs = os.listdir("../images")
# for categ in categs:
#     categories.append([i,categ])
#     animalpics = os.listdir("../images/" + categ)
    
#     i= i+1


def convert_to_array(img):
    from urllib.request import urlopen
    from scipy.misc import imread

    # im = cv2.imread(img)
    with urlopen(img) as file:
        img = imread(file,mode='RGB')
        im = img

    img = Image.fromarray(im, 'RGB')
    image = img.resize((50, 50))
    return np.array(image)

def get_animal_name(label):
    return (categories[label][1])

def predict_animal(file):

    ar=convert_to_array(file)
    ar=ar/255
    label=1
    a=[]
    a.append(ar)
    a=np.array(a)
    score=model.predict(a,verbose=1)
    label_index=np.argmax(score)
    acc=np.max(score)
    acc = str(acc)
    acc=float(acc)*100
    animal=get_animal_name(label_index)
    scoreOutline = modelOutline.predict(a,verbose=1)
    label_indexOutline=np.argmax(scoreOutline)
    accO=np.max(scoreOutline)
    accO = str(accO)
    accO=float(accO)*100
    animalO=get_animal_name(label_indexOutline)
    i=6
    list_cat_scores = []
    list_cat_scores1 = []

    for itm in range(i):
        cat_scores = [categories[itm][1], float(score.item(itm))*100]
        cat_scores1 = [categories[itm][1], float(scoreOutline.item(itm))*100]
        list_cat_scores.append(cat_scores)
        list_cat_scores1.append(cat_scores1)

    from operator import itemgetter

    sorted_cat_scores = sorted(list_cat_scores, key=itemgetter(1), reverse=True)
    sorted_cat_scores1 = sorted(list_cat_scores1, key=itemgetter(1), reverse=True)
    
    predict = {"animal_outline": animalO, "accuracy_outline": accO, "animal": animal, "accuracy": acc, 'score_list': sorted_cat_scores, 'score_list_outline': sorted_cat_scores1}
    
    return (predict)

def toDb(ds):
	from flask_pymongo import PyMongo
	from app import app

	# Use flask_pymongo to set up mongo connection
	app.config["MONGO_URI"] = ""
	mongo = PyMongo(app)
	mongo.db.uploads.insert_one(ds)

def getDbItems():
    import pandas as pd
    from flask_pymongo import PyMongo
    from app import app

    # Use flask_pymongo to set up mongo connection
    app.config["MONGO_URI"] = "mongodb://rudsuser:donuts12345@ds221435.mlab.com:21435/projectthree"
    mongo = PyMongo(app)

    coll = mongo.db.uploads.find()
    df = pd.DataFrame(coll)

    df.drop(columns={'score_list','score_list_outline'}, inplace=True)

    send = {"count" : len(df), 'total_average': df.mean() }

    return send

def getDbItemsJson():
    import pandas as pd
    from flask_pymongo import PyMongo
    from app import app

    # Use flask_pymongo to set up mongo connection
    app.config["MONGO_URI"] = "mongodb://rudsuser:donuts12345@ds221435.mlab.com:21435/projectthree"
    mongo = PyMongo(app)

    coll = mongo.db.uploads.find()
    df = pd.DataFrame(coll)

    df.drop(columns={'score_list','score_list_outline'}, inplace=True)

    pred = df.groupby('prediction')['accuracy'].agg(['mean', 'count'])
    pred.reset_index(inplace=True)
    predO = df.groupby('prediction_outline')['accuracy_outline'].agg(['mean', 'count'])
    predO.reset_index(inplace=True)

    pred = pred.values.tolist()
    predO = predO.values.tolist()
    p = []
    pO = []
    for x in pred:
        y={'animal': x[0], 'mean': x[1], 'count': x[2]}
        p.append(y)

    for x in predO:
        y={'animal': x[0], 'mean': x[1], 'count': x[2]}
        pO.append(y)
    

    send = {"pred": p, "predO": pO}
    return send
    