import { useEffect, useState, useContext } from "react";
import Calendar from "../../components/calendar/Calendar";

import CloudinaryUploadWidget from "../../Widget/CloudinaryUploadWidget";
import { AuthContext } from "../../context/authContext.js";
import ProfileForm from "../../components/ProfileForm";
import { PermMedia } from "@mui/icons-material";


// need to setNewUser to false after setup complete
export default function Settings() {
  const { setNewUser, newUser, updateUser, userState } = useContext(AuthContext);
  const {user: {name}} = userState

 
  const [settingsUpdated, setSettingsUpdated] = useState(false);
  const initialSettings = {
    schedule: "",
    layout: "",
    imgUrl: "",
  };
  const [settings, setSettings] = useState(initialSettings);
  // console.log(settings);
  const [showCal, setShowCal] = useState(false);
  const initialEvents = {
    text: "",
    start: "",
    end: "",
    backColor: ""
  };
const  [events, setEvents] = useState(initialEvents);

  // need to come up with a different condition that encompases all the data instead of jist misc
  useEffect(() => {
    settingsUpdated && settings.misc !== "" && setSettingsUpdated(false);
    // eslint-disable-next-line
  }, [settings]);

  function handleChange(e) {
    const { name, value } = e.target;
    setSettings((prevInputs) => ({
      ...prevInputs,
      [name]: value,
      
    }));
  }

 
  function handleUpdate(e) {
    e.preventDefault()
    setSettingsUpdated(!settingsUpdated);
    setNewUser(false);
    updateUser(settings);
  }

  return (
    <div className="setup">
      {newUser ? <h1>Settings</h1> : `<h1>Welcome ${name}</h1>`}
      {settingsUpdated ? (
        <div style={{ color: "green" }}>Your settings have up updated!</div>
      ) : (
        <div style={{ color: "red" }}>Your settings have NOT been updated!</div>
      )}

      <CloudinaryUploadWidget setSettings={setSettings} />

      <h3>Personal Schedule</h3>
      <button onClick={() => setShowCal(!showCal)}>
        {showCal ? "Close Calendar" : "Open Calendar"}
      </button>
      {showCal && <Calendar setEvents={setEvents}/>}

      <h3>Misc</h3>
      <input
        value={settings.misc}
        name="misc"
        type="text"
        placeholder="misc"
        onChange={handleChange}
      />
      <h3>Layout</h3>
      
      <ProfileForm setSettings={setSettings} settings={settings} />
      
      <h3>Users</h3>
      <p>
        Here is where you can add roommates, partners, kids. You will even be
        able to send them an email to invite them to join. You can input thier
        schedule as well and if they join they will see what has been given to
        them. If they are given persmissions they can edit thier own schedule.
      </p>
      <button onClick={handleUpdate}>Update Settings</button>
      <a href="/profile">
        <button>Skip</button>
      </a>
    </div>
  );
}
