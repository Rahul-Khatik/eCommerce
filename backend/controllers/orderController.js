const asyncHandler = require("../middlewares/asyncHandler");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Razorpay = require('razorpay');


// @desc   Create new order
// @route  POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  // console.log(req.cookies)
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc   Get logged in user orders
// @route  GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc   Get order by id
// @route  GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc   Update order to paid
// @route  PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  // console.log(req);
  const order = await Order.findById(req.params.id);
  // console.log(order);
  // console.log("done")
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    // order.paymentResult = {
    //   id: "1",
    //   status: "paid",
    //   update_time: Date.now(),
    //   // email_address: req.body.email_address,
    // };
    const updatedOrder = await order.save();
    for (let i = 0; i < order.orderItems.length; i++) {
      // console.log(order.orderItems[i].product)
      const product = await Product.findById(order.orderItems[i].product);
      product.countInStock = product.countInStock - order.orderItems[i].qty;
      // console.log(product.countInStock)
      await product.save();
    }

    res.status(200).json({ success: true, updatedOrder });
  } else {
    res.status(400);
    throw new Error("Order not found");
  }
});

// @desc   Update order to delivered
// @route  PUT /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

// @desc   Get all orders
// @route  GET /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.status(200).json(orders);
});

// @desc   clear all orders
// @route  DELETE /api/orders/clear
// @access Private/Admin
const clearOrders = asyncHandler(async (req, res) => {
  const orders = await Order.deleteMany({});
  res.status(200).json(orders);
});

module.exports = {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  clearOrders
};
