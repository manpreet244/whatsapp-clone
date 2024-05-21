import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import db from "./firebase.js";
import {  collection, getDocs } from 'firebase/firestore';
import SidebarChats from "./SidebarChats.js";
import { Avatar, IconButton } from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useStateValue} from "./StateProvider.js";
const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const[{user , dispatch}] =useStateValue();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const rooms = collection(db, "rooms");
        const querySnapshot = await getDocs(rooms);
        const roomsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setRooms(roomsData);
        console.log(roomsData)
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
    // return()=>{
    //   unsubscribe();
    // }
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">

          <Avatar src={user?.photoURL}/>
        
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlinedIcon />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar__chats">
        <h1>hi</h1>

        {rooms.map((room) => (
          <SidebarChats key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
