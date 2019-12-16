const Photo = require("../models/Photo");

exports.uploadPhoto = async (req, res) => {
  try {
    let path;
    if (req.file) {
      path = req.file.path;
    }
    let photo = await new Photo({
      path,
      productId: req.params.id
    });
    await photo.save();
    res.json(photo);
  } catch (error) {
    res.status(400).send(error.response);
  }
};

exports.getPhotos = async (req, res) => {
  try {
    let photos = await Photo.find({ productId: req.params.productId });
    res.json(photos);
  } catch (error) {
    res.status(400).send(error);
  }
};
