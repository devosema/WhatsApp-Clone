import React, { useEffect, useState, useContext } from 'react';
import { auth ,Provider } from './config/firebase.js';
import {signOut} from "firebase/auth";

// Components
import ChatList from "./Components/Chat/ChatList";
import TopBar from "./Components/Chat/TopBar.js";
import Personal from "./Components/Chat/Personal.js";
import ChatField from "./Components/Chat/ChatField.js";
import Dialog from "./Components/Chat/Dialog.js";


import { AuthContext } from "./context/AuthContext";
import { ChatContext } from "./context/ChatContext";



export default function ChatPage(){
    const {currentUser} = useContext(AuthContext);
    const {data}=useContext(ChatContext);

    console.log(data);

    const handleSignOut = () => {
        signOut(auth,Provider);
    }
    return(
        <div className='chat-page'>
            <div className='left-side'>
                <TopBar name={currentUser.displayName} picture={currentUser.photoURL} handleSignOut={handleSignOut} />
                <ChatList />
            </div>
            <div className='right-side'>
                {data.chatId!=="null"&&(
                    <>
                        <Personal currentUser={currentUser} data={data} />
                        <Dialog currentUser={currentUser} data={data} />
                        <ChatField currentUser={currentUser} data={data} />
                    </>
                )}
            </div>
        </div>
    )
}