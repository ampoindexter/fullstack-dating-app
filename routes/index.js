'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: '[ENTER_YOUR_TITLE_HERE]'});
});

module.exports = router;