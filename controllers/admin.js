const {
  createProduct,
  fetchAll,
  findProductById,
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

exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const product = createProduct({ title, price, description });
  product.save();
  res.redirect("/");
};
