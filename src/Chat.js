import { Avatar,IconButton } from '@material-ui/core';
import React,{useEffect,useState} from 'react';
import { AirportShuttleOutlined, AttachFile, InsertEmoticonOutlined, MicOutlined, MoreVertOutlined, SupervisedUserCircle } from '@material-ui/icons';
import './Chat.css';
import {useParams} from "react-router-dom";
import db from './firebase';
import firebase from 'firebase';
import {useStateValue} from "./StateProvider";


function Chat() {

    const [input , setinput] = useState("");
    const [seed , setSeed] = useState("");
    const {roomId}=useParams();
    const [roomName,setRoomName] =useState("");
    const [messages,setMessages]= useState([]);
    const [{user}, dispatch]= useStateValue();

    useEffect(() => {
        if(roomId){
            db.collection("rooms").doc(roomId).onSnapshot((snapshot)=>
                setRoomName(snapshot.data().name));
            
            db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot((snapshot)=>
            setMessages(snapshot.docs.map((doc)=>doc.data()))
            );
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, [roomId]);

    const sendMessage = (e) =>{
            e.preventDefault();
            console.log("you typed>>>", input);
            db.collection("rooms").doc(roomId).collection("messages").add({
                message: input,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        setinput("");
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

                <div className="chat__headerInfo">
                <h2>{roomName}</h2>
                <p className='chat-room-last-seen'>
                        Last seen {" "}
                        {new Date(
                            messages[messages.length - 1]?.
                            timestamp?.toDate()
                        ).toUTCString()}
                    </p>
                </div>

                <div className="chat__headerRight">
                        <IconButton>
                        < SupervisedUserCircle />
                        </IconButton>
                        <IconButton>
                        < AirportShuttleOutlined/>
                        </IconButton>
                        <IconButton>
                        < MoreVertOutlined />
                        </IconButton>
                </div>

            </div>

            <div className="chat__body">
                {messages.map(message =>(
                <p className={`chat__message ${message.name === user.displayName &&'chat__reciever'}`}><span className="chat__name">{message.name}</span>{message.message}<span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span></p>
                
                ))}
            </div>
            <div className="chat__footer">
                <InsertEmoticonOutlined />
                <form>
                    <input value={input} onChange={(e)=>setinput(e.target.value)} type="text" placeholder="type a message..."/>
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicOutlined />
            </div>
        </div>
    )
}

export default Chat;
