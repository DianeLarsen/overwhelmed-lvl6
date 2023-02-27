import { useEffect, useState, useContext } from "react";
import Calendar from "../../components/calendar/Calendar";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/authContext.js";
import LayoutForm from "../../components/LayoutForm";
import ProfileCard from "../../components/ProfileCard";

// need to setNewUser to false after setup complete
export default function Settings() {
  const {
    setNewUser,
    newUser,
    updateUser,
    userState,
    addEvent,
    events,
    setNewEvents,
    newEvents,
    setUpdateEvents,
    updateEvents,
    updateEvent,
    handleEventDelete,
    settings,
    setSettings,
  } = useContext(AuthContext);
  const {
    user: { name },
  } = userState;

  const [settingsUpdated, setSettingsUpdated] = useState(false);

  const [saved, setSaved] = useState(false);

  const [showCal, setShowCal] = useState(false);

  // need to come up with a different condition that encompases all the data instead of jist misc
  useEffect(() => {
    settingsUpdated && settings.misc !== "" && setSettingsUpdated(false);
    // eslint-disable-next-line
  }, [settings]);

  function handleUpdate(e) {
    e.preventDefault();

    setSettingsUpdated(!settingsUpdated);
    setNewUser(false);
    updateUser(settings);
  }
  function handleEventUpdate(e) {
    e.preventDefault();
    if (newEvents !== "") {
      addEvent(newEvents);
    }
    if (updateEvents !== "") {
      updateEvent(updateEvents);
    }
    setSaved(true);
  }
  useEffect(() => {
    if (newEvents !== "" || updateEvents !== "") {
      setShowCal(true);
    } 
  }, [newEvents, updateEvents]);
function notSaved(e){
  if (showCal && (newEvents !== "" || updateEvents !== "")){
    if(!window.confirm("You are currently editing, Are you done (OK) or would you like to keep editing (Cancel)?")){
      e.preventDefault()
      
    } else {
      handleEventUpdate(e)
      
    }
  } else {
    setShowCal(!showCal)
  }
  
}

  useEffect(() => {
    localStorage.setItem("showCal", showCal);
    // console.log(`updating local storage to: ${showCal}`)
  }, [showCal]);

  return (
    <div className="setup">
      {newUser ? <h1>Settings</h1> : <h1>Welcome {name}!</h1>}
      {settingsUpdated ? (
        <div style={{ color: "green" }}>Your settings have up updated!</div>
      ) : (
        <div style={{ color: "red" }}>Your settings have NOT been updated!</div>
      )}
      <ProfileCard />
      

      <h3>Personal Schedule</h3>
      {showCal ? <button onClick={notSaved}>
        Cancel</button> : <button onClick={()=>setShowCal(!showCal)}>Open Calendar
      </button>}
      {showCal && (
        <button
          onClick={handleEventUpdate}
          disabled={newEvents === "" && updateEvents === ""}
        >
          Save Calendar
        </button>
      )}
      {showCal && (
        <Calendar
          setNewEvents={setNewEvents}
          setUpdateEvents={setUpdateEvents}
          events={events}
          handleEventDelete={handleEventDelete}
        />
      )}

      <h3>Layout</h3>

      <LayoutForm setSettings={setSettings} settings={settings} />

      <h3>Users</h3>
      <p>
        Here is where you can add roommates, partners, kids. You will even be
        able to send them an email to invite them to join. You can input thier
        schedule as well and if they join they will see what has been given to
        them. If they are given persmissions they can edit thier own schedule.
      </p>
      <button onClick={handleUpdate}>Update Settings</button>

      <Link to="/tasks">
        <button>Skip</button>
      </Link>
    </div>
  );
}
