const express = require('express');
const router = express.Router();
const fs = require('fs');
//const multer = require('multer');
const path = require('path');
const fileUpload = require('express-fileupload');
const fileName = '../public/javascripts/gallery'
const galleries = require(fileName);



router.get('/', (req, res) => {
    res.render('manage', { title: 'Site Manager' });
})

router.post('/', (req, res) => {
    console.log(req.files.image)
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
    
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      let image = req.files.image;
      
      // console.log(req.body.folders);

      // Use the mv() method to place the file somewhere on your server
      image.mv(path.resolve(__dirname, `../public/images/${req.body.folders}/${image.name}`), function(err) {
        if (err){
          return res.status(500).send(err);
        }
        // work out order of array, and folder names coming from form.
        const order =  1;
        // update galleries json
        galleries[req.body.folders].push(
            {"imageName":image.name, "galleryOrder":order }
        )
        
        fs.writeFileSync(filename, JSON.stringify(galleries));
        res.send('File uploaded!');
      });
});

router.post('/edit', (req, res) => {
  // use image name and folder name to find and delete with fs
  res.send('Image deleted!')
})

router.post('/music', (req, res) => {
  // console.log(req.files.image)
  if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let music = req.files.music;
    music.name = 'mainTrack.mp3'
    // console.log(req.body.folders);

    // Use the mv() method to place the file somewhere on your server
    music.mv(path.resolve(__dirname, `../public/music/${music.name}`), function(err) {
      if (err)
        return res.status(500).send(err);
  
      res.send('File uploaded!');
    });
});




// router.post('/', (req, res) => {
//     const imageFilter = function(req, file, cb) {
//         // Accept images only
//         if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
//             req.fileValidationError = 'Only image files are allowed!';
//             return cb(new Error('Only image files are allowed!'), false);
//         }
//         cb(null, true);
//     };
    
//     const storage = multer.diskStorage({
//         destination: function(req, file, cb) {
//             cb(null, `images/`);
//         },
      
//         // add file extension
//         filename: function(req, file, cb) {
//             cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//         }
//       });

//     let upload = multer({ storage: storage, fileFilter: imageFilter }).single('gallery_img');

//     upload(req, res, function(err) {
//         // req.file contains information of uploaded file
//         // req.body contains information of text fields, if there were any

//         if (req.fileValidationError) {
//             return res.send(req.fileValidationError);
//         }
//         else if (!req.file) {
//             return res.send('Please select an image to upload');
//         }
//         else if (err instanceof multer.MulterError) {
//             return res.send(err);
//         }
//         else if (err) {
//             return res.send(err);
//         }

//         // Display uploaded image for user validation
//         res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
//     });

// })



// router.post('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// router.post('/family', function(req, res, next) {
//   res.render('index', { title: 'family' });
// });

// router.post('/kids', function(req, res, next) {
//   res.render('index', { title: 'kids' });
// });

// router.post('/newborn', function(req, res, next) {
//   res.render('index', { title: 'newborn' });
// });

// router.post('/about', function(req, res, next) {
//   res.render('index', { title: 'about' });
// });

// router.post('/petsevents', function(req, res, next) {
//   res.render('index', { title: 'pets and events' });
// });

// router.post('/smokebombs', function(req, res, next) {
//   res.render('index', { title: 'smokebombs' });
// });

module.exports = router;