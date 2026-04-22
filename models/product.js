// const fs = require("fs/promises");
// const path = require("path");
// const crypto = require('crypto');

// const p = path.join(
//   path.dirname(require.main.filename),
//   "data",
//   "products.json",
// );

// function createProduct(productData) {
//   return {
//     ...productData,
//     async save() {
//       let data = "";

//       try {
//         data = await fs.readFile(p, "utf-8");
//       } catch {
//         console.log("DATA ERROR");
//       }
//       let products = data ? JSON.parse(data) : [];

//       const product = { ...this };
//       delete product.save;

//       if (!product.id) {
//         product.id = crypto.randomBytes(4).toString('hex');
//         products.push(product);
//       } else {
//         const index = products.findIndex(
//           (p) => String(p.id) === String(product.id),
//         );

//         if (index !== -1) {
//           products[index] = product;
//         } else {
//           products.push(product);
//         }
//       }

//       await fs.writeFile(p, JSON.stringify(products), "utf-8");
//     },
//   };
// }

// async function fetchAll() {
//   try {
//     const data = await fs.readFile(p, "utf-8");
//     return data ? JSON.parse(data) : [];
//   } catch (e) {
//     console.error("Error read or parsing JSON:", e);
//     return [];
//   }
// }

// async function findProductById(id) {
//   try {
//     const data = await fs.readFile(p, "utf-8");
//     const products = data ? JSON.parse(data) : [];

//     return (
//       products.find((product) => String(product.id) === String(id)) || null
//     );
//   } catch (e) {
//     console.error("Error read or parsing JSON:", e);
//     return null;
//   }
// }

// async function deleteProductById(id) {
//   try {
//     const data = await fs.readFile(p, "utf-8");
//     const products = data ? JSON.parse(data) : [];

//     const filteredProducts = products.filter(
//       (product) => String(product.id) !== String(id),
//     );

//     if (products.length !== filteredProducts.length) {
//       await fs.writeFile(p, JSON.stringify(filteredProducts), "utf-8");
//     }
//   } catch (e) {
//     console.error("Error read or parsing JSON:", e);
//   }
// }

const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
  constructor({ _id = null, title, price, description }) {
    this._id = _id ? new mongodb.ObjectId(_id) : null;
    this.title = title;
    this.price = price;
    this.description = description;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }

    return dbOp
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteById(prodId) {
    const db = getDb();
    db.collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then((result) => {
        console.log("Deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = {
  // createProduct,
  // fetchAll,
  // findProductById,
  // deleteProductById,
  Product,
};
