const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
//const session = require('express-session');

const PORT = process.env.PORT || 5000; // So we can run on heroku || (OR) localhost:5000
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4
};

const MongoDBStore = require('connect-mongodb-session')(session);
//const csrf = require('csurf');
//const flash = require('connect-flash');
const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://nstratford:PL3r9p9URkOCtXb1@cluster0-7ss0g.mongodb.net/test";
const store = new MongoDBStore({
   uri: MONGODB_URL,
   collection: 'sessions'
 });


const cors = require('cors'); 
const User = require('./models/user');
//const csrfProtection = csrf();
const corsOptions = {
  origin: "https://memory-saver.herokuapp.com/",
  optionsSuccessStatus: 200
};

const journalRoutes = require('./routes/journal');
const authRoutes = require('./routes/auth')

app.use(
  session({
    secret: 'my secret', 
    resave: false, 
    saveUninitialized: false,
    store: store
   })
 );

 app.use((req, res, next) => {
   if (!req.session.user) {
     return next();
   }
  User.findById(req.session.user._id)
      .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
 });
//app.use(csrfProtection);
//app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use(express.static(path.join(__dirname, 'public')))
   .use(bodyParser({extended: false}))
   .set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs')
   .use(authRoutes)
   .use(journalRoutes);
  
   app.use(cors(corsOptions));
  
   mongoose
   .connect(
     MONGODB_URL, options
   )
   .then(result => {
     app.listen(PORT);
   })
   .catch(err => {
     console.log(err);
   });
 