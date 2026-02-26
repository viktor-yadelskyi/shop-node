const {
  createProduct,
  fetchAll,
  findProductById,
  deleteProductById,
} = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
    editing: "false",
  });
};

exports.getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit === "true";
  const prodId = req.params.productId;
  const product = await findProductById(prodId);
  console.log(product);

  // replace to error page later
  if (!product) {
    return res.redirect("/");
  }

  res.render("admin/edit-product", {
    pageTitle: "Add product",
    path: "/admin/edit-product",
    product: product,
    editing: editMode,
  });
};

exports.getProducts = async (req, res, next) => {
  const products = await fetchAll();

  res.render("admin/products", {
    pageTitle: "Admin products",
    prods: products,
  });
};

exports.postEditProduct = async (req, res, next) => {
  const prodId = req.body.productId;

  const updatedProduct = createProduct({
    id: prodId,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
  });

  await updatedProduct.save();
  res.redirect("/admin/products");
};

exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const product = createProduct({ title, price, description });
  product.save();
  res.redirect("/");
};

exports.postDeleteProduct = async(req, res) => {
  const prodId = req.body.productId;
  await deleteProductById(prodId);
  res.redirect("/admin/products");
};
