import React, { useContext, useEffect, useState } from 'react'
import { db } from "../../config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

// Components
import Search from './Search'

function ChatList(){
    const [chats, setChats]=useState([]);
    const {currentUser}=useContext(AuthContext);
    const {dispatch}=useContext(ChatContext);

    
    useEffect(()=>{
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                // console.log("Chats data: ", doc.data());
                setChats(doc.data());
            });
            return ()=> {
                unsub();
            }
        }
        currentUser.uid && getChats();
    },[currentUser.uid]);
    // console.log(chats);
    // console.log(Object.entries(chats));

    const handleSelect = (userInfo) => {
        dispatch({type:"CHANGE_USER",payload:userInfo})
    }

    return(
        <div className='chat-list'>
            <Search />
            <ul>
                {Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map(chat=>(
                    <li className='unread' key={chat[0]} onClick={e=>handleSelect(chat[1]?.userInfo)}>
                        <div className="left">
                            <img src={chat[1]?.userInfo.photoURL} alt="/" width="60" height="60"/>
                            <div className="info">
                                <h1 className="Username">{chat[1]?.userInfo.displayName}</h1>
                                <h4 className="LastMessages">{chat[1].lastMessage?.text}</h4>
                            </div>
                        </div>
                        {/* <div className="right">
                            <h4 className="LastMessages">test</h4>
                            <p className="NewMessages">1</p>
                        </div> */}
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default ChatList;