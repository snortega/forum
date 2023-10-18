import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";


const Login = () => {

  return (
    <div className="login-container" style={{backgroundImage:'url("/dark.jpg")'}}>
      <div className="login-text-container">
        <h1>Login to your Account</h1>

        <div className="loginbox">
          <label for="username">Username</label>
          <br />
          <input
            type="text"
            id="Username"
            
          />
        </div>

        <div className="loginbox">
          <label for="password">Password</label>
          <br />
          <input
            type="password"
            id="Password"
            
          />
        </div>

        <div className="login">
        <button style={{marginLeft: '10vw'}}>Login</button>
          <a href="http://localhost:3000/">
            <button>Back to Home</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
