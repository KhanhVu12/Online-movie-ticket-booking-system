from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = '123456789'
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
    print("=====================")
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM movie WHERE title LIKE %s OR director LIKE %s OR actors LIKE %s",(keyword, keyword, keyword))
    movies = cur.fetchall()
    return jsonify(movies)

#list 10 latest movies 
@app.route('/movies', methods=['GET'])
def movieList():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM (SELECT * FROM movie ORDER BY releasedDate DESC LIMIT 10) Var1 ORDER BY movieId")
    movies = cur.fetchall()
    return jsonify(movies)

#list food 
@app.route('/food', methods=['GET'])
def foodList():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM food")
    foods = cur.fetchall()
    return jsonify(foods)

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

#showTimeListByMovieId
@app.route('/time/list', methods=['GET'])
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
    return jsonify(res)

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

#generate Bill(include ticket and food)
@app.route('/bill/add', methods=['POST'])
def generateBill():
    cur = mysql.connection.cursor()
    form = request.form
    userId = form['userId']
    seatId = form['seatId']
    showTimeId = form['showTimeId']
    foodId = form['foodId']
    amount = form['amount']
    ticketTotal = 0
    for i in range(len(foodId)):
        fId = foodId[i]
        fAmount = amount[i]
        cur.execute("INSERT INTO foodOrder (foodId, userId, amount) VALUES (%s, %s, %s)", (fId, userId, fAmount))
    cur.execute("SELECT sum(foodPrice*amount) FROM foodOrder JOIN food ON  foodOrder.foodId = food.foodId where userId = %s", (userId))
    foodTotal = cur.fetchone()
    for i in range(len(seatId)):
        sId = seatId[i]
        stId = showTimeId[i]
        cur.execute("INSERT INTO ticket VALUES (%s, %s, %s)", (userId, sId, stId))
        cur.execute("SELECT price FROM ticket JOIN seat ON  ticket.seatId = seat.seatId join seatType on seat.seatTypeId= seatType.seatTypeId where ticket.seatId = %s", (sId))
        ticketPrice = cur.fetchone()
        ticketTotal= ticketTotal + ticketPrice[0]
    totalPrice = foodTotal[0] + ticketTotal
    cur.execute("INSERT INTO orderBill VALUES (%s, now(), %s, 'online')", [userId, totalPrice])
    mysql.connection.commit()
    cur.close()
    message="Added successfully!"
    return message


if __name__ == '__main__':
    app.run(debug=True)