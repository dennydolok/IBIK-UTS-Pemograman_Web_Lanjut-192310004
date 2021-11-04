import './App.css';
// import jwt_decode from "jwt-decode";
// import {useState,useEffect}  from 'react';
// import {useDispatch} from 'react-redux';
import { Route,Switch,Redirect } from "react-router-dom";

import Signin from "./Auth";
import Layout from './Template/Layout';

function App() {

  const SignOut = () =>{
    console.log("Ini adalah sign out");
  } 

  const IsAuth = localStorage.getItem("AuthToken");


  return (
    <Switch>
      <Route path="/sign-in" component={Signin} />
      <Route path="/sign-out" component={SignOut} />

      {(IsAuth) ? (
        <Layout />
      ) : (
        <Redirect to="/sign-in" />
      )}

    </Switch>
  );
}

export default App;
