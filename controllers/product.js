const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  try {
    let product = await new Product(req.body);
    await product.save();
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Server error" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    let products = await Product.find();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Server error" });
  }
};
