import React, { useState } from "react";
import { Route, Routes } from 'react-router-dom';
import "./App.css";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Directory from "./components/Directory/Directory";
import Thread from "./components/Thread/Thread";
import Create from "./components/Create/Create";


function App() {

  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/thread/:id" component={<Thread />} />
          <Route path='/create' element={<Create/>}/>
          
        </Routes>
    </div>
  );
}

export default App;

