import { useEffect, useState, useContext } from "react";
import Calendar from "../components/Calendar";
import CloudinaryUploadWidget from "../Widget/CloudinaryUploadWidget";
import { UserContext } from "../context/UserProvider.js";
import ProfileForm from "../components/ProfileForm";


// need to setNewUser to false after setup complete
export default function Settings() {
  const { setNewUser, newUser, updateUser } = useContext(UserContext);
  const [settingsUpdated, setSettingsUpdated] = useState(false);
  const initialSettings = {
    schedule: "",
    layout: "",
    imgUrl: ""
  }
  const [settings, setSettings] = useState(initialSettings);
  const [ showCal, setShowCal] = useState(false)
  //  console.log(settings);
  // console.log(newUser)
  
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
function handleUpdate(){
  setSettingsUpdated(!settingsUpdated);
   setNewUser(false)
   updateUser(settings)
}



  return (
    <div className="setup">
      {newUser && <h1>Settings</h1>}
      {settingsUpdated ? (
        <div style={{color:"green"}}>Your settings have up updated!</div>
      ) : (
        <div style={{color:"red"}}>Your settings have NOT been updated!</div>
      )}
        
         <CloudinaryUploadWidget setSettings={setSettings}/>
      <h3>Personal Schedule</h3>
      <button onClick={() => setShowCal(!showCal)}>{showCal ? "Close Calendar" : "Open Calendar"}</button>
      {showCal && <Calendar />}
 
      <h3>Misc</h3>
            <input
        value={settings.misc}
        name="misc"
        type="text"
        placeholder="misc"
        onChange={handleChange}
      />
      <h3>Layout</h3>
      <ProfileForm setSettings={setSettings}/>
      <h3>Users</h3>
      <p>
        Here is where you can add roommates, partners, kids. You will even be
        able to send them an email to invite them to join. You can input thier
        schedule as well and if they join they will see what has been given to
        them. If they are given persmissions they can edit thier own schedule.
      </p>
      <button onClick={handleUpdate}>
        Update Settings
      </button>
      <a href="/profile"><button>Skip</button></a>
    

  
    </div>
  );
}
