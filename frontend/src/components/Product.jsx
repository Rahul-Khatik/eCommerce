// import React from 'react';
// import { Card } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import Rating from "./Rating";
// import '../assets/styles/products.css';

// const Product = ({ product }) => {
//   return (
//     <Card className="my-3 p-3 rounded product-card">
//       <Link to={`product/${product._id}`}>
//         <Card.Img src={product.image} variant="top" />
//       </Link>
//       <Card.Body>
//         <Link to={`product/${product._id}`}>
//           <Card.Title as="div" className="product-title">
//             <strong>{product.name}</strong>
//           </Card.Title>
//         </Link>

//         <Card.Text as="div" className="rating">
//           <Rating
//             value={product.rating}
//             text={`${product.numReviews} reviews`}
//           />
//         </Card.Text>

//         <Card.Text as="h3" className="product-price">$ {product.price}</Card.Text>
//       </Card.Body>
//     </Card>
//   );
// };

// export default Product;

import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { styled } from '@mui/system';
import { hostUrl } from '../constants';

const StyledCard = styled(Card)({
  backgroundColor: '#ebdfed',
  borderRadius: 15,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textDecoration: 'none',
  margin: '1rem 0.75rem',
  padding: '1rem',
});

const StyledCardMedia = styled(CardMedia)({
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
  maxHeight: 200,
  objectFit: 'cover',
});

const StyledTitle = styled(Typography)({
  color: '#333333',
  fontSize: '1.25rem',
  fontWeight: 'bold',
  marginBottom: 10,
});

const StyledPrice = styled(Typography)({
  color: '#b49ac1',
  fontSize: '1.5rem',
  fontWeight: 'bold',
});

const StyledRating = styled('div')({
  display: 'flex',
  alignItems: 'center',
  color: '#333333',
});

const StyledLink = styled(Link)({
  textDecoration: 'none',
});

const Product = ({ product }) => {
  return (
    <StyledCard sx={{ minHeight: 400 }}>
      <StyledLink to={`${hostUrl}/product/${product._id}`}>
        <CardActionArea>
          <StyledCardMedia
            component="img"
            image={product.image}
            alt={product.name}
          />
          <CardContent>
            <StyledTitle variant="h6">
              <strong>{product.name}</strong>
            </StyledTitle>
            <StyledRating>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </StyledRating>
            <StyledPrice variant="h5">
              ₹{product.price}
            </StyledPrice>
          </CardContent>
        </CardActionArea>
      </StyledLink>
    </StyledCard>
  );
};

export default Product;
