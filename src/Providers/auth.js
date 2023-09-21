import React, { useState } from "react";
import { Alert } from "@mui/material";
const users = [
    {
        email: "user@example.com",
        password: "1Password"
    }
]
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('auth'));
  const [error, setError] = useState();
  const login = async (e)=> {
    console.log(e)
    e.preventDefault()
    // const userExist = users.filter((user) =>user.email === email && user.password === password );
    // if(userExist){
    //   setUser({email});
    //   localStorage.setItem('user', email);
    // }else{
    //   alert("Login Failed");
    // }
  }
  const logout =  () => {
    setLoading(true);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.clear();
    setLoading(true);
  }
  return (
    <>
      {children({
        user,
        isAuthenticated,
        loading,
        setLoading,
        error,
        // setError,
        logout,
        login
      })}
    </>
  );
};

export default AuthProvider;
