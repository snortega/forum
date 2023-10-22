import React, {useEffect,useState} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import "./Directory.css";

const Directory = () => {

  const [threadDivs, setThreadDivs] = useState([]);
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
  });

  const handleNavigate = (index) => {
    navigate(`/thread/${index}`);
  };

  useEffect( () => {

    const userItem = localStorage.getItem("user");

    if (!userItem) {
      // Redirect unauthorized users to the login page
      navigate("/login");
    }

    const getThreads = async () => {
      
      try {
          const response = await axiosInstance.get('/thread');
          return response.data;
        } catch (error) {
          console.error('Error:', error);
        }
      }

    getThreads().then((threads) => {
      // Map over the 'threads' array to create divs for each thread
      const threadDivs = threads.map((thread, index) => (
        <div
          className="thread-container"
          key={index + 1}
          onClick={() => handleNavigate(index + 1)}>
            
          <div>
            <h2>Title: {thread.title}</h2>
            <p>Original Poster: {thread.op}</p>
          </div>
        </div>
      ));
      setThreadDivs(threadDivs);
    });
  }, []);

  return(
    <div className="directory-container" style={{backgroundImage:'url("/plank.jpg")'}}>
      <div className="title-container">
        <h1>Thread Directory</h1>
        <div className="title-buttons">
        <a href="http://localhost:3000/create"><button>Create</button></a>
        <a href="http://localhost:3000/"><button style={{marginLeft:'10vw'}}> Log Out </button></a>
        </div>
      </div>
      
      <div className="grid-container">
        {threadDivs}
      </div>

    </div>
  )

}

export default Directory
