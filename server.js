const express = require('express');
const env = require('dotenv').config()
const ejs = require('ejs');
const path = require('path');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
var MongoStore = require('connect-mongo');

// mongoose.connect("mongodb://localhost:27017/purchase", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }, (err) => {
//   if (!err) {
//     console.log('MongoDB Connection Succeeded.');
//   } else {
//     console.log('Error in DB connection : ' + err);
//   }
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
// });


// app.get("/", function (req, res) {
//   res.render('register', {
//   title: 'Registration Page',
//   name: '',
//   email: '',
//   password: ''    
//   })
//   });
//   // Showing secret page
//   app.get("/home", isLoggedIn, function (req, res) {
//   res.render("home");
//   });
//   // Showing register form
//   app.get("/index", function (req, res) {
//   res.render('register', {
//   title: 'Registration Page', 
//   _id: '',
// 	name: '',
// 	Department: '',
// 	Role: '',
// 	username: '',
// 	password: '',
// 	passwordConf: ''  
//   })  
//   });
 
//   // Handling user signup
//   app.post("/register", function (req, res) {
//   var email = req.body.email
//   var password = req.body.password
//   User.register(new User({ email: email }),
//   password, function (err, user) {
//   if (err) {
//   console.log(err);
//   return res.render("register");
//   }
//   passport.authenticate("local")(
//   req, res, function () {
//   req.flash('success', 'You have logged in')
//   res.render("home");
//   });
//   });
//   });
//   //Showing login form
//   app.get("/login", function (req, res) {
//   res.render('login', {
//   title: 'Login',
//   email: '',
//   password: ''     
//   })
//   });
//   //Handling user login
//   app.post("/login", passport.authenticate("local", {
//   successRedirect: "/home",
//   failureRedirect: "/login"
//   }), function (req, res) {
//   });
//   //Handling user logout
//   app.get("/logout", function (req, res) {
//   req.logout();
//   res.redirect("/");
//   });
//   function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated()) return next();
//   res.redirect("/login");
//   }

//var x = MongoStore.create({mongoUrl: 'mongodb+srv://admin:admin@cluster0.ig7xx.mongodb.net/module?retryWrites=true&w=majority'})
//var x = MongoStore.create({mongoUrl: 'mongodb://localhost:27017/purchase'})

var db = "mongodb://localhost:27017/example";
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

const conSuccess = mongoose.connection
conSuccess.once('open', _ => {
  console.log('Database connected:', db)
})

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
 // store: x
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');	

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/views'));

var index = require('./routes/index');
const exp = require('constants');
app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});+

app.listen(port, function () {
  console.log(`Server is started on http://127.0.0.1:${port}`);
});
