const products = require("../data/items");

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', { pageTitle: "add product",});
};

exports.postAddProduct = (req, res) => {
  products.push({ name: req.body.name });
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
// const products = items
  res.render("shop", { pageTitle: "shop", prods: products });
};
