import axios from "axios";
import { createContext, useEffect, useState } from "react";
import userAxios from "../axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    tasks: [],
    errMsg: "",
  };

  const [userState, setUserState] = useState(initState);
  const [newUser, setNewUser] = useState(userState.user.newUser);

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

// Logout
  
  function logout() {
 
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("loggedIn");
    setUserState({
      user: {},
      token: "",
      tasks: [],
    });
  }

  // ADD TASK
  function addTask(newTask) {
    userAxios
      .post("/api/task", newTask)
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          tasks: [...prevState.tasks, res.data],
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  // GET USER TASKS
  function getUserTasks() {
    userAxios
      .get("/api/task/user")
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          tasks: res.data,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  // gets the tasks of the user on update
  useEffect(() => {
    userState.token !== "" && getUserTasks();
  }, [userState.token]);

// Update User
function updateUser(update) {
  console.log(update)
  userAxios
    .patch("/api/users", update)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err.response.data.errMsg));
}

function resetAuthErr() {
  setUserState((prevState) => ({
    ...prevState,
    errMsg: "",
  }));
}
// Handle Post Delete
function hanldePostDelete(){

}
// Handle Post Like/Dislike toggle
function hanldePostLike(){

}

  return (
    <AuthContext.Provider value={{ userState, login, register, logout, addTask, setNewUser, newUser, updateUser, hanldePostDelete }}>
      {children}
    </AuthContext.Provider>
  );
};
