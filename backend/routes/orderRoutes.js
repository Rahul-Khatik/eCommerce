const express = require("express");
const router = express.Router();
const {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  clearOrders
} = require("../controllers/orderController");
const { protect, admin } = require("../middlewares/authMiddleware");

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid)
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);
router.route("/clear").delete(protect, admin, clearOrders);

module.exports = router;
