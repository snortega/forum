import React, {useEffect,useState} from "react";
import "./Thread.css";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Thread = () => {  

  const {id} = useParams();
  const [replyDivs, setReplyDivs] = useState([]);
  const [title, setTitle] = useState([]);
  const [OpDiv, setOpDiv] = useState([]);
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
  });

  function toReply() {
    navigate(`/reply/${id}`);
  }

  function toDirectory() {
    navigate("/directory");
  }

  useEffect( () => {

    const userItem = localStorage.getItem("user");

    if (!userItem) {
      // Redirect unauthorized users to the login page
      navigate("/login");
    }

    const getOP = async () => {
      
      try {
        const response = await axiosInstance.get(`/thread/${id}`);
        setTitle(response.data.title);
        return response.data;
      } catch (error) {
        console.error('Error:', error);
      }
    }

    const getReplies = async () => {
      
      try {
          const response = await axiosInstance.get(`/reply/${id}`);
          return response.data;
        } catch (error) {
          console.log("This means the post has no replies. Continuing as normal.");
        }
      }

    getReplies().then((replies) => {
      // Map over the 'threads' array to create divs for each thread
      if (typeof replies !== 'undefined') {
        const replyDivs = replies.map((reply, index) => (
          <div
            className="single-post"
            key={index}> 
            <div>
              <h3>Replied by: {reply.replier}</h3>
              <p>{reply.body}</p>
            </div>
          </div>
        ));
        setReplyDivs(replyDivs);
      }
    });

    getOP().then((op) => {
      const OpDiv = (
        <div className="single-post">
          <div>
            <h3>Posted by: {op.op}</h3>
            <p>{op.body}</p>
          </div>
        </div>
      );
      setOpDiv(OpDiv);
    });
    
  }, []);

  return (
    
    <div className="curr-thread-container">
      <div className="top-container">
        <h1>{title}</h1>
        <div className="top-container-buttons">
          <button onClick={toReply}>reply</button>
          <button onClick={toDirectory} style={{marginLeft:'10vw'}}>return</button>
        </div>
      </div>

      <div className="reply-grid">
        {OpDiv}
        {replyDivs}
      </div>
    </div>
    
  )
};
export default Thread;
