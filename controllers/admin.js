const {
  createProduct,
  fetchAll,
  findProductById,
  deleteProductById,
  Product,
} = require("../models/product");

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
    const product = new Product({
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      _id: req.body.productId,
    });

    await product.save();

    res.redirect("/admin/products");
  } catch (err) {
    console.log(err);
  }
};

exports.postAddProduct = async (req, res) => {
  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
  });
  try {
    await product.save();
    console.log("Created product");
    res.redirect("/admin/products");
  } catch {
    console.log("Post add product error");
  }
};

exports.postDeleteProduct = async (req, res) => {
  const prodId = req.body.productId;
  await Product.deleteById(prodId);
  res.redirect("/admin/products");
};
