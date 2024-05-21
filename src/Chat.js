import React, { useState, useEffect } from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";
import { Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicNoneIcon from '@mui/icons-material/MicNone';
import { doc,getDoc ,addDoc,getDocs,collection, onSnapshot, query, where, limit } from 'firebase/firestore';
import  db  from './firebase'; // Assuming 'db' is your Firestore instance
import { FieldValue } from "firebase/firestore";
import { useStateValue } from "./StateProvider";
import { serverTimestamp } from "firebase/firestore";
function Chat() {
    const [input , setInput ] = useState("");
    const [seed,setSeed] =useState("");
    const {roomId} = useParams();
    const [roomName ,setRoomName] =useState("");
    const [messages ,setMessages] =useState([]);

    const [{user} , dispatch] =useStateValue();
    // const roomDocRef = doc(db, 'rooms', roomId);:
    // Here, we're creating a reference to a specific document in the Firestore database.
    // The doc function is used to create a document reference.
    // It takes three arguments:
    // The Firestore database instance (db in this case).
    // The name of the collection where the document resides ('rooms' in this case).
    // The ID of the document we want to reference (specified by roomId).
    // So, roomDocRef is a reference to the document in the 'rooms' collection with the ID specified by roomId.
    // const roomDocSnapshot = await getDoc(roomDocRef);:
    // Here, we're fetching the document snapshot corresponding to the document reference we created.
    // The getDoc function is used to retrieve a snapshot of the document referenced by roomDocRef.
    // It is an asynchronous operation, so we use await to wait for the operation to complete.
    // Once the snapshot is fetched, it contains the current state of the document.
    // So, roomDocSnapshot is a snapshot of the document referenced by roomDocRef.
    
    
  
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const roomDocRef = doc(db, 'rooms', roomId);
        const roomDocSnapshot = await getDoc(roomDocRef);
    
        if (roomDocSnapshot.exists()) {
          // Get the room data
          const roomData = roomDocSnapshot.data();
          setRoomName(roomData.name);
    
          // Get the messages collection reference
          const messagesRef = collection(db, 'rooms', roomId, 'messages');
          
          // Fetch the documents (messages) within the collection
          const querySnapshot = await getDocs(messagesRef);
    
          // Iterate through each message document
          const messages = querySnapshot.docs.map(doc=> 
           doc.data() 
                 );
    console.log("messages:",messages)
          // Now you have an array of messages, you can set it in your state
          setMessages(messages);
        } else {
          // Handle the case where the document doesn't exist
          console.error('Room document not found');
        }
      } catch (error) {
        console.error('Error fetching room document: ', error);
      }
    };
         
    fetchData();
  },[roomId])
 
    useEffect(()=>{
      setSeed(Math.floor(Math.random() *5000))
   },[])
  
   const sendMessage = async (e) => {
    e.preventDefault();
    if (input.length > 0) {
      try {
        // Add a new message document to the "messages" collection
        await addDoc(collection(db, "rooms", roomId, "messages"), {
          message: input,
          name: user.displayName,
          timestamp: serverTimestamp(), // Assuming you want to use the current timestamp
          // Add any other properties you want to include in the message object
        });

        // Clear the input field after successfully adding the message
        setInput("");
      } catch (error) {
        console.error("Error adding message: ", error);
      }
    }
  };
  ;
  return (
    <div className="chat">
      <div className="chat__header">
      <Avatar src= {`https://api.dicebear.com/8.x/pixel-art/svg?${seed}=John`}/>
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen at {new Date(
            messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()
          }
          </p>
          </div>
          <div className="chat__headerRight">
            
            <IconButton>
              <SearchOutlinedIcon />
            </IconButton>
            <IconButton>
              <AttachFileIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
         
        </div>
      </div>
      <div className="chat__body">
        
      {messages.map((message) => (
            <p
            className={`chat__messages ${
              message.name === user.displayName && "chat__reciever"
            }`}>
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">
                {new Date(message.timestamp?.toDate()).toUTCString}
              </span>

            </p>     

))}
 
 


      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon/>
            <form>
                <input type="text"
                value={input}
                onChange={e=>setInput(e.target.value)}
                />
                <button onClick={sendMessage}
                type="submit">Submit</button>
            </form>
            <MicNoneIcon/>

      </div>
    </div>
  );
}

export default Chat;
