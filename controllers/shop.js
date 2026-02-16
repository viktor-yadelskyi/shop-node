const { fetchAll } = require("../models/product");

exports.getProductsList = async (req, res, next) => {
  const products = await fetchAll();
  res.render("shop/product-list", {
    pageTitle: "All products",
    path: "/products",
    prods: products,
  });
};

exports.getProduct = async (req, res, next) => {
  const prodId = req.params.id;
  console.log(prodId);
  res.redirect("/");
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
  res.render("shop/cart", { path: "/cart", pageTitle: "Cart" });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", { path: "/orders", pageTitle: "Your orders" });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", { path: "/checkout", pageTitle: "Cart" });
};
