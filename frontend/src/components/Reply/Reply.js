import React, { useState } from "react";
import "./Reply.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useLocation } from "react-router-dom";
import { createNewReply } from "../../service/ThreadAPI";
import { useAuth } from "../../service/AuthContextProvider";


const Reply = () => {
  const {  user } = useAuth();
  const location = useLocation();
  const selectedThreadId = location.state ? location.state.selectedThreadId : null;
  const navigate = useNavigate();
  const [replyBody, setReplyBody] = useState('');

  const handleReplyBodyChange = (event) => {
    setReplyBody(event.target.value);
  };

  const handleCreateNewReply = async () => {
    try {




      const replyData = {
        _id: selectedThreadId,
        reply: {
          author: user.username,
          content: replyBody,
        },
      };
      console.log(replyData);

      await createNewReply(replyData);
      navigate('/directory');
    } catch (error) {
      console.error('Error creating reply:', error);
    }
  };

  return (
    <div className="reply-container">
      <div className="reply-text-container">
        <h1>Reply</h1>
      </div>
      
      <div className="reply-form">
        <Form>
          <Form.Group className="mt-4" controlId="exampleTextarea" style={{ marginLeft: '5vw', width: '70vw' }}>
            <Form.Control as="textarea" rows={12} placeholder="Reply Body" onChange={handleReplyBodyChange} />
          </Form.Group>

          <Button className="mt-3" variant="primary" onClick={handleCreateNewReply}>
            Submit
          </Button>

          <Button className="mt-3" variant="danger" type="button" style={{ marginLeft: '5vw' }} onClick={() => navigate('/directory')}>
            Cancel
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Reply;
