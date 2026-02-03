const { createProduct, fetchAll } = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", { pageTitle: "add product" });
};

exports.postAddProduct = (req, res) => {
  const product = createProduct({title: req.body.title});
  product.save();
  res.redirect("/");
};

exports.getProducts = async (req, res, next) => {
  const products = await fetchAll();
  res.render("shop", { pageTitle: "shop", prods: products });
};
