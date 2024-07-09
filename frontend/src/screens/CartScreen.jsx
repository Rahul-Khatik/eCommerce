import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Select,
  MenuItem,
  IconButton,
  Link,
} from "@mui/material";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../slices/cartSlice";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
  };

  const removeFromCartHandler = async (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const checkOutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Typography variant="h4" gutterBottom>
          Shopping Cart
        </Typography>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is Empty{" "}
            <Link component={RouterLink} to="/" variant="button">
              Go Back
            </Link>
          </Message>
        ) : (
          cartItems.map((item) => (
            <Card key={item._id} variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={2}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "100%", borderRadius: "8px" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Link
                      component={RouterLink}
                      to={`/product/${item._id}`}
                      variant="body1"
                    >
                      {item.name}
                    </Link>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Typography variant="body1">₹{item.price}</Typography>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Select
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                      fullWidth
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <MenuItem key={x + 1} value={x + 1}>
                          {x + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <IconButton
                      onClick={() => removeFromCartHandler(item._id)}
                      color="secondary"
                    >
                      <FaTrash />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))
        )}
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5">
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              Items
            </Typography>
            <Typography variant="h6">
              ₹
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              fullWidth
              disabled={cartItems.length === 0}
              onClick={checkOutHandler}
              style={{ backgroundColor: "#b79cc5" }}
            >
              Proceed to Checkout
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CartScreen;
