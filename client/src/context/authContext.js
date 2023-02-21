import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { redirect } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    tasks: [],
    errMsg: "",
  };

  const [userState, setUserState] = useState(initState);
 
  const initlogstate = localStorage.getItem("loggedIn") || false;
  const [loggedIn, setLoggedIn] = useState(initlogstate);

  // REGISTER

  function register(inputs) {
    axios
      .post("/auth/register", inputs)
      .then((res) => {
        const { user, token } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
       
        setUserState((prevUserState) => ({
          ...prevUserState,
          user,
          token,
        }));
        
      })
      .catch((err) => handleAuthErr(err.response.data.errMsg));
  }

  // ERROR HANDLING

  function handleAuthErr(errMsg) {
    setUserState((prevState) => ({
      ...prevState,
      errMsg,
    }));
  }

  // LOGIN

  function login(inputs) {
    axios
      .post("/auth/login", inputs)
      .then((res) => {
        const { user, token } = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setUserState((prevUserState) => ({
          ...prevUserState,
          user,
          token,
        }));
        // userState.token !== "" && getUserTasks();
      })
      .catch((err) => handleAuthErr(err.response.data.errMsg));
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userState));
  }, [userState]);



  
  function logout() {
    setLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("loggedIn");
    setUserState({
      user: {},
      token: "",
      tasks: [],
    });
  }
console.log(userState.errMsg)
  return (
    <AuthContext.Provider value={{ userState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
