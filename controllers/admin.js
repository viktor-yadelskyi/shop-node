const { createProduct, fetchAll } = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", { pageTitle: "Add product" });
};

exports.getProducts = async (req, res, next) => {
  const products = await fetchAll();

  res.render("admin/products", {
    pageTitle: "Admin products",
    prods: products,
  });
};

exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const product = createProduct({ title, price, description });
  product.save();
  res.redirect("/");
};
