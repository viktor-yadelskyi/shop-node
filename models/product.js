const fs = require("fs/promises");
const path = require("path");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json",
);

function createProduct(productData) {
  return {
    ...productData,
    async save() {
      let data = "";

      try {
        data = await fs.readFile(p, "utf-8");
      } catch {
        console.log("DATA ERROR");
      }
      let products = data ? JSON.parse(data) : [];

      const product = { ...this };
      delete product.save;
      // replace later for smt unique
      console.log("EDIT ID:", product.id);
      console.log(
        "EXISTING:",
        products.map((p) => p.id),
      );
      if (!product.id) {
        product.id = Math.random().toString();
        products.push(product);
      } else {
        const index = products.findIndex(
          (p) => String(p.id) === String(product.id),
        );

        if (index !== -1) {
          products[index] = product;
        } else {
          products.push(product);
        }
      }

      await fs.writeFile(p, JSON.stringify(products), "utf-8");
    },
  };
}

async function fetchAll() {
  try {
    const data = await fs.readFile(p, "utf-8");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error read or parsing JSON:", e);
    return [];
  }
}

async function findProductById(id) {
  try {
    const data = await fs.readFile(p, "utf-8");
    const products = data ? JSON.parse(data) : [];

    return (
      products.find((product) => String(product.id) === String(id)) || null
    );
  } catch (e) {
    console.error("Error read or parsing JSON:", e);
    return null;
  }
}

module.exports = {
  createProduct,
  fetchAll,
  findProductById,
};
