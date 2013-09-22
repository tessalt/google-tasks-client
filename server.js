var express = require('express')
  passport = require('passport'),
  util = require('util'),
  request = require('request'),
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
  fs = require("fs"),
  appConfig = JSON.parse(fs.readFileSync("config.json"));

var app = {};

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy(
  {
    clientID: appConfig.client_id,
    clientSecret: appConfig.client_secret,
    callbackURL: "http://127.0.0.1:1234/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    app.accessToken = accessToken;
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
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.get('/',
  ensureAuthenticated,
  function(req, res){
    res.render('index', { user: req.user });
  }
);

app.get('/login',
  function(req, res){
    res.render('login', { user: req.user });
  }
);

app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  }
);

app.get('/auth/google',
  passport.authenticate(
    'google',
    { scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/tasks'] }
  ),
  function(req, res){}
);

app.get('/auth/google/callback',
  passport.authenticate(
    'google',
    { failureRedirect: '/login' }
  ),
  function(req, res) {
    res.redirect('/');
  }
);

app.get('/lists',
  ensureAuthenticated,
  function(req,res) {
    request.get(' https://www.googleapis.com/tasks/v1/users/@me/lists/?key=' + appConfig.api_key,
      { headers: { 'Authorization' : 'Bearer ' + app.accessToken } },
      function(error, response, body){
        res.send(body);
        console.log(response.body);
      }
    );
  }
);

app.get('/lists/:id',
  ensureAuthenticated,
  function(req,res) {
    request.get(
      'https://www.googleapis.com/tasks/v1/users/@me/lists/' + req.params.id + '/?key=' + appConfig.api_key,
      { headers: { 'Authorization' : 'Bearer ' + app.accessToken } },
      function(error, response, body){
        res.render("list", {body: body});
      }
    );
  }
);

app.post('/lists',
  ensureAuthenticated,
  function(req,res) {
    console.log(req.body);
    request({
        method: 'POST',
        uri:'https://www.googleapis.com/tasks/v1/users/@me/lists/?key=' + appConfig.api_key,
        headers:{'Authorization' : 'Bearer ' + app.accessToken},
        json: req.body
      }, function (error, response, body) {
        console.log(response.statusCode);
      }
    )
  }
);

app.put('/lists/:id',
  ensureAuthenticated,
  function(req,res) {
    request({
        method: 'PATCH',
        uri:'https://www.googleapis.com/tasks/v1/users/@me/lists/' + req.params.id + '/?key=' + appConfig.api_key,
        headers:{'Authorization' : 'Bearer ' + app.accessToken},
        json: req.body
      }, function (error, response, body) {
        console.log(response.statusCode);
      }
    )
  }
);

app.del('/lists/:id',
  ensureAuthenticated,
  function(req,res) {
    request.del(
      'https://www.googleapis.com/tasks/v1/users/@me/lists/' + req.params.id + '/?key=' + appConfig.api_key,
      { headers: { 'Authorization' : 'Bearer ' + app.accessToken } },
      function(error, response, body){
        console.log(response.statusCode);
      }
    );
  }
);

var port = process.env.PORT || 1234;

app.listen(port, function() {
  console.log("Listening on " + port);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}
