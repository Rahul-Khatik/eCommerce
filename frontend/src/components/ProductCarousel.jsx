// import { Link } from "react-router-dom";
// import { Carousel, Image } from "react-bootstrap";
// import Loader from "./Loader";
// import Message from "./Message";
// import { useGetTopProductsQuery } from "../slices/productsApiSlice";

// const ProductCarousel = () => {
//   const { data: products, isLoading, error } = useGetTopProductsQuery();

//   return isLoading ? (
//     <Loader />
//   ) : error ? (
//     <Message variant="danger">{error?.data?.message || error.error}</Message>
//   ) : (
//     <Carousel pause="hover" className="bg-custom mb-4">
//       {products.map((product) => (
//         <Carousel.Item key={product._id}>
//           <Link to={`/product/${product._id}`}>
//             <Image src={product.image} alt={product.name} fluid />
//             <Carousel.Caption className="carousel-caption">
//               <h2 className="text-white text-right">
//                 {product.name} (${product.price})
//               </h2>
//             </Carousel.Caption>
//           </Link>
//         </Carousel.Item>
//       ))}
//     </Carousel>
//   );
// };

// export default ProductCarousel;


// import React from 'react';
// import { Link } from "react-router-dom";
// import Carousel from 'react-material-ui-carousel';
// import { Paper, Typography, CircularProgress, Alert } from '@mui/material';
// import { useGetTopProductsQuery } from "../slices/productsApiSlice";

// const ProductCarousel = () => {
//   const { data: products, isLoading, error } = useGetTopProductsQuery();

//   if (isLoading) {
//     return <CircularProgress />;
//   }

//   if (error) {
//     return <Alert severity="error">{error?.data?.message || error.error}</Alert>;
//   }

//   return (
//     <Carousel indicators={false} autoPlay={false} navButtonsAlwaysVisible>
//       {products.map((product) => (
//         <Paper
//           key={product._id}
//           elevation={3}
//           style={{ marginBottom: '1rem', backgroundColor: '#ebdfed', borderRadius: '15px' }}
//         >
//           <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//             <img
//               src={product.image}
//               alt={product.name}
//               style={{ width: '100%', borderTopLeftRadius: '15px', borderTopRightRadius: '15px', maxHeight: '300px', objectFit: 'cover' }}
//             />
//             <Typography variant="h5" align="right" style={{ color: '#333333', padding: '10px' }}>
//               {product.name} (${product.price})
//             </Typography>
//           </Link>
//         </Paper>
//       ))}
//     </Carousel>
//   );
// };

// export default ProductCarousel;

import React from 'react';
import { Link } from "react-router-dom";
import Carousel from 'react-material-ui-carousel';
import { Paper, Typography, CircularProgress, Alert } from '@mui/material';
import { useGetTopProductsQuery } from "../slices/productsApiSlice";


const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error?.data?.message || error.error}</Alert>;
  }

  return (
    <Carousel indicators={false} autoPlay={true} interval={5000} navButtonsAlwaysVisible>
      {products.map((product) => (
        <Paper
          key={product._id}
          elevation={3}
          style={{ marginBottom: '1rem', backgroundColor: '#ebdfed', borderRadius: '15px', minHeight: '355px' }}
        >
          <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div align="center">
              <img
                src={product.image}
                alt={product.name}
                style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px', maxHeight: '300px', objectFit: 'cover' }}
              />
            </div>
            <Typography variant="h5" align="center" style={{ color: '#333333', padding: '10px' }}>
              {product.name} (₹{product.price})
            </Typography>
          </Link>
        </Paper>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
