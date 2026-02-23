const fs = require("fs/promises");
const path = require("path");

const p = path.join(
    path.dirname(require.main.filename), 
    "data", 
    "cart.json",
);

async function addProduct(id, productPrice) {
  let cart = { products: [], totalPrice: 0 };

  try {
    const fileContent = await fs.readFile(p, "utf-8");
    cart = fileContent ? JSON.parse(fileContent) : cart;
  } catch {
    // file not exists
  }

  const existingProductIndex = cart.products.findIndex(
    (prod) => prod.id === id,
  );

  const existingProduct = cart.products[existingProductIndex];
  let updatedProduct;

  if (existingProduct) {
    updatedProduct = { ...existingProduct };
    updatedProduct.qty = updatedProduct.qty + 1;
    cart.products = [...cart.products];
    cart.products[existingProductIndex] = updatedProduct;
  } else {
    updatedProduct = { id: id, qty: 1 };
    cart.products = [...cart.products, updatedProduct];
  }

  cart.totalPrice = cart.totalPrice + Number(productPrice);

  await fs.writeFile(p, JSON.stringify(cart), "utf-8");
}

module.exports = { addProduct };
