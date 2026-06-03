const { fetchAll, findProductById, Product } = require("../models/product");
const User = require("../models/user");

exports.getProductsList = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();

    res.render("shop/product-list", {
      pageTitle: "All products",
      path: "/products",
      prods: products,
    });
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const prodId = req.params.id;
    const product = await Product.findById(prodId);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.render("shop/product-detail", {
      product,
      pageTitle: product.title,
      path: "/products",
    });
  } catch (err) {
    next(err);
  }
};

exports.getIndex = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();

    res.render("shop/index", {
      pageTitle: "Main Page",
      path: "/",
      prods: products,
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const cart = await req.user.getCart();

    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Cart",
      products: cart.products,
      totalPrice: cart.totalPrice,
    });
  } catch (err) {
    next(err);
  }
};

exports.postCart = async (req, res, next) => {
  try {
    const prodId = req.body.prodId;
    console.log("prodId:", prodId);

    const product = await Product.findById(prodId);
    await req.user.addToCart(product);

    res.redirect("/cart");
  } catch (err) {
    next(err);
  }
};

exports.postCardDeleteProduct = async (req, res) => {
  const prodId = req.body.productId;
  await deleteProductCartById(prodId);

  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", { path: "/orders", pageTitle: "Your orders" });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", { path: "/checkout", pageTitle: "Cart" });
};
