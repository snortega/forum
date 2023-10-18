import React, { useState,useEffect } from 'react'
import "./Create.css";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const Create = () => {

  const navigate = useNavigate();
  const [titleInput, setTitleInput] = useState('');
  const [bodyInput, setBodyInput] = useState('');

  const navBack= () => {
    navigate('/directory');
  };

  function createThread() {
    const thread = {
      id: 1,
      username: "user",
      title: titleInput,
      body: bodyInput,
      replies: {
        
      }
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

        <div className="create-buttons">
          <button>Create</button>
          <button onClick={navBack}>Go Back</button>
        </div>
      </div>

    </div>
  );
};

export default Create;
