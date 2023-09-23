import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
} from "@mui/material";
import {
  EmailRounded,
  PasswordOutlined,
  PasswordRounded,
  ShieldSharp,
} from "@mui/icons-material";
import usersData from "../utils/mock/users";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/authSlice";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submit = ({ email, password }) => {
    // e.preventDefault();
    setIsLoading(true);
  setTimeout(() => {   console.log("submitting", { email, password });
    const userExist = usersData.filter(
      (item) => item.email === email && item.password === password
    );
    console.log({ userExist }, isLoading);
    if (userExist.length > 0) {
     
        console.log("ss", { email });
        // localStorage.setItem("user", email);
        dispatch(setUser(email));
        setIsLoading(false);
    
    } else {
      setIsLoading(false);
      alert("login failed");
    }
    }, 2500);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: submit,
  });
  return (
    <Box
      sx={{ width: "100vw", height: "100vh" }}
      display="flex"
      justifyContent={"center"}
      alignItems="center"
    >
      {isLoading && 
        <CircularProgress
          color="secondary"
          size={120}
          sx={{ color: "#FF7100", width: "20%" }}
        />
 }
      {!isLoading &&  <Container
          maxWidth="xs"
          sx={{ justifySelf: "center", alignSelf: "center" }}
        >
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h4" align="center">
              Login
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                label="Email"
                id="email"
                fullWidth
                margin="normal"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{
                  startAdornment: (
                    <EmailRounded
                      fontSize="large"
                      sx={{
                        color: Boolean(formik.errors.email) ? "red" : "#ff7100",
                      }}
                    />
                  ),
                }}
              />
              <TextField
                label="Password"
                fullWidth
                margin="normal"
                variant="outlined"
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  startAdornment: (
                    <PasswordRounded
                      fontSize="large"
                      sx={{
                        color: Boolean(formik.errors.password)
                          ? "red"
                          : "#ff7100",
                      }}
                    />
                  ),
                }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                // disabled={formik.isSubmitting}
                type="submit"
                style={{
                  marginTop: "20px",
                  color: "white",
                  backgroundColor: "#FF7100",
                }}
              >
                Login
              </Button>
            </form>
          </Paper>
        </Container>}

    </Box>
  );
};

export default Login;

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
