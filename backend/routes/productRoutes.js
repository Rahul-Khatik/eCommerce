const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
  clearProductReviews
} = require("../controllers/productController");
const { protect, admin } = require("../middlewares/authMiddleware");
const checkObjectId = require("../middlewares/checkObjectId");

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(checkObjectId, getProductById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);
router.route("/:id/reviews").post(protect, checkObjectId, createProductReview);
router.route("/reviews/clear").delete(protect, admin, clearProductReviews);

module.exports = router;
