var express = require('express')
  , passport = require('passport')
  , util = require('util')
  , request = require('request')
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var GOOGLE_CLIENT_ID = "326728887060.apps.googleusercontent.com";
var GOOGLE_CLIENT_SECRET = "FlzbXjKBdCxWXVbT13Cs4try";
var auth = {};

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:1234/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    auth.accessToken = accessToken;
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

var app = express();

// configure Express
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'keyboard cat' }));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.get('/', ensureAuthenticated, function(req, res){
  res.render('index', { user: req.user });
  console.log(auth);
});

app.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/auth/google',
  passport.authenticate('google', {
    scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/tasks'
    ]
  }),
  function(req, res){
});

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/lists', ensureAuthenticated, function(req,res){
  request.get(' https://www.googleapis.com/tasks/v1/users/@me/lists/?key=AIzaSyAE7l2KGB7afn3TKuSRsG87k8SSAlDBSgA', {
  headers: { 'Authorization' : 'Bearer ' + auth.accessToken }
  }, function(error, response, body){
    res.send(body);
  });
});

var port = process.env.PORT || 1234;

app.listen(port, function() {
  console.log("Listening on " + port);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}
