const express = require("express");
const router = express.Router();

const {
    checkout,
    verifyPayment
} = require("../controllers/paymentController");
const { protect, admin } = require("../middlewares/authMiddleware");

router.route("/checkout").post(checkout);
router.route("/verify").post(verifyPayment);

module.exports = router;