import "./index.css";
import React,{useState} from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat.js";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Login.js";
import { useStateValue } from "./StateProvider.js";

function App() {
  const[{user} , dispatch] = useStateValue();

  return (
    <div className="app">
      
      { !user ? (
      <Login/>
      ):(
      <div className="app__body">
      <Router>
        <Sidebar/>
        <Routes>
          {/* Route for the home page */}
          <Route path="/rooms/:roomId" element={<Chat/>} />

          <Route path="/" element={[<Chat/>]} />
         
        </Routes>
    </Router>
      
      </div>
      )}
    </div>
   ) ;
}

export default App;
