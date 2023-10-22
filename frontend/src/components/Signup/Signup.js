import React from 'react'
import { useState } from 'react'
import "./Signup.css"
import axios from 'axios'

const Signup = () => {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
  });

  const handleSubmit = async () => {

    const requestObject =
    {
      "username": username,
      "password": password,
    }

    if(!username || !password) {
      setSuccessMessage("");
      setErrorMessage("Sign up failed. Please check your information.");
      return;
    }

    try {
      const response = await axiosInstance.post('/user', requestObject);
      console.log('User created:', response.data);
      setSuccessMessage("User creation successful! You may now log in.");
      setErrorMessage("");
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      setSuccessMessage("");
      setErrorMessage("Sign up failed. Please check your information.");
    }
  }

  return (
    <div className="signup-container">

      <div className="board" style={{backgroundImage:'url("/img.png")'}}>

        <h1>Create an Account</h1>

        <div className="labelbox">
          <label for="username">Username</label><br/>
          <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)}/>
        </div>

        <div className="labelbox">
          <label for="password" >Password</label><br/>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
       
        <div className="buttonsection">
        <button onClick={handleSubmit}>Sign Up</button>
        <a href="http://localhost:3000/"><button style={{}}> Back to Home</button></a>  
        </div> 

        {successMessage && <p style={{fontSize: "28px",color: "green",fontWeight: "bold", WebkitTextStrokeColor: "black",WebkitTextStrokeWidth: "1px", marginTop:"20px"}}>{successMessage}</p>}
        {errorMessage && <p style={{fontSize: "28px",color: "red",fontWeight: "bold", WebkitTextStrokeColor: "black",WebkitTextStrokeWidth: "1px", marginTop:"20px"}}>{errorMessage}</p>}
      </div>

    </div>
  )
}

export default Signup
