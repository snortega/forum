import React, { useState,useEffect } from 'react'
import "./Create.css";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Create = () => {

  const navigate = useNavigate();
  const [titleInput, setTitleInput] = useState('');
  const [bodyInput, setBodyInput] = useState('');
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const userItem = localStorage.getItem("user");

    if (!userItem) {
      // Redirect unauthorized users to the login page
      navigate("/login");
    }
  }, []);

  const navBack= () => {
    navigate('/directory');
  };

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
  });

  const createThread = async () => {
    if(!titleInput || !bodyInput) {
      setErrorMessage("Thread creation failed. Please fill in all fields.");
      return;
    }

    const threadObject = {
        op: JSON.parse(localStorage.getItem("user")).username,
        title: titleInput,
        body: bodyInput
    }

    try {
      const response = await axiosInstance.post('/thread', threadObject);
      setErrorMessage("");
      console.log('Thread created:', response.data);
      navigate(`/thread/${response.data.id}`)
    } catch (error) {
      console.error('Error creating thread:', error);
      setErrorMessage("Internal error: Thread creation failed.");
    }

  }

  return (
    <div className="create-container" style={{backgroundImage:'url("/dark.jpg")'}}>
      <div className="create-form">
        <h1>New Thread</h1>
        <Form>
          <Form.Group>
            <Form.Control type="text" placeholder="Thread Title" onChange={(e) => setTitleInput(e.target.value)} style={{width:'70vw',height:'5vh',fontSize:'20px'}}/>
            <br></br>
            <Form.Control as="textarea" rows={6} placeholder="Thread Body" onChange={(e) => setBodyInput(e.target.value)} style={{width:'70vw',height:'30vh',fontSize:'12px',marginTop:'3vh'}}></Form.Control>
          </Form.Group>
        </Form>

        {errorMessage && <p style={{fontSize: "28px",color: "red",fontWeight: "bold", WebkitTextStrokeColor: "black",WebkitTextStrokeWidth: "1px", marginTop:"20px"}}>{errorMessage}</p>}     
      
        <div className="create-buttons">
          <button onClick={createThread}>Create</button>
          <button onClick={navBack}>Go Back</button>
        </div>
      </div>

    </div>
  );
};

export default Create;
