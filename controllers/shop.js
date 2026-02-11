const { fetchAll } = require("../models/product");

exports.getProductsList = async (req, res, next) => {
  const products = await fetchAll();
  res.render("shop/product-list", {
    pageTitle: "All products",
    path: "/products",
    prods: products,
  });
};

exports.getIndex = async (req, res, next) => {
  const products = await fetchAll();
  res.render("shop/index", {
    pageTitle: "Main Page",
    path: "/",
    prods: products,
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", { pageTitle: "Cart" });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", { path: "/checkout", pageTitle: "Cart" });
};
