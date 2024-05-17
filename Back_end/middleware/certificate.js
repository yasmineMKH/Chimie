const multer = require("multer");

// Set up storage for uploaded files
const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./certificate/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Create the multer instance
const upload2 = multer({ storage: storage2 });

module.exports = certificate;
