const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((item) => {
      return item.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    const myCart = {
      items: updatedCartItems,
    };

    const db = getDb();
    return db
      .collection("users")
      .updateOne({ _id: new ObjectId(this._id) }, { $set: { cart: myCart } });
  }

  deleteFromCart(prodId) {
    const updatedCartItems = this.cart.items.filter(
      (item) => item.productId.toString() !== prodId.toString(),
    );

    const db = getDb();
    return db.collection("users").updateOne(
      {
        _id: new ObjectId(this._id),
      },
      {
        $set: { cart: { items: updatedCartItems } },
      },
    );
  }

  async getCart() {
    const productIds = this.cart.items.map((item) => item.productId);

    const products = await getDb()
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray();

    const cartProducts = products.map((product) => {
      const cartItem = this.cart.items.find(
        (item) => item.productId.toString() === product._id.toString(),
      );

      return {
        ...product,
        quantity: cartItem.quantity,
        itemTotal: product.price * cartItem.quantity,
      };
    });

    const totalPrice = cartProducts.reduce(
      (sum, item) => sum + item.itemTotal,
      0,
    );

    return {
      products: cartProducts,
      totalPrice,
    };
  }

  save() {
    const db = getDb();

    return db.collection("users").insertOne(this);
  }

  static findById(userId) {
    const db = getDb();

    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
