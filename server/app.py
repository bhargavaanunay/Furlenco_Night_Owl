from flask import Flask, request
from models import *
import json
from flask.ext.cors import CORS
import argparse
import MySQLdb
from lib.ObjConverter import ObjConverter
from lib.User import User
from lib.Tag import Tag
from lib.Shop import Shop
from lib.Rating import Rating
from config import *
from lib.DecimalSerializer import DecimalSerializer
from decimal import *

app = Flask(__name__)
CORS(app)


def initialize():
    global user, rating, tag, shop
    user = User()
    rating = Rating()
    tag = Tag()
    shop = Shop()

@app.route('/login/', methods=['POST'])
def login():
    userdata = ObjConverter(request.get_json())
    ret = user.login(userdata.username, userdata.password, cursor)
    return json.dumps(ret)

@app.route('/signup/', methods=['POST'])
def signup():
    userdata = ObjConverter(request.get_json())
    ret = user.signup(userdata.username, userdata.password, cursor)
    return json.dumps(ret)

@app.route('/addshop/', methods=['POST'])
def addshop():
    shopdata = ObjConverter(request.get_json())
    thumbsup, thumbsdw = 0,0
    if shopdata.upvote ==False:
        thumbsdw = 1
    else:
        thumbsup = 1
    tagID = tag.getTagID(shopdata.tag,cursor)
    ret, shop_id = shop.addShop(shopdata, tagID, cursor)
    ret2 = rating.insertUserRating(shopdata.username, shop_id, thumbsup, thumbsdw, cursor)
    return json.dumps({"add":ret, "rating":ret2})

@app.route('/shops/', methods=['GET'])
def getshops():
    ret = shop.getShop(cursor)
    return json.dumps(ret, cls=DecimalSerializer)

@app.route('/tags/', methods=['GET'])
def gettags():
    tags = tag.getAllTags(cursor)
    return json.dumps(tags) 


@app.route('/vote/', methods=['POST'])
def vote():
    votes = ObjConverter(request.get_json())
    ret = rating.updateVotes(votes, cursor)
    return json.dumps(ret)

def setup_parser():
    parser = argparse.ArgumentParser(description='Night Owl Application')
    parser.add_argument('--host', dest='host', default="192.168.2.59")
    parser.add_argument('--port', dest='port', default=8080)
    parser.add_argument('--debug', dest='debug', default=True)
    parser.add_argument('--dbuser', dest='dbuser', default="root")
    parser.add_argument('--dbpass', dest='dbpass', default="root")
    parser.add_argument('--db', dest='dbname', default="furlenco")
    parser.add_argument('--dbhost', dest='dbhost', default="localhost")
    return parser

if __name__=='__main__':
    parser = setup_parser()
    args = parser.parse_args()
    db = MySQLdb.connect(args.dbhost, args.dbuser, args.dbpass, args.dbname)
    db.autocommit(True)
    getcontext().prec = 14
    initialize()
    cursor = db.cursor()
    app.run(host=args.host,port=args.port, debug=args.debug)
