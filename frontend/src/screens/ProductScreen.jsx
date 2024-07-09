import { useState } from "react";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  CircularProgress,
  Link,
} from "@mui/material";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  let tempnumReviews = 0;
  if (product?.reviews.length === 0) {
    tempnumReviews = 0;
  }
  else {
    tempnumReviews = product?.numReviews;
  }
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <>
      <Button
        component={RouterLink}
        to="/"
        variant="contained"
        sx={{ my: 2, backgroundColor: "#b79cc5" }}
        type="submit"
        style={{ backgroundColor: "#b79cc5" }}
      >
        Go Back
      </Button>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
              <img src={product.image} alt={product.name} style={{ width: '100%' }} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h3">{product.name}</Typography>
                  <Rating value={product.rating} text={`${tempnumReviews} reviews`} />
                  <Typography variant="h5">Price: ₹{product.price}</Typography>
                  <Typography variant="body1">{product.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Price: ₹ {product.price}</Typography>
                  <Typography variant="h6">
                    Status: {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </Typography>
                  {product.countInStock > 0 && (
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Qty</InputLabel>
                      <Select
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <MenuItem key={x + 1} value={x + 1}>
                            {x + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant="contained"

                    style={{ backgroundColor: "#b79cc5" }}
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4">Reviews</Typography>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <Card>
                <CardContent>
                  <div>
                    <Typography variant="h5">Write a Customer Review</Typography>
                    {loadingProductReview && <CircularProgress />}
                    {userInfo ? (
                      <form onSubmit={submitHandler}>
                        <FormControl fullWidth margin="normal">
                          <InputLabel>Rating</InputLabel>
                          <Select
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            required
                          >
                            <MenuItem value="">Select...</MenuItem>
                            <MenuItem value="1">1 - Poor</MenuItem>
                            <MenuItem value="2">2 - Fair</MenuItem>
                            <MenuItem value="3">3 - Good</MenuItem>
                            <MenuItem value="4">4 - Very Good</MenuItem>
                            <MenuItem value="5">5 - Excellent</MenuItem>
                          </Select>
                        </FormControl>
                        <TextField
                          label="Comment"
                          multiline
                          rows={4}
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          required
                        />
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          style={{ backgroundColor: "#b79cc5" }}
                          disabled={loadingProductReview}
                        >
                          Submit
                        </Button>
                      </form>
                    ) : (
                      <Message>
                        Please <Link component={RouterLink} to="/login">sign in</Link> to write a review
                      </Message>
                    )}
                  </div>
                  {product.reviews.map((review) => (
                    <div key={review._id} style={{ marginBottom: '1rem' }}>
                      <Typography variant="h6">{review.name}</Typography>
                      <Rating value={review.rating} />
                      <Typography variant="body2">{review.createdAt.substring(0, 10)}</Typography>
                      <Typography variant="body1">{review.comment}</Typography>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default ProductScreen;
