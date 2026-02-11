const { createProduct } = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", { pageTitle: "Add product" });
};

exports.getProducts = (req, res, next) => {
  res.render("admin/products", { pageTitle: "Admin products" });
};

exports.postAddProduct = (req, res) => {
  const product = createProduct({ title: req.body.title });
  product.save();
  res.redirect("/shop/product-list");
};
