// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Form, Button } from "react-bootstrap";
// import Message from "../../components/Message";
// import Loader from "../../components/Loader";
// import FormContainer from "../../components/FormContainer";
// import { toast } from "react-toastify";
// import { useParams } from "react-router-dom";
// import {
//   useGetUserDetailsQuery,
//   useUpdateUserMutation,
// } from "../../slices/usersApiSlice";

// const UserEditScreen = () => {
//   const { id: userId } = useParams();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [isAdmin, setIsAdmin] = useState(false);

//   const {
//     data: user,
//     isLoading,
//     error,
//     refetch,
//   } = useGetUserDetailsQuery(userId);

//   const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

//   const navigate = useNavigate();

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       await updateUser({ userId, name, email, isAdmin });
//       toast.success("user updated successfully");
//       refetch();
//       navigate("/admin/userlist");
//     } catch (err) {
//       toast.error(err?.data?.message || err.error);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       setName(user.name);
//       setEmail(user.email);
//       setIsAdmin(user.isAdmin);
//     }
//   }, [user]);

//   return (
//     <>
//       <Link to="/admin/userlist" className="btn btn-light my-3">
//         Go Back
//       </Link>
//       <FormContainer>
//         <h1>Edit User</h1>
//         {loadingUpdate && <Loader />}
//         {isLoading ? (
//           <Loader />
//         ) : error ? (
//           <Message variant="danger">
//             {error?.data?.message || error.error}
//           </Message>
//         ) : (
//           <Form onSubmit={submitHandler}>
//             <Form.Group className="mt-2" controlId="name">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="name"
//                 placeholder="Enter name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               ></Form.Control>
//             </Form.Group>

//             <Form.Group className="mt-2" controlId="email">
//               <Form.Label>Email Address</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               ></Form.Control>
//             </Form.Group>

//             <Form.Group className="mt-2" controlId="isadmin">
//               <Form.Check
//                 type="checkbox"
//                 label="Is Admin"
//                 checked={isAdmin}
//                 onChange={(e) => setIsAdmin(e.target.checked)}
//               ></Form.Check>
//             </Form.Group>

//             <Button type="submit" variant="primary" className="mt-3">
//               Update
//             </Button>
//           </Form>
//         )}
//       </FormContainer>
//     </>
//   );
// };

// export default UserEditScreen;

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { toast } from "react-toastify";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: user, isLoading, error, refetch } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success("User updated successfully");
      refetch();
      navigate("/admin/userlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  return (
    <>
      <Button component={Link} to="/admin/userlist" variant="contained" sx={{ mb: 3 }} style={{ backgroundColor: "#b79cc5" }}>
        Go Back
      </Button>
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom >
          Edit User
        </Typography>
        {loadingUpdate && <CircularProgress />}
        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error?.data?.message || error.error}</Alert>
        ) : (
          <form onSubmit={submitHandler}>
            <TextField
              margin="normal"
              fullWidth
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Email Address"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  color="primary"
                />
              }
              label="Is Admin"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} style={{ backgroundColor: "#b79cc5" }}>
              Update
            </Button>
          </form>
        )}
      </Container>
    </>
  );
};

export default UserEditScreen;
