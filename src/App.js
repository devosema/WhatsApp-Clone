import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";

// Components
import LoginPage from './LoginPage';
import ChatPage from './ChatPage';

function App() {
  const { currentUser } = useContext(AuthContext);
  console.log("user", currentUser);
  // const ProtectedRoute = ({children}) => {
  //   if(!currentUser){
  //     <Navigate to={"/login"} />
  //   }
  // }
  return (
    <div className="App">
      {!currentUser ?<LoginPage /> :<ChatPage /> }
    </div>
  );
}

export default App;