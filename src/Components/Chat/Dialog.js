import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';

import { AuthContext } from '../../context/AuthContext';

export default function ChatField(){

    const {currentUser}=useContext(AuthContext);

    const {data}=useContext(ChatContext);
    const [messages, setMessages]=useState([]);

    console.log(data);
    useEffect(()=>{
        const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });
        return ()=> {
            unsub();
        }
    },[data.chatId])
    return(
        <div className='dialog-chat'>
            <div className='dialog-chat-list'>
                {
                    messages.map(msg=>(
                        <div className={(msg.senderId===currentUser.uid) ?"msg me" :"msg he"} key={msg.id}>
                            <p className='msg-text'>{msg?.text}</p>
                            <p className='time'>{msg?.date.toDate().toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: '2-digit' })}</p>
                            <span className='tail'>
                                <svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 8 13"><title>tail-out</title><path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path><path fill="" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path></svg>
                            </span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}