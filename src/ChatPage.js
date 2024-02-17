import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

// Components
import ChatList from "./Components/Chat/ChatList";
import TopBar from "./Components/Chat/TopBar.js";
import Personal from "./Components/Chat/Personal.js";
import ChatField from "./Components/Chat/ChatField.js";
import Dialog from "./Components/Chat/Dialog.js";
import { auth ,Provider } from './config/firebase.js';
import {signOut} from "firebase/auth";
import { AuthContext } from "./context/AuthContext";


export default function ChatPage(){
    const {currentUser} = useContext(AuthContext)
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
                <Personal />
                <Dialog />
                <ChatField />
            </div>
        </div>
    )
}