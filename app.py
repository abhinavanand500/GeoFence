#importing Libraries that are required for this project
from flask import Flask, render_template,request,json
from flask_sqlalchemy import SQLAlchemy
from math import sqrt
from flask import jsonify, make_response
app = Flask(__name__)
import mysql.connector
mydb=mysql.connector.connect(
    host='localhost',
    user='root',
    passwd='',
    database = 'geofencing'
)
@app.route("/contact", methods=['GET', 'POST'])
def Signup():
    if(request.method=='POST'):
        print("dd entry to the database")
        name = request.form.get('name')
        # print(name)
        phone = request.form.get('phone')
        usn = request.form.get('usn')
        password = request.form.get('password')
        mac = request.form.get('mac')
        email = request.form.get('email')
        query=  "insert into  signup1(phone, email, password, usn, name, mac) VALUES (%s,%s,%s,%s,%s,%s)"
        val = (phone, email, password, usn, name, mac)
        # print(password)

        mycursor = mydb.cursor()
        mycursor.execute(query, val)

        mydb.commit()
    return render_template('contact.html')
@app.route("/writedata", methods=['POST'])
def register():
    content = request.get_json()
    # usn1 = request.args.get("usn")
    # print(content['usn'])
    # # print(usn1)
    # # print(type(usn1))
    # password1 = request.args.get("password")
    # mac1 = request.args.get("mac")
    # long = float(request.args.get("long"))
    # lat = float(request.args.get("lat"))

    
    # Emulator location
    # long_coll = 37.421998333333335
    # lat_coll = -122.08400000000002

    # college location
    # long_coll=12.9337
    # lat_coll=77.6921

    # home location
    long_coll=23.35672372
    lat_coll=85.30982892


    usn1=content['usn']
    password1=content['password']
    mac1=content['mac']
    long=content['long']
    lat= content['lat']
    long1=float(long)
    lat1=float(lat)
    print(mac1)
    s= mac1.keys()
    mac2='12'
    for i in s :
        mac2 = mac2 + "." + i[1:]
    print(mac2)
    print(usn1)
    print(long1)
    print(lat1)
    print(password1)
    print(type(mac2))
    print("Done")
    mycursor = mydb.cursor()
    mycursor.execute('SELECT * FROM signup1 WHERE usn=%s and password=%s',(usn1,password1))
    myresult = mycursor.fetchall()
    for x in myresult :
        print(x)
        dist = sqrt((long_coll - long) ** 2 + (lat_coll - lat) ** 2)
        if (dist < 10) :
            try :
                print(mac2)
                print(len(mac2))
                prac_ele = "insert into  post_prac2(usn, mac) VALUES (%s, %s)"
                val = (usn1, mac2)
                mycursor = mydb.cursor()
                mycursor.execute(prac_ele, val)
                mydb.commit()
                data = {'message' : 'Marked Your Attendance', 'code' : 'SUCCESS'}
                return make_response(jsonify(data), 201)
            except :
                    data = {'message' : 'You Already Marked Your Attendance', 'code' : 'FAILED'}
                    return make_response(jsonify(data), 201)

        else :
            data = {'message' : 'You are Not inside Geofencing Location', 'code' : 'FAILED'}
            return make_response(jsonify(data), 201)
    data = {'message' : 'Wrong Email and Password', 'code' : 'FAILED'}
    return make_response(jsonify(data), 201)
@app.route("/post")
def post():
    from datetime import datetime

    var_date='"'+datetime.today().strftime('%Y-%m-%d')+'"'
    mycursor = mydb.cursor()
    mycursor.execute('SELECT * FROM post_prac2 where created_on='+var_date)
    myresult = mycursor.fetchall()
    # for x in myresult:
    #     print(x[0])

    var_query='SELECT count(*) FROM post_prac2 where created_on='+var_date
    # print(var_query)
    mycursor.execute(var_query)
    count = mycursor.fetchall()
    # print(count)

    mycursor.execute('SELECT count(*) FROM signup1')
    signupCount = mycursor.fetchall()
    # print(signupCount)
    return render_template('dashboard.html',text=myresult,presentCount=count,signupCount=signupCount)


@app.route("/comment/stream")
def test():
    return render_template('index.html')

@app.route("/")
def home():
    return render_template('index.html')


@app.route("/about")
def about():
    return render_template('about.html')
app.run(host="192.168.29.96", debug=True, port="8080")
# app.run(debug=True)
# if __name__ == '__main__':
#     print("hii")




