from flask import Flask, jsonify, request, make_response
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin
import logging

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Access-Control-Allow-Origin'
cors = CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Myduyen2602.'
app.config['MYSQL_DB'] = 'sqaProject'

mysql = MySQL(app)

# ////////////////////////////////////////
# create table first!!!!!
# create table admin(id int auto_increment primary key, name varchar(50) not null, password varchar(15) not null);
# create table normalUser(id int auto_increment primary key, name varchar(50) not null, password varchar(15) not null);
# ///////////////////////////////////////

#authentication
@app.route('/login',methods =['POST'])
def login():
    form = request.form
    name = form['name']
    pw = form['password']
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM user WHERE userName = %s and userPassword = %s", (name, pw))
    user = cur.fetchone()
# check if user.roleId == 1
    if user is not None:
        if user[3]==1:
            return jsonify({"admin":user})
        else:
            return jsonify({"user":user})
    else:
        mysql.connection.commit()
        cur.close()
        message = {'message':'can\'t find this user!'}
        return message

#search movies by title, director, actors or genre
@app.route('/search', methods=['POST'])
def search():
    keyword = "%"+request.form['keyword']+"%"
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM movie WHERE title LIKE %s OR director LIKE %s OR actors LIKE %s",(keyword, keyword, keyword))
    movies = cur.fetchall()
    return jsonify({"movies":movies})

#list all movies 
@app.route('/movies/all', methods=['GET'])
def movieAll():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM movie")
    movies = cur.fetchall()
    return jsonify({"movies":movies})

#list current movies 
@app.route('/movies', methods=['GET'])
def movieList():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM (SELECT * FROM movie WHERE releasedDate <= CURDATE()) Var1 ORDER BY movieId")
    movies = cur.fetchall()
    return jsonify({"movies":movies})

# #list 10 latest movies 
# @app.route('/movies', methods=['GET'])
# def movieList():
#     cur = mysql.connection.cursor()
#     cur.execute("SELECT * FROM (SELECT * FROM movie WHERE releasedDate <= CURDATE() ORDER BY releasedDate DESC LIMIT 10) Var1 ORDER BY movieId")
#     movies = cur.fetchall()
#     return jsonify({"movies":movies})

#list upcoming movies 
# @app.route('/movies/upcoming', methods=['GET'])
# def movieUpcoming():
#     cur = mysql.connection.cursor()
#     cur.execute("SELECT * FROM movie WHERE releasedDate > CURDATE() ORDER BY releasedDate")
#     movies = cur.fetchall()
#     return jsonify({"movies":movies})

#show movie info
@app.route('/movies/<id>', methods=['GET'])
def movieInfo(id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM movie WHERE movieId = %s", [id])
    movies = cur.fetchall()
    return jsonify({"movies":movies})

#list upcoming movies 
@app.route('/movies/upcoming', methods=['GET'])
def movieUpcoming():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM (SELECT * FROM movie WHERE releasedDate > CURDATE()) Var1 ORDER BY releasedDate")
    movies = cur.fetchall()
    return jsonify({"movies":movies})

#add movie
@app.route('/movies/add', methods=['POST'])
def addMovie():
    form = request.form
    title = form['title']
    genre = form['genre']
    image = form['image']
    trailerLink = form['trailerLink']
    description = form['description']
    length = form['length']
    origin = form['origin']
    releasedDate = form['releasedDate']
    director = form['director']
    actors = form['actors']
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO movie (title, genre, image,trailerLink, description, length, origin, releasedDate, director, actors) values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", (title, genre, image,trailerLink, description, length, origin, releasedDate, director, actors))
    mysql.connection.commit()
    cur.close()
    message="Added successfully!"
    return message

#edit movie
@app.route('/movies/edit', methods=['PUT'])
def editMovie():
    form = request.form
    movieId = form['movieId']
    title = form['title']
    genre = form['genre']
    image = form['image']
    trailerLink = form['trailerLink']
    description = form['description']
    length = form['length']
    origin = form['origin']
    releasedDate = form['releasedDate']
    director = form['director']
    actors = form['actors']
    cur = mysql.connection.cursor()
    cur.execute("UPDATE movie SET title = %s, genre = %s, image = %s, trailerLink = %s, description = %s, length = %s, origin = %s, releasedDate = %s, director = %s, actors = %s WHERE movieId = %s",(title, genre, image,trailerLink, description, length, origin, releasedDate, director, actors, movieId))
    mysql.connection.commit()
    cur.close()
    message="Updated successfully!"
    return message

#delete movie
@app.route('/movies/delete', methods=['DELETE'])
def deleteMovie():
    form = request.form
    movieId = form['movieId']
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM movie WHERE movieId = %s",[movieId])
    mysql.connection.commit()
    cur.close()
    message="Deleted successfully!"
    return message

#list food 
@app.route('/food', methods=['GET', 'POST'])
def foodList():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM food")
    foods = cur.fetchall()
    return jsonify({"foods":foods})

#add food
@app.route('/food/add', methods=['POST'])
def addFood():
    form = request.form
    foodName = form['foodName']
    foodPrice = form['foodPrice']
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO food (foodName, foodPrice) VALUES(%s, %s)",(foodName, foodPrice))
    mysql.connection.commit()
    cur.close()
    message="Added successfully!"
    return message

#edit food
@app.route('/food/edit', methods=['PUT'])
def editFood():
    form = request.form
    foodId = form['foodId']
    foodName = form['foodName']
    foodPrice = form['foodPrice']
    cur = mysql.connection.cursor()
    cur.execute("UPDATE food SET foodName = %s, foodPrice = %s WHERE foodId = %s",(foodName, foodPrice, foodId))
    mysql.connection.commit()
    cur.close()
    message="Updated successfully!"
    return message

#delete food
@app.route('/food/delete', methods=['DELETE'])
def deleteFood():
    form = request.form
    foodId = form['foodId']
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM food WHERE foodId = %s",[foodId])
    mysql.connection.commit()
    cur.close()
    message="Deleted successfully!"
    return message

#showTimeListByMovieId
@app.route('/time', methods=['GET'])
def listShowTimeByMovie():
    movieId = request.args.get('movieId')
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM showTime WHERE movieId = %s", [movieId])
    showTime = cur.fetchall()
    res=[]
    for item in showTime:
        data={}
        data['startTime'] = item[2]
        data['roomId'] = item[3]
        res.append(data)
    return jsonify({"showTime":res})

#add showTime
@app.route('/time/add', methods=['POST'])
def addShowTime():
    form = request.form
    movieId = form['movieId']
    startTime = form['startTime']
    roomId = form['roomId']
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO showTime (movieId, startTime, roomId) VALUES(%s, %s, %s)",(movieId, startTime, roomId))
    mysql.connection.commit()
    cur.close()
    message="Added successfully!"
    return message

#edit showTime
@app.route('/time/edit', methods=['PUT'])
def editShowTime():
    form = request.form
    showTimeId = form['showTimeId']
    startTime = form['startTime']
    roomId = form['roomId']
    cur = mysql.connection.cursor()
    cur.execute("UPDATE showTime SET startTime = %s, roomId = %s WHERE showTimeId = %s",(startTime, roomId, showTimeId))
    mysql.connection.commit()
    cur.close()
    message="Updated successfully!"
    return message

#delete showTime
@app.route('/time/delete', methods=['DELETE'])
def deleteShowTime():
    form = request.form
    showTimeId = form['showTimeId']
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM showTime WHERE showTimeId = %s",[showTimeId])
    mysql.connection.commit()
    cur.close()
    message="Deleted successfully!"
    return message

#get all Bills in a range of time
@app.route('/bill/all', methods=['POST'])
def getBills():
    #typeOf(time) = String => e.g. "Today", "This week", "This month" 
    time = request.form['time']
    cur = mysql.connection.cursor()
    if time == "Today":
        cur.execute("SELECT * FROM orderBill WHERE DATE(orderDate) = CURDATE()")
    elif time == "This week":
        cur.execute("SELECT * FROM orderBill WHERE YEARWEEK(orderDate, 1) = YEARWEEK(CURDATE(), 1)")
    elif time == "This month":
        cur.execute("SELECT * FROM orderBill WHERE MONTH(orderDate) = MONTH(CURRENT_DATE()) AND YEAR(orderDate) = YEAR(CURRENT_DATE())")
    else :
        cur.execute("SELECT * FROM orderBill")
    bills = cur.fetchall()
    return jsonify({"bills":bills})

#get orderBill by userId
@app.route('/bill', methods=['GET'])
def getBillByUserId():
    userId = int(request.args['userId'])
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM orderBill WHERE userId = %s", [userId])
    bills = cur.fetchall()
    return jsonify({"bills":bills})

#generate Bill(include ticket and food)
@app.route('/bill/add', methods=['POST'])
def generateBill():
    cur = mysql.connection.cursor()
    form = request.form
    userId = form['userId']
    seatName = form['seatName']
    seatTypeId = form['seatTypeId']
    showTimeId = form['showTimeId']
    foodId = form['foodId']
    amount = form['amount']
    foodTotal = 0
    ticketTotal = 0
    for i in range(len(foodId)):
        fId = foodId[i]
        fAmount = amount[i]
        cur.execute("INSERT INTO foodOrder (foodId, userId, amount) VALUES (%s, %s, %s)", (fId, userId, fAmount))
        cur.execute("SELECT foodPrice FROM foodOrder JOIN food ON  foodOrder.foodId = food.foodId ORDER BY foodOrder.foodId DESC LIMIT 1")
        foodPrice = cur.fetchone()
        foodTotal += foodPrice[0]
    for i in range(len(seatTypeId)):
        stId = showTimeId[i]
        # insert the bookedSeat
        cur.execute("INSERT INTO bookedSeat(seatName, seatTypeId, showTimeId) VALUES (%s, %s, %s)", (seatName, seatTypeId, showTimeId))
        # return the id of the last bookedSeat
        cur.execute("SELECT count(*) FROM bookedSeat")
        sId = cur.fetchone()
        print(sId[0])
        # insert the purchased ticket
        cur.execute("INSERT INTO ticket VALUES (%s, %s, %s)", (userId, sId[0], stId))
        # count the price of each ticket
        cur.execute("SELECT price FROM ticket JOIN bookedSeat ON  ticket.seatId = bookedSeat.seatId JOIN seatType ON bookedSeat.seatTypeId= seatType.seatTypeId WHERE userId = %s and ticket.seatId = %s and ticket.showTimeId = %s", (userId, sId, stId))
        ticketPrice = cur.fetchone()
        ticketTotal += ticketPrice[0]
    totalPrice = foodTotal + ticketTotal
    cur.execute("INSERT INTO orderBill VALUES (%s, now(), %s, 'online')", (userId, totalPrice))
    
    mysql.connection.commit()
    cur.close()
    message="Added successfully!"
    return message

#list user 
@app.route('/user', methods=['GET', 'POST'])
def userList():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM user")
    users = cur.fetchall()
    return jsonify({"users": users})

#add user
@app.route('/user/add', methods=['POST'])
def addUser():
    form = request.form
    userName = form['userName']
    userPassword = form['userPassword']
    userAge = form['userAge']
    userEmail = form['userEmail']
    userAddress = form['userAddress']
    phoneNumber = form['phoneNumber']
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO user (userName, userPassword, roleId, userAge, userEmail, userAddress, phoneNumber) VALUES(%s, %s, 1, %s, %s, %s, %s)",(userName, userPassword, userAge, userEmail, userAddress, phoneNumber))
    mysql.connection.commit()
    cur.close()
    message="Added successfully!"
    return message

#edit user
@app.route('/user/edit', methods=['PUT'])
def editUser():
    form = request.form
    userId = form['userId']
    userName = form['userName']
    userPassword = form['userPassword']
    userAge = form['userAge']
    userEmail = form['userEmail']
    userAddress = form['userAddress']
    phoneNumber = form['phoneNumber']
    cur = mysql.connection.cursor()
    cur.execute("UPDATE user SET userName = %s, userPassword = %s, userAge = %s, userEmail = %s, userAddress = %s, phoneNumber = %s WHERE userId = %s",(userName, userPassword, userAge, userEmail, userAddress, phoneNumber, userId))
    mysql.connection.commit()
    cur.close()
    message="Updated successfully!"
    return message

#delete user
@app.route('/user/delete', methods=['DELETE'])
def deleteUser():
    form = request.form
    userId = form['userId']
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM user WHERE userId = %s",[userId])
    mysql.connection.commit()
    cur.close()
    message="Deleted successfully!"
    return message

#list all taken seats by showTimeId
@app.route('/ticket', methods=['GET'])
def listTakenSeats():
    showTimeId = int(request.args['showTimeId'])
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM bookedSeat WHERE showTimeId = %s", [showTimeId])
    tickets = cur.fetchall()
    return jsonify({"tickets":tickets})

if __name__ == '__main__':
    app.run(debug=True)