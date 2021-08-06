import React,{useEffect,useState} from 'react';
import {Avatar, IconButton} from "@material-ui/core";
import './Sidebar.css';
import SidebarChat from './SidebarChat';
import { ChatOutlined , LocalHospitalOutlined, MoreVertOutlined, SearchOutlined } from '@material-ui/icons';
import db from './firebase';
import {useStateValue} from './StateProvider';

function Sidebar() {

    const [rooms,setRooms]= useState([]);
    const [{user}, dispatch]=useStateValue();

    useEffect(() => {
     const unsubscribe= db.collection('rooms').onSnapshot(snapshot =>(
            setRooms(snapshot.docs.map(doc=>({
                id: doc.id,
                data:doc.data()
            })
            ))
        ));
        return ()=>{
            unsubscribe();
        }
    }, []);
    return (
        
            <div className="sidebar">
                <div className="sidebar__header">
                    <Avatar src={user?.photoURL}/>
                    <div className="sidebar__headerRight">
                        <IconButton>
                        < LocalHospitalOutlined />
                        </IconButton>
                        <IconButton>
                        < ChatOutlined />
                        </IconButton>
                        <IconButton>
                        < MoreVertOutlined />
                        </IconButton>
                        
                        
                    </div>
                </div>

                <div className="sidebar__search">
                    <div className="sidebar__searchContainer">
                    
                    </div>

                </div>
                <div className="sidebar__chats">
                    <SidebarChat addNewChat />
                    {rooms.map(room=>(
                        <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                    ))}
                 
                </div>
            </div>
            
        
    )
};

export default Sidebar;
