import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Paper,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container maxWidth="md">
      <FormContainer>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign In
        </Typography>

        <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
          <form onSubmit={submitHandler}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              disabled={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                mt: 3,
                mb: 2,
                "&:hover": {
                  backgroundColor: "#1976d2",
                },
              }}
              style={{ backgroundColor: "#b79cc5" }}
            >
              {isLoading ? (
                <CircularProgress size={24} />
              ) : (
                "Sign In"
              )}
            </Button>

            {isLoading && <Loader />}

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="body2">
                  New Customer?{" "}
                  <RouterLink
                    to={
                      redirect
                        ? `/register?redirect=${redirect}`
                        : "/register"
                    }
                  >
                    Register
                  </RouterLink>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </FormContainer>
    </Container>
  );
};

export default LoginScreen;
