const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadPhoto, getPhotos } = require("../controllers/photo");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${+new Date()}.jpg`);
  }
});
const upload = multer({
  storage
});

router.post("/upload/:id", upload.single("file"), uploadPhoto);
router.get("/all/:productId", getPhotos);

module.exports = router;
