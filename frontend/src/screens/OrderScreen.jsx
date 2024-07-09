import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Container
} from "@mui/material";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
} from "../slices/orderApiSlice";
import axios from 'axios';

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const handlePayment = async () => {
    try {
      const amount = parseInt(order?.totalPrice);
      const orderResponse = await axios.post(`/api/payment/checkout`, { order });
      const ordrid = order._id;

      const options = {
        key: orderResponse.data.key_id,
        amount: amount * 100,
        currency: "INR",
        name: "Shivang Kacha",
        description: "Test Transaction",
        image: "",
        order_id: orderResponse.data.id,
        handler: async function (response) {
          const paymentData = {
            paymentId: response.razorpay_payment_id,
            orderID: response.razorpay_order_id,
            signature: response.razorpay_signature,
            amount: amount,
          }
          const ver = await axios.post(`/api/payment/verify`, { paymentData, ordrid });
          console.log(ver);
          // onApprove();
          refetch();
        },
        prefill: {
          name: "Shivang Kacha",
          email: "shivangkachasbk9@gmail.com",
          contact: "8160004051"
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#000000"
        }
      };
      var razor = new window.Razorpay(options);
      razor.open();

    }
    catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  const { isPending } = { isPending: false };
  const { userInfo } = useSelector((state) => state.auth);

  async function onApprove(data, actions) {
    const ordrid = order?._id;
    try {
      await payOrder({ ordrid });
      refetch();
      toast.success("Order is paid");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  async function onPaid(ordrid, data) {
    try {
      await payOrder({});
      refetch();
      toast.success("Order is paid");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success("Order is paid");
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order delivered!");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <Container>
      <Typography sx={{ wordWrap: 'break-word' }} variant="h4" style={{ fontWeight: "bold", marginBottom: "20px" }}>
        Order: {order._id}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" style={{ fontWeight: "bold", marginBottom: "10px" }}>Shipping</Typography>
              <Typography style={{ marginBottom: "10px" }}>
                <strong>Name:</strong> {order.user.name}
              </Typography>
              <Typography style={{ marginBottom: "10px" }}>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </Typography>
              <Typography style={{ marginBottom: "10px" }}>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </Typography>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="error">Not Delivered</Message>
              )}
            </CardContent>
          </Card>

          <Card style={{ marginTop: "20px" }}>
            <CardContent>
              <Typography variant="h5" style={{ fontWeight: "bold", marginBottom: "10px" }}>Payment Method</Typography>
              <Typography style={{ marginBottom: "10px" }}>
                <strong>Method:</strong> {order.paymentMethod}
              </Typography>
              {order.isPaid ? (
                <>
                  <Typography style={{ marginBottom: "10px" }}>
                    <strong>Payment Id:</strong> {order?.Razorpay?.paymentId}
                  </Typography>
                  <Message variant="success">Paid on {order.paidAt}</Message>
                </>
              ) : (
                <Message variant="error">Not Paid</Message>
              )}
            </CardContent>
          </Card>

          <Card style={{ marginTop: "20px" }}>
            <CardContent>
              <Typography variant="h6" style={{ marginBottom: "10px" }}>Order Items</Typography>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <List>
                  {order.orderItems.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemAvatar>
                        <Avatar src={item.image} alt={item.name} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        }
                        secondary={`${item.qty} x ₹${item.price} = ₹${item.qty * item.price}`}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" style={{ marginBottom: "10px" }}>Order Summary</Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Items" />
                  <Typography>₹{order.itemsPrice}</Typography>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Shipping" />
                  <Typography>₹{order.shippingPrice}</Typography>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Tax" />
                  <Typography>₹{order.taxPrice}</Typography>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Total" />
                  <Typography>₹{order.totalPrice}</Typography>
                </ListItem>
              </List>
              {!order.isPaid && (
                <Box mt={2}>
                  {loadingPay && <CircularProgress />}
                  {isPending ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={handlePayment}
                      style={{ backgroundColor: "#b79cc5", color: "#fff" }}
                    >
                      Pay
                    </Button>
                  )}
                </Box>
              )}
              {loadingDeliver && <CircularProgress />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={deliverOrderHandler}
                      style={{ backgroundColor: "#b79cc5", color: "#fff" }}
                    >
                      Mark as Delivered
                    </Button>
                  </Box>
                )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderScreen;
