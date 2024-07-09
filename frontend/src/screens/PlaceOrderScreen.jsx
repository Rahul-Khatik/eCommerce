import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Grid, List, ListItem, ListItemText, Typography, Card, CardContent, CardMedia, Container, Box, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import Loader from "../components/Loader";
import { useCreateOrderMutation } from "../slices/orderApiSlice";
import { clearCartItems } from "../slices/cartSlice";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <Container>
      <CheckoutSteps step1 step2 step3 step4 />
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <List>
            <ListItem>
              <Typography variant="h6">Shipping</Typography>
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`${cart.shippingAddress.address}, ${cart.shippingAddress.city} ${cart.shippingAddress.postalCode}, ${cart.shippingAddress.country}`}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <Typography variant="h6">Payment Method</Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary={cart.paymentMethod} />
            </ListItem>
            <Divider />
            <ListItem>
              <Typography variant="h6">Order Items</Typography>
            </ListItem>
            {cart.cartItems.length === 0 ? (
              <ListItem>
                <Message>Your cart is empty</Message>
              </ListItem>
            ) : (
              <List>
                {cart.cartItems.map((item, index) => (
                  <ListItem key={index}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={2}>
                        <CardMedia
                          component="img"
                          image={item.image}
                          alt={item.name}
                          sx={{ borderRadius: 1 }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Link to={`/product/${item.product}`}>
                          <Typography variant="body1">{item.name}</Typography>
                        </Link>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="body2">
                          {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            )}
          </List>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">Order Summary</Typography>
              <Divider sx={{ my: 1 }} />
              <List>
                <ListItem>
                  <Grid container justifyContent="space-between">
                    <Typography variant="body2">Items</Typography>
                    <Typography variant="body2">₹{cart.itemsPrice}</Typography>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container justifyContent="space-between">
                    <Typography variant="body2">Shipping</Typography>
                    <Typography variant="body2">₹{cart.shippingPrice}</Typography>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container justifyContent="space-between">
                    <Typography variant="body2">Tax</Typography>
                    <Typography variant="body2">₹{cart.taxPrice}</Typography>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container justifyContent="space-between">
                    <Typography variant="body1" fontWeight="bold">Total</Typography>
                    <Typography variant="body1" fontWeight="bold">₹{cart.totalPrice}</Typography>
                  </Grid>
                </ListItem>
                {error && (
                  <ListItem>
                    <Message variant="danger">
                      {error.data.message || "An error occurred"}
                    </Message>
                  </ListItem>
                )}
                <ListItem>
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={cart.cartItems.length === 0}
                    onClick={placeOrderHandler}
                    sx={{ mt: 2, backgroundColor: "#b79cc5" }}
                    style={{ backgroundColor: "#b79cc5" }}
                  >
                    Place Order
                  </Button>
                  {isLoading && <Loader />}
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlaceOrderScreen;
