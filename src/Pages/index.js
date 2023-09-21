import React from 'react'
import { Route, Routes, Redirect } from "react-router-dom";
import Home from './Home';
import Login from './Login';
const index = () => {
  return (
    <Routes>
        <Route path='/' exact={true} Component={() => <Home />} />
        <Route path='/login' exact={true} Component={() => <Login />} />
    </Routes>
  )
}

export default index