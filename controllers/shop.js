const { fetchAll, findProductById } = require("../models/product");

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

  const product = await findProductById(prodId);
  console.log(product);

  if (!product) {
    return res.status(404).send("Product not found");
  }

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
