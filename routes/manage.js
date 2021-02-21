const express = require('express');
const router = express.Router();
const fs = require('fs');
// const multer = require('multer');
const path = require('path');
// const fileUpload = require('express-fileupload');

const filePath = '../public/javascripts/gallery'
// const galleries = require(fileName);
const readJson = (path, cb) => {
  fs.readFile(require.resolve(path), (err, data) => {
    if (err) {
      cb(err)
    } else {
      cb(null, JSON.parse(data))
    }
  })
}

let getJsonText = (filepath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(require.resolve(path), (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(data))
      }
    })
  })
}

router.get('/', (req, res) => {
  const galleryCounts = {};
  // get number of images in each gallery to build order pulldown
  readJson(filePath, (err, galleries) => {
    let keys = Object.keys(galleries);
    keys.forEach(key => {
      galleryCounts[key] = galleries[key].length
    });
    console.log(galleryCounts);
    res.render('manage', { title: 'Site Manager', galleryOrder: JSON.stringify(galleryCounts), editPanelImages:null, gallerySelected:null });
  })  
    
})

router.post('/', (req, res) => {
  readJson(filePath, (err, galleries) => {
    console.log(galleries);
    // console.log(req.files.image)
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }    
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      let image = req.files.image;
      let galleryPosition = req.body.orderNumber
      
      console.log(galleryPosition);

      // Use the mv() method to place the file somewhere on your server
      image.mv(path.resolve(__dirname, `../public/images/${req.body.folders}/${image.name}`), function(err) {
        if (err){
          return res.status(500).send(err);
        }
        
        galleries[req.body.folders].splice(galleryPosition-1, 0, {"imageName":image.name})
        
        // console.log(galleries);
        const storeData = (data) => {
          try {
            fs.writeFileSync("public\\javascripts\\gallery.json", JSON.stringify(data))
          } catch (err) {
            console.error(err)
          }
        }
        storeData(galleries);
        
        res.redirect('/manage');
      });

  })
   
});

router.post('/edit', (req, res) => {
  const galleryName = req.body.editFolders
  readJson(filePath, (err, galleries) => {
    // let images = Object.keys(galleries[galleryName])
    const imageNames = []
    let images = []
    // check if any images exist in gallery
    
    if (galleries[galleryName].length > 0) {
      images = galleries[galleryName]

      if(images.length){
        images.forEach(image => {
          imageNames.push({'imageName':image.imageName})
        });
      }
      res.render('manage', { title: 'Site Manager', editPanelImages:imageNames, gallerySelected:galleryName });
    }
    else {      
      res.redirect('/manage');
    }
  })
  
})

router.delete('/edit/delete', (req, res) => {
  const folderName = req.body.folderName
  const imageName = req.body.imageName
  // console.log(folderName + " / " + imageName)
  
  // read json and delete image from order
  readJson(filePath, (err, galleries) => {
    // console.log(galleries)
    var updatedGallery = function(arr, img, cb) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].imageName === img) {
          arr.splice(i, 1);
        }
      }      
      galleries[folderName] = arr;
      const storeData = (data) => {
        try {
          // overwrite order file
          fs.writeFileSync("public\\javascripts\\gallery.json", JSON.stringify(data));
          //delete file from images
          fs.unlinkSync(`public\\images\\${folderName}\\${imageName}`);
        } catch (err) {
          console.error(err)
        }
      }
      storeData(galleries)      
    }
    updatedGallery(galleries[folderName], imageName)
    
    
    res.send('File Deleted!')
  })
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
  
        res.redirect('/manage');
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