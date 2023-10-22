import React, { useState,useEffect } from 'react'
import "./Reply.css";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from 'axios'

const Reply = () => {

  const {id} = useParams();
  const navigate = useNavigate();
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
    navigate(`/thread/${id}`)
  };

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
  });

  const createReply = async () => {
    if(!bodyInput) {
      setErrorMessage("Reply creation failed. Reply must have a body.");
      return;
    }

    const replyObject = {
        replier: JSON.parse(localStorage.getItem("user")).username,
        reply_to: id,
        body: bodyInput
    }

    try {
      const response = await axiosInstance.post('/reply', replyObject);
      setErrorMessage("");
      console.log('Reply created:', response.data);
      navigate(`/thread/${id}`)
    } catch (error) {
      console.error('Error creating Reply:', error);
      setErrorMessage("Internal error: Reply creation failed.");
    }

  }

  return (
    <div className="reply-container">
      <div className="reply-form">
        <h1>Reply</h1>
        <Form>
          <Form.Group>
            <Form.Control as="textarea" rows={6} placeholder="Reply Body" onChange={(e) => setBodyInput(e.target.value)} style={{width:'70vw',height:'30vh',fontSize:'12px',marginTop:'3vh'}}></Form.Control>
          </Form.Group>
        </Form>

        {errorMessage && <p style={{fontSize: "28px",color: "red",fontWeight: "bold", WebkitTextStrokeColor: "black",WebkitTextStrokeWidth: "1px", marginTop:"20px"}}>{errorMessage}</p>}     
      
        <div className="reply-buttons">
          <button onClick={createReply}>Reply</button>
          <button onClick={navBack}>Go Back</button>
        </div>
      </div>

    </div>
  );
};

export default Reply;
