const express = require('express');
const mongoose = require('mongoose');
const authRoute=require('./routes/authRoter');

const cookieParser = require('cookie-parser');

const app = express();

// middleware
app.use(express.static('public'));

//here we use the json parser middleware
app.use(express.json());

/// for cookie
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://RajatArya:1234567890@cluster0.dbsvp.mongodb.net/db?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

app.use(authRoute);

//without cookieParser
//res.setHeader('Set-cookie',"newUSERCookie")

