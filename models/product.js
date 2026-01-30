const products = [];

function createProduct(title) {
  return {
    title,
    save() {
      products.push(this);
    }
  };
}

function fetchAll() {
  return products;
}

module.exports = {
  createProduct,
  fetchAll
};