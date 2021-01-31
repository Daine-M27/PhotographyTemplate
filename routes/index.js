const express = require('express');
const router = express.Router();
const fs = require('fs')
const filePath = '../public/javascripts/gallery'


const readJson = (path, cb) => {
  fs.readFile(require.resolve(path), (err, data) => {
    if (err) {
      cb(err)
    } else {
      cb(null, JSON.parse(data))
    }
  })
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', imageList:''});
});

router.get('/gallery/:gallery', function(req, res, next) {
  const galleryName = req.params.gallery
  readJson(filePath, (err, galleries) => {
    // let images = Object.keys(galleries[galleryName])
    const imageNames = []
    let images = []
    // check if any images exist in gallery
    console.log(galleries[galleryName].length)
    if (galleries[galleryName].length > 0) {
      images = galleries[galleryName]

      if(images.length){
        images.forEach(image => {
          imageNames.push({'imageName':image.imageName})
        });
      }
      res.render('index', { title: req.params.gallery, galleryImages:imageNames, gallerySelected: galleryName });
    }
    else {
      imageNames.push({'imageName':'default.jpg'});
      res.render('index', { title: req.params.gallery, galleryImages:imageNames, gallerySelected:"default" })
    }
  })

  
});

// router.get('/kids', function(req, res, next) {
//   res.render('index', { title: 'kids' });
// });

// router.get('/newborn', function(req, res, next) {
//   res.render('index', { title: 'newborn' });
// });

router.get('/about', function(req, res, next) {
  res.render('index', { title: 'about' });
});

// router.get('/petsevents', function(req, res, next) {
//   res.render('index', { title: 'pets and events' });
// });

// router.get('/smokebombs', function(req, res, next) {
//   res.render('index', { title: 'smokebombs' });
// });

module.exports = router;
