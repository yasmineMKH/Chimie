const multer = require("multer");

// Set up storage for uploaded files
const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./certificate/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Create the multer instance
const upload1 = multer({ storage: storage1 });

module.exports = certificate;
