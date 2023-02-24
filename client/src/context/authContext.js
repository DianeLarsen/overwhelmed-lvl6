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
    events: []
  };

  const [userState, setUserState] = useState(initState);
  const [newUser, setNewUser] = useState(userState.user.newUser);
  const initialEvents = {
    text: "",
    start: "",
    end: "",
    id: "", 
    backColor: ""
  };
  const [newEvents, setNewEvents] = useState(initialEvents); 
 
  const [updateEvents, setUpdateEvents] = useState("");

  
  const  [events, setEvents] = useState([{
    id: 1,
    text: "Event 1",
    start: "2023-03-07T10:30:00",
    end: "2023-03-07T13:00:00"
  },
  {
    id: 2,
    text: "Event 2",
    start: "2023-03-08T09:30:00",
    end: "2023-03-08T11:30:00",
    backColor: "#6aa84f"
  },
  {
    id: 3,
    text: "Event 3",
    start: "2023-03-08T12:00:00",
    end: "2023-03-08T15:00:00",
    backColor: "#f1c232"
  },
  {
    id: 4,
    text: "Event 4",
    start: "2023-03-06T11:30:00",
    end: "2023-03-06T14:30:00",
    backColor: "#cc4125"
  }]);
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
      tasks: []
      
    });
  }
  // ADD Event
  function addEvent(newEvent) {
    console.log(newEvent)
    userAxios
      .post("/api/event", newEvent)
      .then((res) => {
        console.log("The event has been added!");
        getUserEvents()
        setNewEvents(initialEvents)
      })
      .catch((err) => console.log(err.response.data.errMsg));

  }

   // Update Event
   function updateEvent(updatedEvent) {
    console.log(updatedEvent)
updatedEvent.map((updates)=>
    userAxios
      .patch(`/api/event/${updates._id}`, updates)
      .then((res) => {
        console.log("The event has been updated!");
        getUserEvents()
        setUpdateEvents("")
      })
      .catch((err) => console.log(err.response.data.errMsg)))
  }

  // GET USER Events
  function getUserEvents() {
    userAxios
      .get("/api/event/")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  useEffect(()=>{
    getUserEvents()
  },[])


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

  // Update User
  function updateUser(update) {
    userAxios
      .patch("/api/users", update)
      .then((res) => {
        const user = res.data;

        localStorage.setItem("user", JSON.stringify(user));

        setUserState((prevUserState) => ({
          ...prevUserState,
          user,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function resetAuthErr() {
    setUserState((prevState) => ({
      ...prevState,
      errMsg: "",
    }));
  }
  // Handle Post Delete
  function hanldePostDelete() {}
  // Handle Post Like/Dislike toggle
  function hanldePostLike() {}

  return (
    <AuthContext.Provider
      value={{
        userState,
        login,
        register,
        logout,
        addTask,
        setNewUser,
        newUser,
        updateUser,
        hanldePostDelete,
        addEvent,
        events,
        setEvents,
        setNewEvents,
        newEvents,
        setUpdateEvents,
        updateEvents, 
        updateEvent
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
