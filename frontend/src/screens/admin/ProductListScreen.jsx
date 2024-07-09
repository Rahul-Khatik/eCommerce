// import { LinkContainer } from "react-router-bootstrap";
// import { Table, Button, Row, Col } from "react-bootstrap";
// import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
// import { useParams } from "react-router-dom";
// import Message from "../../components/Message";
// import Loader from "../../components/Loader";
// import Paginate from "../../components/Paginate";
// import { toast } from "react-toastify";
// import {
//   useGetProductsQuery,
//   useCreateProductMutation,
//   useDeleteProductMutation,
// } from "../../slices/productsApiSlice";

// const ProductListScreen = () => {
//   const { pageNumber } = useParams();
//   const { data, isLoading, error, refetch } = useGetProductsQuery({
//     pageNumber,
//   });

//   const [createProduct, { isLoading: loadingCreate }] =
//     useCreateProductMutation();

//   const [deleteProduct, { isLoading: loadingDelete }] =
//     useDeleteProductMutation();

//   const deleteHandler = async (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         await deleteProduct(id);
//         toast.success("Product deleted!");
//         refetch();
//       } catch (err) {
//         toast.error(err?.data?.message || err.error);
//       }
//     }
//   };

//   const createProductHandler = async () => {
//     if (window.confirm("Are you sure you want to create a new product?")) {
//       try {
//         await createProduct();
//         refetch();
//       } catch (err) {
//         toast.error(err?.data?.message || err.error);
//       }
//     }
//   };

//   return (
//     <>
//       <Row className="align-items-center">
//         <Col>
//           <h1>Products</h1>
//         </Col>
//         <Col className="text-end">
//           <Button className="btn-sm m-3" onClick={createProductHandler}>
//             <FaPlus /> Create Product
//           </Button>
//         </Col>
//       </Row>

//       {loadingCreate && <Loader />}
//       {loadingDelete && <Loader />}
//       {isLoading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">{error?.data?.message}</Message>
//       ) : (
//         <>
//           <Table striped bordered hover responsive className="table-sm">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Price</th>
//                 <th>Category</th>
//                 <th>Brand</th>
//                 <th></th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.products.map((product) => (
//                 <tr key={product._id}>
//                   <td>{product._id}</td>
//                   <td>{product.name}</td>
//                   <td>${product.price}</td>
//                   <td>{product.category}</td>
//                   <td>{product.brand}</td>
//                   <td>
//                     <LinkContainer to={`/admin/product/${product._id}/edit`}>
//                       <Button variant="light" className="btn-sm mx-2">
//                         <FaEdit />
//                       </Button>
//                     </LinkContainer>
//                     <Button
//                       variant="danger"
//                       className="btn-sm"
//                       onClick={() => deleteHandler(product._id)}
//                     >
//                       <FaTrash style={{ color: "white" }} />
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//           <Paginate pages={data.pages} page={data.page} isAdmin={true} />
//         </>
//       )}
//     </>
//   );
// };

// export default ProductListScreen;

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Alert,
  IconButton,
  Grid,
} from '@mui/material';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useClearProductReviewsMutation,
} from '../../slices/productsApiSlice';

const ProductListScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
  const [clearProductReviews] = useClearProductReviewsMutation();
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        toast.success('Product deleted!');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteReviews = async () => {
    if (window.confirm('Are you sure you want to delete all reviews?')) {
      try {
        await clearProductReviews();
        toast.success('All reviews deleted!');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  }
  // console.log(data?.pages, data?.page)
  return (
    <Container>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ my: 3 }}>
        <Grid item>
          <Typography variant="h4" component="h1">
            Products
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={createProductHandler} sx={{ backgroundColor: "#b79cc5" }}>
            <FaPlus /> Create Product
          </Button>
          {/* //delete all reviews */}
          <Button onClick={deleteReviews} variant="contained" color="error" sx={{ ml: 2 }}>
            <FaTrash /> Delete All Reviews
          </Button>
        </Grid>
      </Grid>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message}</Message>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Brand</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product._id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>₹{product.price}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>
                      <Button
                        component={Link}
                        to={`/admin/product/${product._id}/edit`}
                        variant="contained"
                        color="info"
                        size="small"
                        startIcon={<FaEdit />}
                        sx={{ mr: 1, backgroundColor: "#b79cc5" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<FaTrash />}
                        onClick={() => deleteHandler(product._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Paginate pages={data?.pages} page={data?.page} isAdmin={true} />

        </>
      )}
    </Container>
  );
};

export default ProductListScreen;
