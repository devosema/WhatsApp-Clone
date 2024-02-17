import React, { useContext, useState } from 'react';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { v4 as uuid } from 'uuid';

import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

export default function ChatField({currentUser,data}){
    // const {currentUser}=useContext(AuthContext);
    // const {data}=useContext(ChatContext);
    const [msg, setMsg]=useState();

    const handleSendMsg = async (e) => {
        e.preventDefault();
        if(msg.length>0){
            // console.log(data.chatId);
            await updateDoc(doc(db, "chats", data.chatId),{
                messages: arrayUnion({
                    id: uuid(),
                    text: msg,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                })
            });
            await updateDoc(doc(db, "userChats", currentUser.uid),{
                [data.chatId + ".lastMessage"]:{text: msg},
                [data.chatId + ".date"]:serverTimestamp(),
            });
            await updateDoc(doc(db, "userChats", data.user.uid),{
                [data.chatId + ".lastMessage"]:{text: msg},
                [data.chatId + ".date"]:serverTimestamp(),
            });
            setMsg("");
        }
        
    }
    return(
        <form className='chat-field' onSubmit={handleSendMsg}>
            <input type='text' placeholder='Type a message' value={msg} onChange={e=>setMsg(e.target.value)} />
            <button type='button' onClick={handleSendMsg}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                </svg>
            </button>
        </form>
    );
}

