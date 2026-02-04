const express = require("express");
const router = express.Router();

const productsController = require("../controllers/product");

router.get("/", productsController.getMainPage);
router.get("/products", productsController.getProductsList);
router.get("/cart", productsController.getCart);

module.exports = router;
