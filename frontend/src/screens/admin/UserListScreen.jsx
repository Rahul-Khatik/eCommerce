// import React from "react";
// import { LinkContainer } from "react-router-bootstrap";
// import { Table, Button } from "react-bootstrap";
// import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
// import Message from "../../components/Message";
// import Loader from "../../components/Loader";
// import {
//   useGetUsersQuery,
//   useDeleteUserMutation,
// } from "../../slices/usersApiSlice";
// import { toast } from "react-toastify";

// const UserListScreen = () => {
//   const { data: users, refetch, isLoading, error } = useGetUsersQuery();

//   const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

//   const deleteHandler = async (id) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       try {
//         await deleteUser(id);
//         refetch();
//       } catch (err) {
//         toast.error(err?.data?.message || err.error);
//       }
//     }
//   };

//   return (
//     <>
//       <h1>Users</h1>
//       {loadingDelete && <Loader />}
//       {isLoading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">
//           {error?.data?.message || error.error}
//         </Message>
//       ) : (
//         <Table striped bordered hover responsive className="table-sm">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>NAME</th>
//               <th>EMAIL</th>
//               <th>ADMIN</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id}>
//                 <td>{user._id}</td>
//                 <td>{user.name}</td>
//                 <td>
//                   <a href={`mailto:${user.email}`}>{user.email}</a>
//                 </td>
//                 <td>
//                   {user.isAdmin ? (
//                     <FaCheck style={{ color: "green" }} />
//                   ) : (
//                     <FaTimes style={{ color: "red" }} />
//                   )}
//                 </td>
//                 <td>
//                   {!user.isAdmin && (
//                     <>
//                       <LinkContainer
//                         to={`/admin/user/${user._id}/edit`}
//                         style={{ marginRight: "10px" }}
//                       >
//                         <Button variant="light" className="btn-sm">
//                           <FaEdit />
//                         </Button>
//                       </LinkContainer>
//                       <Button
//                         variant="danger"
//                         className="btn-sm"
//                         onClick={() => deleteHandler(user._id)}
//                       >
//                         <FaTrash style={{ color: "white" }} />
//                       </Button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </>
//   );
// };

// export default UserListScreen;

import React from "react";
import { Link } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
  CircularProgress,
  Typography,
  Paper,
} from "@mui/material";
import { Edit as EditIcon, Check as CheckIcon, Close as CloseIcon, Delete as DeleteIcon } from "@mui/icons-material";
import Message from "../../components/Message";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";
import { toast } from "react-toastify";

const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Users
      </Typography>
      {loadingDelete && <CircularProgress />}
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>NAME</TableCell>
                <TableCell>EMAIL</TableCell>
                <TableCell>ADMIN</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </TableCell>
                  <TableCell>
                    {user.isAdmin ? (
                      <CheckIcon style={{ color: "green" }} />
                    ) : (
                      <CloseIcon style={{ color: "red" }} />
                    )}
                  </TableCell>
                  <TableCell>
                    {!user.isAdmin && (
                      <>
                        <IconButton
                          component={Link}
                          to={`/admin/user/${user._id}/edit`}
                          color="primary"
                          size="small"
                          sx={{ marginRight: 1 }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          size="small"
                          onClick={() => deleteHandler(user._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default UserListScreen;
