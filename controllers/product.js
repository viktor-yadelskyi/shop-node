const { createProduct, fetchAll } = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", { pageTitle: "Add product" });
};

exports.getAdminProduct = (req, res, next) => {
  res.render("admin/products", { pageTitle: "Admin products" });
};

exports.postAddProduct = (req, res) => {
  const product = createProduct({ title: req.body.title });
  product.save();
  res.redirect("/shop/product-list");
};

exports.getMainPage = (req, res, next) => {
  res.render("shop/index", { pageTitle: "Main page" });
};

exports.getProductsList = async (req, res, next) => {
  const products = await fetchAll();
  res.render("shop/product-list", { pageTitle: "Product list", prods: products });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", { pageTitle: "Cart" });
};
