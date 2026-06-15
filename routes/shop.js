const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop");

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProductsList);
router.get("/products/:id", shopController.getProduct);

router.get("/cart", shopController.getCart);
router.post("/cart", shopController.postCart);
router.post("/cart-delete-item", shopController.postCardDeleteProduct);

router.post("/create-order", shopController.postOrder);
router.get("/orders", shopController.getOrder);

module.exports = router;
