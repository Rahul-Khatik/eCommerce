// import { LinkContainer } from "react-router-bootstrap";
// import { Table, Button } from "react-bootstrap";
// import { FaTimes } from "react-icons/fa";
// import Message from "../../components/Message";
// import Loader from "../../components/Loader";
// import { useGetOrdersQuery } from "../../slices/orderApiSlice";

// const OrderListScreen = () => {
//   const { data: orders, isLoading, error } = useGetOrdersQuery();

//   return (
//     <>
//       <h1>Orders</h1>
//       {isLoading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">
//           {error?.data?.message || error.error}
//         </Message>
//       ) : (
//         <Table striped hover responsive className="table-sm">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>USER</th>
//               <th>DATE</th>
//               <th>TOTAL</th>
//               <th>PAID</th>
//               <th>DELIVERED</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id}>
//                 <td>{order._id}</td>
//                 <td>{order.user && order.user.name}</td>
//                 <td>{order.createdAt.substring(0, 10)}</td>
//                 <td>${order.totalPrice}</td>
//                 <td>
//                   {order.isPaid ? (
//                     order.paidAt.substring(0, 10)
//                   ) : (
//                     <FaTimes style={{ color: "red" }} />
//                   )}
//                 </td>
//                 <td>
//                   {order.isDelivered ? (
//                     order.deliveredAt.substring(0, 10)
//                   ) : (
//                     <FaTimes style={{ color: "red" }} />
//                   )}
//                 </td>
//                 <td>
//                   <LinkContainer to={`/order/${order._id}`}>
//                     <Button variant="light" className="btn-sm">
//                       Details
//                     </Button>
//                   </LinkContainer>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </>
//   );
// };

// export default OrderListScreen;

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
} from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import { useGetOrdersQuery } from '../../slices/orderApiSlice';

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Orders
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">
          {error?.data?.message || error.error}
        </Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>USER</TableCell>
                <TableCell>DATE</TableCell>
                <TableCell>TOTAL</TableCell>
                <TableCell>PAID</TableCell>
                <TableCell>DELIVERED</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((order) => (
                <TableRow key={order?._id}>
                  <TableCell>{order?._id}</TableCell>
                  <TableCell>{order?.user && order?.user.name}</TableCell>
                  <TableCell>{order?.createdAt.substring(0, 10)}</TableCell>
                  <TableCell>${order?.totalPrice}</TableCell>
                  <TableCell>
                    {order?.isPaid ? (
                      order?.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </TableCell>
                  <TableCell>
                    {order?.isDelivered ? (
                      order?.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      component={Link}
                      to={`/order/${order?._id}`}
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{backgroundColor:"#b79cc5"}}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default OrderListScreen;
