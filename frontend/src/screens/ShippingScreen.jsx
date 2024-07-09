import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <Container maxWidth="sm">
      <CheckoutSteps step1 step2 />
      <Typography variant="h4" component="h1" gutterBottom>
        Shipping
      </Typography>
      <Box component="form" onSubmit={submitHandler} sx={{ mt: 3 }}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="address"
          label="Address"
          name="address"
          autoComplete="address"
          autoFocus
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="city"
          label="City"
          name="city"
          autoComplete="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="postalCode"
          label="Postal Code"
          name="postalCode"
          autoComplete="postal-code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="country"
          label="Country"
          name="country"
          autoComplete="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2, backgroundColor: "#b79cc5" }}
          style={{ backgroundColor: "#b79cc5" }}
        >
          Continue
        </Button>
      </Box>
    </Container>
  );
};

export default ShippingScreen;
