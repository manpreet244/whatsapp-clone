import React, { useState ,useEffect } from 'react'
import  './SidebarChats.css';
import { Avatar } from "@mui/material";
import { Link } from 'react-router-dom';
const SidebarChats = ({name,id}) => {
  useEffect(()=>{
    
  })
    const [seed , setSeed] = useState("");
    useEffect(()=>{
       setSeed(Math.floor(Math.random() *5000))
    },[])
  return ( 
    <Link to ={`/rooms/${id}`}>
    <div className ="sidebarChat">
        <Avatar src= {`https://api.dicebear.com/8.x/pixel-art/svg?${seed}=John`}/>
        <div className="isidebarChat__info">
          <h2>{name}</h2>
          <p>Last message...</p>
        </div>
    </div>
    </Link> 
  )
}

export default SidebarChats
