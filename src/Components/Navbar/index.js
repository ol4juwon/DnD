import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import TextField from "@mui/material/TextField";
import Popover from "@mui/material/Popover";
import InputBase from "@mui/material/InputBase";
import { FormLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import { styled, alpha } from "@mui/material/styles";
import * as yup from "yup";
import SearchIcon from "@mui/icons-material/Search";
import { Formik, Form, useFormik } from "formik";
import AuthProvider from "../../Providers/auth";
import SearchProvider from "../../Providers/search";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../../redux/reducers/authSlice";
const users = [
  {
    email: "user@example.com",
    password: "1Password",
  },
];
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});
const Navbar = ({ searchTerm, setSearchTerm }) => {
  const user = useSelector((state) => state?.auth.user);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    console.log("ee");
    dispatch(logout());
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const submit = ({ email, password }) => {
    // e.preventDefault();
    console.log("submitting", { email, password });
    const userExist = users.filter(
      (item) => item.email === email && item.password === password
    );
    console.log({ userExist });
    if (userExist.length > 0) {
      console.log("ss", {email});
      // localStorage.setItem("user", email);
      dispatch(setUser(email));
    } else {
      alert("login failed");
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: submit,
  });
  console.log({ user });
  return (
    // <Box sx={{ flexGrow: 1 }}>
    <AppBar position="fixed">
      <Container maxWidth="xl" sx={{ backgroundColor: "#Ff7100" }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, fontFamily:"Aguafina Script",fontSize:32, display: { xs: "none", sm: "block" } }}
          >
            OlaJuwon's Gallery
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box sx={{ flexGrow: 0, ml: 5 }}>
            <Tooltip title="Open settings">
              {user ? (
                <IconButton onClick={handleClick} sx={{ p: 0 }}>
                  <Avatar alt={user} src="/static/images/avatar/2.jpg" />
                </IconButton>
              ): (
                <IconButton
                  onClick={handleClick}
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Tooltip>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              {/* <form onSubmit={handleSubmit(submit)} className=""> */}

              {user ? (
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              ) : (
                <form onSubmit={formik.handleSubmit}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography sx={{ marginY: 1, marginX: 2 }}>
                      Login
                    </Typography>

                    <TextField
                      sx={{ marginY: 1, marginX: 2 }}
                      variant="outlined"
                      label="Email"
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                      sx={{ marginY: 1, marginX: 2 }}
                      type="password"
                      variant="outlined"
                      label="Password"
                      id="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                    />
                    {errors.password}
                    <Button
                      type="submit"
                      // disabled={formik.isSubmitting}
                      sx={{
                        marginY: 1,
                        marginX: 2,
                        backgroundColor: "#ff7100",
                      }}
                      variant="contained"
                    >
                      Login
                    </Button>
                  </Box>
                </form>
              )}
            </Popover>
          </Box>
        </Toolbar>
      </Container>
      {/* <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
               
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
               Login
              </Button>
         
          </Box>
        </Toolbar> */}
    </AppBar>
    // </Box>
  );
};

export default Navbar;
