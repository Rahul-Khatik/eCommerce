import { useState, useEffect } from "react";
import { Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const [paymentMethod, setPaymentMethod] = useState("RazorPay");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <Container maxWidth="sm">
      <CheckoutSteps step1 step2 step3 />
      <Typography variant="h4" component="h1" gutterBottom>
        Payment Method
      </Typography>
      <Box component="form" onSubmit={submitHandler} sx={{ mt: 3 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Select Method</FormLabel>
          <RadioGroup
            aria-label="payment method"
            name="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}

          >
            <FormControlLabel
              value="RazorPay"
              control={<Radio />}
              label="RazorPay or Credit Card"
              defaultChecked={true}
            />
          </RadioGroup>
        </FormControl>
        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, backgroundColor: "#b79cc5" }} style={{ backgroundColor: "#b79cc5" }}>
          Continue
        </Button>
      </Box>
    </Container>
  );
};

export default PaymentScreen;

