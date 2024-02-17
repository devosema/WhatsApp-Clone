import React,{useContext, useState} from 'react'
import { collection, query, where,getDocs,setDoc, updateDoc, doc, serverTimestamp, getDoc, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";


function ChatList(){
    const [username, setUsername]=useState("");
    const [user, setUser]=useState(null)
    const [err, setErr]=useState(false);
    const {currentUser} = useContext(AuthContext);
    const {dispatch}=useContext(ChatContext);


    const handleUserSearch = async() => {
        const q = query(collection(db, "users"), where("displayName", "==", username));
        try{
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            });
        }catch(err){
            setErr(true)
            setUser(null)
        }
    }
    const handleUserSelect = async(userInfo) =>{
        const combinedId = currentUser.uid>user.uid ?currentUser.uid+user.uid :user.uid+currentUser.uid;
        try{
            const res = await getDoc(doc(db, "chats", combinedId));
            if(!res.exists()){
                // console.log("currentUser:",currentUser.uid);
                // console.log("user:",user.uid);
                // console.log("combinedId:",combinedId);
                // Create chat in Chats collection
                await setDoc(doc(db,"chats",combinedId), {messages:[]});
                // Create user chats
                await updateDoc(doc(db, "userChats", currentUser.uid),{
                    [combinedId + ".userInfo"]:{
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
                await updateDoc(doc(db, "userChats", user.uid),{
                    [combinedId + ".userInfo"]:{
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
            }
        }  catch(err){
            console.log(err);
        }
        dispatch({type:"CHANGE_USER",payload:userInfo});
        setUser(null);
        setUsername("");
    }

    return(
        <div className='search-bar'>
            <div className='search-form'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
                <input type="Search" placeholder="Search or start new chat" onKeyUp={handleUserSearch} onChange={e=>setUsername(e.target.value)} value={username}/>
            </div>
            {(user!==null&&username)&&(
                <ul className='search-list'>
                    <li onClick={e=>handleUserSelect(user)}>
                        <img src={user?.photoUrl} alt={user?.displayName} width="60" height="60"/>
                        <h3>{user?.displayName}</h3>
                    </li>
                </ul>
            )}
            {err&&(
                <h1>nothing</h1>
            )}
        </div>
    );
}
export default ChatList;