import React, {useEffect} from 'react'
import "./Landing.css"
import board from './board.png';

const Landing = () => {

  useEffect( () => {

  },[]);

  return (
    <div className="landing-container" style={{backgroundImage:'url("/texture.jpg")'}}>

      <div className="text-container">
        <h1>Discussion Board</h1>
      </div>

      <div className="landing-buttons">
        <a href="http://localhost:3000/signup"><button>Signup</button></a>
        <a href="http://localhost:3000/login"><button style={{marginLeft:'200px'}}>Login</button></a>
      </div>

      <div className="image-container">
      <img src={board} alt="board" />

      </div>

    </div>
    
  )
}

export default Landing
