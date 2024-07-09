import { useState, useEffect } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Grid, Link, CircularProgress, Box } from "@mui/material";
import FormContainer from "../components/FormContainer";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const [register] = useRegisterMutation();

  useEffect(() => {
    if (isLoading) setIsLoading(false);
  }, [isLoading]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const res = await register({ name, email, password }).unwrap();
      toast.success("Registration successful");
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>

      <form onSubmit={submitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          disabled={isLoading}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          style={{ backgroundColor: "#b79cc5" }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Register"}
        </Button>
      </form>

      <Box mt={2}>
        <Typography variant="body2" align="center">
          Already have an account?{" "}
          <Link component={RouterLink} to={`/login?redirect=${redirect}`} variant="body2">
            Sign in
          </Link>
        </Typography>
      </Box>
    </FormContainer>
  );
};

export default RegisterScreen;

