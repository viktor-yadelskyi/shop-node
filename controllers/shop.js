const { fetchAll, findProductById } = require("../models/product");
const {
  addProduct,
  getCartData,
  deleteProductCartById,
} = require("../models/cart");

exports.getProductsList = async (req, res, next) => {
  const products = await fetchAll();
  res.render("shop/product-list", {
    pageTitle: "All products",
    path: "/products",
    prods: products,
  });
};

exports.getProduct = async (req, res, next) => {
  try {
    const prodId = req.params.id;
    const product = await findProductById(prodId);

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
  const products = await fetchAll();
  res.render("shop/index", {
    pageTitle: "Main Page",
    path: "/",
    prods: products,
  });
};

exports.getCart = async (req, res, next) => {
  const cart = await getCartData();
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Cart",
    products: cart.products,
    totalPrice: cart.totalPrice,
  });
};

exports.postCart = async (req, res, next) => {
  const prodId = req.body.prodId;
  const product = await findProductById(prodId);

  if (!product) {
    console.log("Product not found", prodId);
    return res.redirect("/cart");
  }

  await addProduct(prodId, product.price);

  res.redirect("/cart");
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
