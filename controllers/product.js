const { createProduct, fetchAll } = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", { pageTitle: "add product" });
};

exports.postAddProduct = (req, res) => {
  const product = createProduct(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  const product = fetchAll();
  res.render("shop", { pageTitle: "shop", prods: product });
};
