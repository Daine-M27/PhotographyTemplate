var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/family', function(req, res, next) {
  // send gallery images to the res.render function 
  // create mixins or components to be used to build gallery on pug page
  // do for all with reusable logic based on corresponding folder
  res.render('index', { title: 'family' });
});

router.get('/kids', function(req, res, next) {
  res.render('index', { title: 'kids' });
});

router.get('/newborn', function(req, res, next) {
  res.render('index', { title: 'newborn' });
});

router.get('/about', function(req, res, next) {
  res.render('index', { title: 'about' });
});

router.get('/petsevents', function(req, res, next) {
  res.render('index', { title: 'pets and events' });
});

router.get('/smokebombs', function(req, res, next) {
  res.render('index', { title: 'smokebombs' });
});

module.exports = router;
