import React from 'react'
import { Route, Routes, Redirect } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import { useSelector } from 'react-redux';
import Signup from './Signup';
const Pages = () => {

  const user = useSelector(state => state?.auth.user);
  return (
    <Routes>

        <Route path='/' exact={true} Component={() => user ? <Home /> : <Login /> }/>
        <Route path='/login' exact={true} Component={() =>  user ? <Login /> : <Home /> } />
        <Route path="/signup" exact={true} Component={() => <Signup />} />
    </Routes>
  )
}

export default Pages