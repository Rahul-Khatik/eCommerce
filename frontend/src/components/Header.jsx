// import { useNavigate } from "react-router-dom";
// import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
// import { FaShoppingCart, FaUser } from "react-icons/fa";
// import { LinkContainer } from "react-router-bootstrap";
// import { useSelector, useDispatch } from "react-redux";
// import { useLogoutMutation } from "../slices/usersApiSlice";
// import { logout } from "../slices/authSlice";
// import SearchBox from "./SearchBox";
// import logo from "../assets/logo.jpg";
// import { resetCart } from "../slices/cartSlice";

// const Header = () => {
//   const { cartItems } = useSelector((state) => state.cart);
//   const { userInfo } = useSelector((state) => state.auth);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [logoutApiCall] = useLogoutMutation();

//   const logoutHandler = async () => {
//     try {
//       await logoutApiCall().unwrap();
//       dispatch(logout());
//       dispatch(resetCart());
//       navigate("/login");
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   return (
//     <header>
//       <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
//         <Container>
//           <LinkContainer to="/">
//             <Navbar.Brand>
//               <img src={logo} alt="Embellish" height="50 px" />
//               Embellish
//             </Navbar.Brand>
//           </LinkContainer>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="ms-auto">
//               <SearchBox />
//               <LinkContainer to="/cart">
//                 <Nav.Link>
//                   <FaShoppingCart /> Cart
//                   {cartItems.length > 0 && (
//                     <Badge pill bg="success" className="ms-1">
//                       {cartItems.reduce((acc, item) => acc + item.qty, 0)}
//                     </Badge>
//                   )}
//                 </Nav.Link>
//               </LinkContainer>
//               {userInfo ? (
//                 <NavDropdown title={userInfo.name} id="username">
//                   <LinkContainer to="/profile">
//                     <NavDropdown.Item>Profile</NavDropdown.Item>
//                   </LinkContainer>
//                   <NavDropdown.Item onClick={logoutHandler}>
//                     Logout
//                   </NavDropdown.Item>
//                 </NavDropdown>
//               ) : (
//                 <LinkContainer to="/login">
//                   <Nav.Link>
//                     <FaUser /> Sign In
//                   </Nav.Link>
//                 </LinkContainer>
//               )}
//               {userInfo && userInfo.isAdmin && (
//                 <NavDropdown title="Admin" id="adminmenu">
//                   <LinkContainer to="/admin/productlist">
//                     <NavDropdown.Item>Products</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to="/admin/userlist">
//                     <NavDropdown.Item>Users</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to="/admin/orderlist">
//                     <NavDropdown.Item>Orders</NavDropdown.Item>
//                   </LinkContainer>
//                 </NavDropdown>
//               )}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </header>
//   );
// };

// export default Header;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Badge,
//   Menu,
//   MenuItem,
//   Typography,
//   Box,
//   Button,
// } from '@mui/material';
// import {
//   ShoppingCart as ShoppingCartIcon,
//   AccountCircle,
//   AdminPanelSettings as AdminPanelSettingsIcon,
// } from '@mui/icons-material';
// import { useSelector, useDispatch } from 'react-redux';
// import { useLogoutMutation } from '../slices/usersApiSlice';
// import { logout } from '../slices/authSlice';
// import SearchBox from './SearchBox';
// import logo from '../assets/logo.jpg';
// import { resetCart } from '../slices/cartSlice';

// const Header = () => {
//   const { cartItems } = useSelector((state) => state.cart);
//   const { userInfo } = useSelector((state) => state.auth);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [logoutApiCall] = useLogoutMutation();

//   const [anchorEl, setAnchorEl] = useState(null);
//   const [adminAnchorEl, setAdminAnchorEl] = useState(null);

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleAdminMenu = (event) => {
//     setAdminAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     setAdminAnchorEl(null);
//   };

//   const logoutHandler = async () => {
//     try {
//       await logoutApiCall().unwrap();
//       dispatch(logout());
//       dispatch(resetCart());
//       handleClose();
//       navigate('/login');
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <AppBar position="static" sx={{ backgroundColor: '#ebdfed' }}>
//       <Toolbar sx={{ justifyContent: 'space-between' }}>
//         <Box display="flex" alignItems="center">
//           <IconButton
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             onClick={() => navigate('/')}
//           >
//             <img src={logo} alt="Embellish" height="50px" />
//           </IconButton>
//           <Typography variant="h6" component="div" sx={{
//             color: '#b49ac1', flexGrow: 1, cursor: 'pointer'
//           }} onClick={() => navigate('/')}>
//             Embellish
//           </Typography>
//         </Box>
//         <Box display="flex" alignItems="center">
//           <SearchBox />
//           <IconButton color="inherit" onClick={() => navigate('/cart')} sx={{ color: '#b49ac1', marginLeft: '10px' }}>
//             <Badge badgeContent={cartItems.reduce((acc, item) => acc + item.qty, 0)} color="error">
//               <ShoppingCartIcon />
//             </Badge>
//           </IconButton>
//           {userInfo ? (
//             <>
//               <IconButton color="inherit" onClick={handleMenu} sx={{ color: '#b49ac1', marginLeft: '10px' }}>
//                 <AccountCircle />
//               </IconButton>
//               <Menu
//                 anchorEl={anchorEl}
//                 open={Boolean(anchorEl)}
//                 onClose={handleClose}
//               >
//                 <MenuItem onClick={() => { handleClose(); navigate('/profile'); }} sx={{ color: '#333333' }}>
//                   Profile
//                 </MenuItem>
//                 <MenuItem onClick={logoutHandler} sx={{ color: '#333333' }}>
//                   Logout
//                 </MenuItem>
//               </Menu>
//               {userInfo.isAdmin && (
//                 <>
//                   <IconButton color="inherit" onClick={handleAdminMenu} sx={{ color: '#b49ac1', marginLeft: '10px' }}>
//                     <AdminPanelSettingsIcon />
//                   </IconButton>
//                   <Menu
//                     anchorEl={adminAnchorEl}
//                     open={Boolean(adminAnchorEl)}
//                     onClose={handleClose}
//                   >
//                     <MenuItem onClick={() => { handleClose(); navigate('/admin/productlist'); }} sx={{ color: '#333333' }}>
//                       Products
//                     </MenuItem>
//                     <MenuItem onClick={() => { handleClose(); navigate('/admin/userlist'); }} sx={{ color: '#333333' }}>
//                       Users
//                     </MenuItem>
//                     <MenuItem onClick={() => { handleClose(); navigate('/admin/orderlist'); }} sx={{ color: '#333333' }}>
//                       Orders
//                     </MenuItem>
//                   </Menu>
//                 </>
//               )}
//             </>
//           ) : (
//             <Button color="inherit" onClick={() => navigate('/login')} sx={{ color: '#b49ac1', marginLeft: '10px' }}>
//               <AccountCircle />
//               Sign In
//             </Button>
//           )}
//         </Box>
//       </Toolbar>

//     </AppBar>
//   );
// };

// export default Header;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Badge,
//   Menu,
//   MenuItem,
//   Typography,
//   Box,
//   Button,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   useMediaQuery,
//   useTheme
// } from '@mui/material';
// import {
//   ShoppingCart as ShoppingCartIcon,
//   AccountCircle,
//   AdminPanelSettings as AdminPanelSettingsIcon,
//   Menu as MenuIcon,
// } from '@mui/icons-material';
// import { useSelector, useDispatch } from 'react-redux';
// import { useLogoutMutation } from '../slices/usersApiSlice';
// import { logout } from '../slices/authSlice';
// import SearchBox from './SearchBox';
// import logo from '../assets/logo.png';
// import { resetCart } from '../slices/cartSlice';

// const Header = () => {
//   const { cartItems } = useSelector((state) => state.cart);
//   const { userInfo } = useSelector((state) => state.auth);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [logoutApiCall] = useLogoutMutation();

//   const [anchorEl, setAnchorEl] = useState(null);
//   const [adminAnchorEl, setAdminAnchorEl] = useState(null);
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleAdminMenu = (event) => {
//     setAdminAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     setAdminAnchorEl(null);
//   };

//   const logoutHandler = async () => {
//     try {
//       await logoutApiCall().unwrap();
//       dispatch(logout());
//       dispatch(resetCart());
//       handleClose();
//       navigate('/login');
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const toggleDrawer = (open) => (event) => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }
//     setDrawerOpen(open);
//   };

//   const drawerContent = (
//     <Box
//       sx={{ width: 250 }}
//       role="presentation"
//       onClick={toggleDrawer(false)}
//       onKeyDown={toggleDrawer(false)}
//     >
//       <List>
//         <ListItem Button onClick={() => navigate('/cart')}>
//           <Badge badgeContent={cartItems.reduce((acc, item) => acc + item.qty, 0)} color="error">
//             <ShoppingCartIcon />
//           </Badge>
//           <ListItemText primary="Cart" sx={{ marginLeft: '10px' }} />
//         </ListItem>
//         <ListItem>
//           <SearchBox />
//         </ListItem>
//         {userInfo ? (
//           <>
//             <ListItem Button onClick={() => navigate('/profile')}>
//               <AccountCircle />
//               <ListItemText primary="Profile" sx={{ marginLeft: '10px' }} />
//             </ListItem>
//             <ListItem Button onClick={logoutHandler}>
//               <ListItemText primary="Logout" sx={{ marginLeft: '10px', color: '#333333' }} />
//             </ListItem>
//             {userInfo.isAdmin && (
//               <>
//                 <ListItem Button onClick={() => navigate('/admin/productlist')}>
//                   <AdminPanelSettingsIcon />
//                   <ListItemText primary="Products" sx={{ marginLeft: '10px', color: '#333333' }} />
//                 </ListItem>
//                 <ListItem Button onClick={() => navigate('/admin/userlist')}>
//                   <AdminPanelSettingsIcon />
//                   <ListItemText primary="Users" sx={{ marginLeft: '10px', color: '#333333' }} />
//                 </ListItem>
//                 <ListItem Button onClick={() => navigate('/admin/orderlist')}>
//                   <AdminPanelSettingsIcon />
//                   <ListItemText primary="Orders" sx={{ marginLeft: '10px', color: '#333333' }} />
//                 </ListItem>
//               </>
//             )}
//           </>
//         ) : (
//           <ListItem Button onClick={() => navigate('/login')}>
//             <AccountCircle />
//             <ListItemText primary="Sign In" sx={{ marginLeft: '10px' }} />
//           </ListItem>
//         )}
//       </List>
//     </Box>
//   );

//   return (
//     <AppBar position="static" sx={{ backgroundColor: '#ebdfed' }}>
//       <Toolbar sx={{ justifyContent: 'space-between' }}>
//         <Box display="flex" alignItems="center">
//           <IconButton
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             onClick={() => navigate('/')}
//           >
//             <img src={logo} alt="Embellish" height="50px" />
//           </IconButton>
//           <Typography variant="h6" component="div" sx={{
//             color: '#b49ac1', flexGrow: 1, cursor: 'pointer',
//             fontWeight: 'bold'
//           }} onClick={() => navigate('/')}>
//             Embellish
//           </Typography>
//         </Box>
//         {isMobile ? (
//           <>
//             <IconButton
//               edge="end"
//               color="inherit"
//               aria-label="menu"
//               onClick={toggleDrawer(true)}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
//               {drawerContent}
//             </Drawer>
//           </>
//         ) : (
//           <Box display="flex" alignItems="center">
//             <SearchBox />
//             <IconButton color="inherit" onClick={() => navigate('/cart')} sx={{ color: '#b49ac1', marginLeft: '10px' }}>
//               <Badge badgeContent={cartItems.reduce((acc, item) => acc + item.qty, 0)} color="error">
//                 <ShoppingCartIcon />
//               </Badge>
//             </IconButton>
//             {userInfo ? (
//               <>
//                 <IconButton color="inherit" onClick={handleMenu} sx={{ color: '#b49ac1', marginLeft: '10px' }}>
//                   <AccountCircle />
//                 </IconButton>
//                 <Menu
//                   anchorEl={anchorEl}
//                   open={Boolean(anchorEl)}
//                   onClose={handleClose}
//                 >
//                   <MenuItem onClick={() => { handleClose(); navigate('/profile'); }} sx={{ color: '#333333' }}>
//                     Profile
//                   </MenuItem>
//                   <MenuItem onClick={logoutHandler} sx={{ color: '#333333' }}>
//                     Logout
//                   </MenuItem>
//                 </Menu>
//                 {userInfo.isAdmin && (
//                   <>
//                     <IconButton color="inherit" onClick={handleAdminMenu} sx={{ color: '#b49ac1', marginLeft: '10px' }}>
//                       <AdminPanelSettingsIcon />
//                     </IconButton>
//                     <Menu
//                       anchorEl={adminAnchorEl}
//                       open={Boolean(adminAnchorEl)}
//                       onClose={handleClose}
//                     >
//                       <MenuItem onClick={() => { handleClose(); navigate('/admin/productlist'); }} sx={{ color: '#333333' }}>
//                         Products
//                       </MenuItem>
//                       <MenuItem onClick={() => { handleClose(); navigate('/admin/userlist'); }} sx={{ color: '#333333' }}>
//                         Users
//                       </MenuItem>
//                       <MenuItem onClick={() => { handleClose(); navigate('/admin/orderlist'); }} sx={{ color: '#333333' }}>
//                         Orders
//                       </MenuItem>
//                     </Menu>
//                   </>
//                 )}
//               </>
//             ) : (
//               <Button color="inherit" onClick={() => navigate('/login')} sx={{ color: '#b49ac1', marginLeft: '10px' }}>
//                 <AccountCircle />
//                 Sign In
//               </Button>
//             )}
//           </Box>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;

// search is working but not closing on click

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Badge,
//   Menu,
//   MenuItem,
//   Typography,
//   Box,
//   Button,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   useMediaQuery,
//   useTheme
// } from '@mui/material';
// import {
//   ShoppingCart as ShoppingCartIcon,
//   AccountCircle,
//   AdminPanelSettings as AdminPanelSettingsIcon,
//   Menu as MenuIcon,
// } from '@mui/icons-material';
// import { useSelector, useDispatch } from 'react-redux';
// import { useLogoutMutation } from '../slices/usersApiSlice';
// import { logout } from '../slices/authSlice';
// import SearchBox from './SearchBox';
// import logo from '../assets/logo.png';
// import { resetCart } from '../slices/cartSlice';

// const Header = () => {
//   const { cartItems } = useSelector((state) => state.cart);
//   const { userInfo } = useSelector((state) => state.auth);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [logoutApiCall] = useLogoutMutation();

//   const [anchorEl, setAnchorEl] = useState(null);
//   const [adminAnchorEl, setAdminAnchorEl] = useState(null);
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleAdminMenu = (event) => {
//     setAdminAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     setAdminAnchorEl(null);
//   };

//   const logoutHandler = async () => {
//     try {
//       await logoutApiCall().unwrap();
//       dispatch(logout());
//       dispatch(resetCart());
//       handleClose();
//       navigate('/login');
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const toggleDrawer = (open) => (event) => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }
//     setDrawerOpen(open);
//   };

//   const drawerContent = (
//     <Box
//       sx={{ width: 250 }}
//       role="presentation"
//       onClick={toggleDrawer(false)}
//       onKeyDown={toggleDrawer(false)}
//     >
//       <List>
//         <ListItem button onClick={() => navigate('/cart')}>
//           <Badge badgeContent={cartItems.reduce((acc, item) => acc + item.qty, 0)} color="error">
//             <ShoppingCartIcon />
//           </Badge>
//           <ListItemText primary="Cart" sx={{ marginLeft: '10px' }} />
//         </ListItem>
//         <ListItem
//           button
//           onClick={(e) => e.stopPropagation()}
//           onKeyDown={(e) => e.stopPropagation()}
//         >
//           <SearchBox />
//         </ListItem>
//         {userInfo ? (
//           <>
//             <ListItem button onClick={() => navigate('/profile')}>
//               <AccountCircle />
//               <ListItemText primary="Profile" sx={{ marginLeft: '10px' }} />
//             </ListItem>
//             <ListItem button onClick={logoutHandler}>
//               <ListItemText primary="Logout" sx={{ marginLeft: '10px', color: '#333333' }} />
//             </ListItem>
//             {userInfo.isAdmin && (
//               <>
//                 <ListItem button onClick={() => navigate('/admin/productlist')}>
//                   <AdminPanelSettingsIcon />
//                   <ListItemText primary="Products" sx={{ marginLeft: '10px', color: '#333333' }} />
//                 </ListItem>
//                 <ListItem button onClick={() => navigate('/admin/userlist')}>
//                   <AdminPanelSettingsIcon />
//                   <ListItemText primary="Users" sx={{ marginLeft: '10px', color: '#333333' }} />
//                 </ListItem>
//                 <ListItem button onClick={() => navigate('/admin/orderlist')}>
//                   <AdminPanelSettingsIcon />
//                   <ListItemText primary="Orders" sx={{ marginLeft: '10px', color: '#333333' }} />
//                 </ListItem>
//               </>
//             )}
//           </>
//         ) : (
//           <ListItem button onClick={() => navigate('/login')}>
//             <AccountCircle />
//             <ListItemText primary="Sign In" sx={{ marginLeft: '10px' }} />
//           </ListItem>
//         )}
//       </List>
//     </Box>
//   );

//   return (
//     <AppBar position="static" sx={{ backgroundColor: '#ebdfed' }}>
//       <Toolbar sx={{ justifyContent: 'space-between' }}>
//         <Box display="flex" alignItems="center">
//           <IconButton
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             onClick={() => navigate('/')}
//           >
//             <img src={logo} alt="Embellish" height="50px" />
//           </IconButton>
//           <Typography variant="h6" component="div" sx={{
//             color: '#b49ac1', flexGrow: 1, cursor: 'pointer',
//             fontWeight: 'bold'
//           }} onClick={() => navigate('/')}>
//             Embellish
//           </Typography>
//         </Box>
//         {isMobile ? (
//           <>
//             <IconButton
//               edge="end"
//               color="inherit"
//               aria-label="menu"
//               onClick={toggleDrawer(true)}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
//               {drawerContent}
//             </Drawer>
//           </>
//         ) : (
//           <Box display="flex" alignItems="center">
//             <SearchBox />
//             <IconButton color="inherit" onClick={() => navigate('/cart')} sx={{ color: '#b49ac1', marginLeft: '10px' }}>
//               <Badge badgeContent={cartItems.reduce((acc, item) => acc + item.qty, 0)} color="error">
//                 <ShoppingCartIcon />
//               </Badge>
//             </IconButton>
//             {userInfo ? (
//               <>
//                 <IconButton color="inherit" onClick={handleMenu} sx={{ color: '#b49ac1', marginLeft: '10px' }}>
//                   <AccountCircle />
//                 </IconButton>
//                 <Menu
//                   anchorEl={anchorEl}
//                   open={Boolean(anchorEl)}
//                   onClose={handleClose}
//                 >
//                   <MenuItem onClick={() => { handleClose(); navigate('/profile'); }} sx={{ color: '#333333' }}>
//                     Profile
//                   </MenuItem>
//                   <MenuItem onClick={logoutHandler} sx={{ color: '#333333' }}>
//                     Logout
//                   </MenuItem>
//                 </Menu>
//                 {userInfo.isAdmin && (
//                   <>
//                     <IconButton color="inherit" onClick={handleAdminMenu} sx={{ color: '#b49ac1', marginLeft: '10px' }}>
//                       <AdminPanelSettingsIcon />
//                     </IconButton>
//                     <Menu
//                       anchorEl={adminAnchorEl}
//                       open={Boolean(adminAnchorEl)}
//                       onClose={handleClose}
//                     >
//                       <MenuItem onClick={() => { handleClose(); navigate('/admin/productlist'); }} sx={{ color: '#333333' }}>
//                         Products
//                       </MenuItem>
//                       <MenuItem onClick={() => { handleClose(); navigate('/admin/userlist'); }} sx={{ color: '#333333' }}>
//                         Users
//                       </MenuItem>
//                       <MenuItem onClick={() => { handleClose(); navigate('/admin/orderlist'); }} sx={{ color: '#333333' }}>
//                         Orders
//                       </MenuItem>
//                     </Menu>
//                   </>
//                 )}
//               </>
//             ) : (
//               <Button color="inherit" onClick={() => navigate('/login')} sx={{ color: '#b49ac1', marginLeft: '10px' }}>
//                 <AccountCircle />
//                 Sign In
//               </Button>
//             )}
//           </Box>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  AccountCircle,
  AdminPanelSettings as AdminPanelSettingsIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import logo from '../assets/logo.png';
import { resetCart } from '../slices/cartSlice';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [adminAnchorEl, setAdminAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAdminMenu = (event) => {
    setAdminAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAdminAnchorEl(null);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      handleClose();
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleSearchComplete = () => {
    setDrawerOpen(false);
  };

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button onClick={() => navigate('/cart')}>
          <Badge badgeContent={cartItems.reduce((acc, item) => acc + item.qty, 0)} color="error">
            <ShoppingCartIcon />
          </Badge>
          <ListItemText primary="Cart" sx={{ marginLeft: '10px' }} />
        </ListItem>
        <ListItem
          button
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <SearchBox onSearchComplete={handleSearchComplete} />
        </ListItem>
        {userInfo ? (
          <>
            <ListItem button onClick={() => navigate('/profile')}>
              <AccountCircle />
              <ListItemText primary="Profile" sx={{ marginLeft: '10px' }} />
            </ListItem>
            <ListItem button onClick={logoutHandler}>
              <ListItemText primary="Logout" sx={{ marginLeft: '10px', color: '#333333' }} />
            </ListItem>
            {userInfo.isAdmin && (
              <>
                <ListItem button onClick={() => navigate('/admin/productlist')}>
                  <AdminPanelSettingsIcon />
                  <ListItemText primary="Products" sx={{ marginLeft: '10px', color: '#333333' }} />
                </ListItem>
                <ListItem button onClick={() => navigate('/admin/userlist')}>
                  <AdminPanelSettingsIcon />
                  <ListItemText primary="Users" sx={{ marginLeft: '10px', color: '#333333' }} />
                </ListItem>
                <ListItem button onClick={() => navigate('/admin/orderlist')}>
                  <AdminPanelSettingsIcon />
                  <ListItemText primary="Orders" sx={{ marginLeft: '10px', color: '#333333' }} />
                </ListItem>
              </>
            )}
          </>
        ) : (
          <ListItem button onClick={() => navigate('/login')}>
            <AccountCircle />
            <ListItemText primary="Sign In" sx={{ marginLeft: '10px' }} />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: '#ebdfed' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => navigate('/')}
          >
            <img src={logo} alt="Embellish" height="50px" />
          </IconButton>
          <Typography variant="h6" component="div" sx={{
            color: '#b49ac1', flexGrow: 1, cursor: 'pointer',
            fontWeight: 'bold'
          }} onClick={() => navigate('/')}>
            Embellish
          </Typography>
        </Box>
        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              {drawerContent}
            </Drawer>
          </>
        ) : (
          <Box display="flex" alignItems="center">
            <SearchBox onSearchComplete={handleSearchComplete}/>
            <IconButton color="inherit" onClick={() => navigate('/cart')} sx={{ color: '#b49ac1', marginLeft: '10px' }}>
              <Badge badgeContent={cartItems.reduce((acc, item) => acc + item.qty, 0)} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {userInfo ? (
              <>
                <IconButton color="inherit" onClick={handleMenu} sx={{ color: '#b49ac1', marginLeft: '10px' }}>
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => { handleClose(); navigate('/profile'); }} sx={{ color: '#333333' }}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={logoutHandler} sx={{ color: '#333333' }}>
                    Logout
                  </MenuItem>
                </Menu>
                {userInfo.isAdmin && (
                  <>
                    <IconButton color="inherit" onClick={handleAdminMenu} sx={{ color: '#b49ac1', marginLeft: '10px' }}>
                      <AdminPanelSettingsIcon />
                    </IconButton>
                    <Menu
                      anchorEl={adminAnchorEl}
                      open={Boolean(adminAnchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={() => { handleClose(); navigate('/admin/productlist'); }} sx={{ color: '#333333' }}>
                        Products
                      </MenuItem>
                      <MenuItem onClick={() => { handleClose(); navigate('/admin/userlist'); }} sx={{ color: '#333333' }}>
                        Users
                      </MenuItem>
                      <MenuItem onClick={() => { handleClose(); navigate('/admin/orderlist'); }} sx={{ color: '#333333' }}>
                        Orders
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </>
            ) : (
              <Button color="inherit" onClick={() => navigate('/login')} sx={{ color: '#b49ac1', marginLeft: '10px' }}>
                <AccountCircle />
                Sign In
              </Button>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;


