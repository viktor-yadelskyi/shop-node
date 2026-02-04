const express = require("express");
const router = express.Router();

const productsController = require("../controllers/product");

router.get("/add-product", productsController.getAddProduct);
router.get("/products", productsController.getAdminProduct);

router.post("admin/add-product", productsController.postAddProduct);

module.exports = router;
