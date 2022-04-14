const express = require('express');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
dotenv.config();
app.set('view engine', 'njk');
app.use(express.static(__dirname + '/public'));

// create application/json parser
app.use(bodyParser.urlencoded({ extended: true }))
var fileupload = require("express-fileupload");
app.use(fileupload());
// cookie parser middleware
app.use(cookieParser());

// parse application/json
app.use(bodyParser.json())

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}))


// [ Connecting To Database ]
mongoose.connect(`mongodb+srv://sahilrawal:${process.env.DATABASE_PASS}@cluster0.1jxjs.mongodb.net/HandsfreeSurvey?retryWrites=true&w=majority`,
  {
    useNewUrlParser    : true,
    useUnifiedTopology : true,
    useFindAndModify   : false,
    useCreateIndex     : true
  }
);

mongoose.connection.on('error',error => console.log(`Error Connecting Mongodb ${error}`));
mongoose.connection.on('connected', ()=> console.log("Database Connected For Hands Free Survey"));


app.get('/test',function(req, res){
  res.send('Hello');
});

// [ Frontend - Route ]
let routes = require('./routes/survey');
routes(app);
// [ Backend - Route ]
let adminRoutes = require('./routes/admin');
adminRoutes(app);

app.listen(8000, function(){
  console.log('Server Started on Port ',8000);
})
