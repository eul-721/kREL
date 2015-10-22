var https = require('https');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var path = require('path');
var fs = require('fs');

//load configs
var config = require('./config/config')();

//load helpers/modules
var APIRouter = require('./js/APIRouter');

//load models
var Sortie = require('./js/models/sortie');
var User = require('./js/models/user');

//instantiate app
var app = express();

//setup middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('combined'));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'mySecret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

//authentication
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//ENVIRONMENT
console.log("ENV : " + process.env.NODE_ENV);

//app listening port
var port = config.port  || 8080;

//connect to config
console.log(config.DBUrl);
mongoose.connect(config.DBUrl);



app.use('/api', new APIRouter(loggedIn));



app.route('/login')
  .get(function(req, res){
    //LOGIN GET request placeholder

    res.redirect('/#/login');
  })
  .post(function(req, res, next){
    //LOGIN POST login attemp request placeholder
    passport.authenticate('local', function(err, user, info){
      //authentication custom callback
      if (err){
        return res.status(500).json({err: err});
      }
      if (!user){
        return res.status(401).json({err: info});
      }
      req.logIn(user, function(err){
        if(err){
          return res.status(500).json({err: 'Could not log in user'});
        }
        res.status(200).json({
          status: 'Login successful!',
          user: user
        });
      });
    })(req, res, next);
  });

app.get('/logout', function(req, res){
  //LOGOUT place
  req.logOut();
  res.status(200).json({status: 'Logged out.'});
})

app.get('/logged_in', function(req,res){
  if(req.user){
    res.status(200).json({msg: "Logged in"});
  } else{
    res.status(401).json({error: "You are not logged in"});
  }
})

app.post('/register', function(req, res){
  User.register(new User({ username: req.body.username}), req.body.password, function(err, account){
    if (err){
      return res.status(500).json({err: err});
    }
    passport.authenticate('local')(req, res, function() {
      return res.status(200).json({status: 'Registration successful!'});
    });
  });
});

app.route('/')
  .get(loggedIn,function(req, res){
    console.log("logged in");
    res.sendfile('./public/overview.html');
  })

https.createServer({
  key: fs.readFileSync(path.join(config.ssl_directory,'key.pem')),
  cert: fs.readFileSync(path.join(config.ssl_directory,'cert.pem'))
},app).listen(port);
console.log("Server started at : " + port);


function loggedIn(req, res, next){
  console.log(req.user);
  if (req.user){
    next();
  } else{
    res.status(401).json({error: "You are not logged in"});
    res.redirect('/#/login');
  }
}
