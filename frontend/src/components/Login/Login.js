import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from 'axios'


const Login = () => {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
  });

  const handleLogin = async () => {

    if(!username || !password) {
      setSuccessMessage("");
      setErrorMessage("Log in failed. Please check your information.");
      return;
    }

    try {
      const response = await axiosInstance.get(`/user/${username}`, username);

      if (response.data.password == password) {
        setSuccessMessage("");
        setErrorMessage("");
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/directory");
      } else {
        setSuccessMessage("");
        setErrorMessage("Sign in failed. Please check your information.");
      }

    } catch (error) {
      console.error('User not found:', error);
      setSuccessMessage("");
      setErrorMessage("Sign in failed. Please check your information.");
    }
  }


  return (
    <div className="login-container" style={{backgroundImage:'url("/dark.jpg")'}}>
      <div className="login-text-container">
        <h1>Login to your Account</h1>

        <div className="loginbox">
          <label for="username" >Username</label>
          <br />
          <input
            type="text"
            id="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="loginbox">
          <label for="password">Password</label>
          <br />
          <input
            type="password"
            id="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="login">
        <button style={{marginLeft: '10vw'}} onClick={handleLogin}>Login</button>
          <a href="http://localhost:3000/">
            <button>Back to Home</button>
          </a>
        </div>
        {successMessage && <p style={{fontSize: "28px",color: "green",fontWeight: "bold", WebkitTextStrokeColor: "black",WebkitTextStrokeWidth: "1px", marginTop:"20px",marginLeft:"10vw"}}>{successMessage}</p>}
        {errorMessage && <p style={{fontSize: "28px",color: "red",fontWeight: "bold", WebkitTextStrokeColor: "black",WebkitTextStrokeWidth: "1px", marginTop:"20px",marginLeft:"10vw"}}>{errorMessage}</p>}     
      </div>
    </div>
  );
};

export default Login;
