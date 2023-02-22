import React, { useEffect, useState } from "react";
import userAxios from "../axios";
export const UserContext = React.createContext();



export function UserProviders(props) {
  const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    tasks: [],
    errMsg: "",
  };
  const initlogstate = localStorage.getItem("loggedIn") || false;
  const [loggedIn, setLoggedIn] = useState(initlogstate);
  const [loginWindow, setLoginWindow] = useState(false);
  const [userState, setUserState] = useState(initState);
  const [newUser, setNewUser] = useState(userState.user.newUser);


  // set logged in to true
  useEffect(() => {
    userState.token !== "" && setLoggedIn(true);
  }, [userState.token]);

  if (loggedIn) {
    localStorage.setItem("loggedIn", loggedIn);
  }

  //  gets the tasks of the user
  // useEffect(() => {
  //   loggedIn && userState.token !== "" && getUserTasks();
  // }, [loggedIn, userState.token]);


 
  function openLogin() {
    setLoginWindow(!loginWindow);
  }
 

  function resetAuthErr() {
    setUserState((prevState) => ({
      ...prevState,
      errMsg: "",
    }));
  }






}
