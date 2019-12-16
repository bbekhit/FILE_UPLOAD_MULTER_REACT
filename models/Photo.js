const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  path: {
    type: String
  },
  name: {
    type: String
  },
  productId: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Photo = mongoose.model("photo", PhotoSchema);
