const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

router.get('/', (req, res) => {
    res.render('upload', { title: 'Upload' });
})

router.post('/', (req, res) => {
    // define storage location
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, `images/${req.body.folders}`);
        },
    
        // add file extension
        filename: function(req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    });

    let upload = multer({ storage: storage, fileFilter: imageFilter }).single('gallery_img');

    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
    });

})



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