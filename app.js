'use strict';

var PORT = process.env.PORT || 3000;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

var stormpath = require('express-stormpath');
// var apiKey = new stormpath.ApiKey(
//   process.env.STORMPATH_CLIENT_APIKEY_ID,
//   process.env.STORMPATH_CLIENT_APIKEY_SECRET
// );
// var client = new stormpath.Client({ apiKey: apiKey });
// var applicationHref = process.env.STORMPATH_APPLICATION_HREF;
// client.getApplication(applicationHref, function(err, application) {
//   console.log('Application:', application);
// });

var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/[ENTER_PROJECT_NAME_HERE]')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(stormpath.init(app, {
  client: {
    apiKey: {
      id: process.env.STORMPATH_CLIENT_APIKEY_ID,
      secret: process.env.STORMPATH_CLIENT_APIKEY_SECRET,
    }
  },
  application: {
    href: process.env.STORMPATH_APPLICATION_HREF
  },
  website: true
}));

app.use('/', require('./routes/index'));

// 404 handler
app.get(function(req, res) {
  res.status(404).render('404');
});

app.on('stormpath.ready', function() {
  app.listen(PORT, function() {
    console.log('Listening on port ', PORT);
  });
});
