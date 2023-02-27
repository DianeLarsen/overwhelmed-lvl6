import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import userAxios from "../axios";
import {
  DayPilot,
} from "@daypilot/daypilot-lite-react";

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
  
  const [newEvents, setNewEvents] = useState("");
  const [settings, setSettings] = useState("");
  const [updateEvents, setUpdateEvents] = useState("");
 
  const [events, setEvents] = useState([{
    start: new DayPilot.Date(),
    end: (new DayPilot.Date()).addHours(5),
    id: DayPilot.guid(),
    text: "New Event",
    resource: "E"
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
      tasks: "",
    });
  }
  // ADD Event
  function addEvent(newEvent) {
 
    newEvent.map((newEvent) =>
    userAxios
      .post("/api/event", newEvent)
      .then((res) => {
        console.log("The event has been added!");
        getUserEvents();
        setNewEvents("");
      })
      .catch((err) => console.log(err.response.data.errMsg))
    )
  }

  // Update Event
  function updateEvent(updatedEvent) {
    console.log(updatedEvent);
    updatedEvent.map((updates) =>
      userAxios
        .patch(`/api/event/${updates._id}`, updates)
        .then((res) => {
          console.log("The event has been updated!");
          getUserEvents();
          setUpdateEvents("");
        })
        .catch((err) => console.log(err.response.data.errMsg))
    );
  }
    // Update Task
    function updateTask(updatedTask) {
      console.log(updatedTask);
      
        userAxios
          .patch(`/api/task/${updatedTask._id}`, updatedTask)
          .then((res) => {
            console.log("The task has been updated!");
            getUserTasks();
          })
          .catch((err) => console.log(err.response.data.errMsg))
      
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

  useEffect(() => {
    getUserEvents();
    getUserTasks()
  }, []);

  // ADD TASK
  function addTask(newTask) {
    userAxios
      .post("/api/task", newTask)
      .then((res) => {
        getUserTasks()
        
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }
console.log(userState)
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

  // DELETE EVENT
  function handleEventDelete(eventID) {
    userAxios
      .delete(`/api/event/${eventID}`)
      .then((res) => {
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event._id !== eventID)
        );
      })
      .catch((err) => console.log(err));
  }
  function confirmLeave(){
    if (!window.confirm("You have unsaved settings, do you want to leave the page?/n If OK leave the page and settings will not be saved /n if Cancel return to page") ) {
      
    }}

 

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
        updateEvent,
        handleEventDelete,
        settings, 
        setSettings,
        confirmLeave,
        updateTask,
       
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
