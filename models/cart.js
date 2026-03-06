const fs = require("fs/promises");
const path = require("path");
const { fetchAll } = require("./product");

const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

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
    updatedProduct = { ...existingProduct, price: Number(productPrice) };
    updatedProduct.qty = updatedProduct.qty + 1;
    cart.products = [...cart.products];
    cart.products[existingProductIndex] = updatedProduct;
  } else {
    updatedProduct = { id: id, qty: 1, price: Number(productPrice) };
    cart.products = [...cart.products, updatedProduct];
  }

  cart.totalPrice = cart.totalPrice + Number(productPrice);

  await fs.writeFile(p, JSON.stringify(cart), "utf-8");
}

async function getCartData() {
  const cartItems = await fs.readFile(p, "utf-8");
  const cart = JSON.parse(cartItems);
  const allProducts = await fetchAll();

  const parsedData = cart.products.map((item) => {
    const product = allProducts.find((p) => p.id === item.id);
    if (product) {
      return { ...product, qty: item.qty };
    }
    return null;
  });

  return {
    products: parsedData.filter((item) => item !== null),
    totalPrice: cart.totalPrice,
  };
}

async function deleteProductCartById(id) {
  try {
    const data = await fs.readFile(p, "utf-8");
    const cart = data ? JSON.parse(data) : [];

    const filteredProducts = cart.products.filter(
      (product) => String(product.id) !== String(id),
    );

    if (cart.products.length !== filteredProducts.length) {
      cart.products = filteredProducts;
      cart.totalPrice = filteredProducts.reduce(
        (sum, item) => sum + item.price * item.qty,
        0,
      );

      await fs.writeFile(p, JSON.stringify(cart), "utf-8");
    }
  } catch (e) {
    console.error("Error read or parsing JSON:", e);
  }
}

module.exports = { addProduct, getCartData, deleteProductCartById };
