const mongodb = require("mongodb");
const {
  createProduct,
  fetchAll,
  findProductById,
  deleteProductById,
  Product,
} = require("../models/product");

const ObjectId = mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
    editing: "false",
  });
};

exports.getEditProduct = async (req, res, next) => {
  try {
    const editMode = req.query.edit === "true";
    const prodId = req.params.productId;
    console.log(prodId);
    const product = await Product.findById(prodId);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.render("admin/edit-product", {
      pageTitle: "Add product",
      path: "/admin/edit-product",
      product: product,
      editing: editMode,
    });
  } catch {
    return res.redirect("/");
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();

    res.render("admin/products", {
      pageTitle: "Admin products",
      prods: products,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.postEditProduct = async (req, res, next) => {
  try {
    const prodId = req.body.productId;

    const product = new Product(
      new ObjectId(prodId),
      req.body.title,
      req.body.price,
      req.body.description,
    );

    await product.save();

    res.redirect("/admin/products");
  } catch (err) {
    console.log(err);
  }
};

exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(title, price, description);
  product.save().then((res) => {
    console.log("Created product");
    res.redirect("/admin/products");
  });
};

exports.postDeleteProduct = async (req, res) => {
  const prodId = req.body.productId;
  await deleteProductById(prodId);
  res.redirect("/admin/products");
};
