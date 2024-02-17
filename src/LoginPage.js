import React, { useContext, useState } from 'react';
import {db,auth, Provider} from "./config/firebase.js";
import {signInWithPopup} from "firebase/auth";
import {doc,setDoc,getDoc} from "firebase/firestore";
import { AuthContext } from './context/AuthContext.js';

function LoginPage(){
    const [userId, setUserId]=useState("");
    const {currentUser}=useContext(AuthContext);
    const handleLogin = async () => {
        let userId="";
        try{
            await signInWithPopup(auth,Provider).then((data) => {
                setDoc(doc(db, "users", data.user.uid), {
                    displayName: data.user.displayName,
                    email: data.user.email,
                    photoURL: data.user.photoURL,
                    uid: data.user.uid,
                });
                userId=data.user.uid;
            })
            // console.log(userId);
            const res = await getDoc(doc(db, "userChats", userId));
            if(!res.exists()){
                setDoc(doc(db, "userChats", userId), {});
            }
            // console.log(userId);
            
        }catch(err){
            console.log(err.message);
        }
    }
    return(
        <div className='loginPage'>
            <button className="login-with-google-btn" onClick={handleLogin}>Sign in with Google</button>
        </div>
    )
}
export default LoginPage;