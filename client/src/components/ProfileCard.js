import React, { useContext, useEffect, useState } from "react";
import "./ProfileImage.scss";
import { AuthContext } from "../context/authContext";
import { PicContext } from "../context/picUploadContext";

export default function ProfileCard() {
  const { userState, updateUser } = useContext(AuthContext);
  const { myWidget, imgURL, setImgURL } = useContext(PicContext);
  const { user } = userState;

  const { name, profilePicture, goal, status, tasks } = user;
  const initalCard = {
    goal: goal || "",
    status: status || "",
  };

  const [inputs, setInputs] = useState(initalCard);

  const [active, setActive] = useState(false);


  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }
 

  function handleSubmit(e) {
    e.preventDefault();
    updateUser(inputs);
    setActive(!active)
   }
 

  function handlePictureUpload() {
    updateUser({ profilePicture: imgURL });
    setImgURL("");
  }
function notSaved(e){
  if (active){
    if(!window.confirm("You are currently editing, Are you done (OK) or would you like to keep editing  (Cancel)?")){
      e.preventDefault()

    } else {
      handleSubmit(e)
    }
  }
}

  return (
    <div className="body" >
      <div className="card" onBlur={notSaved}>
        <label className="custom-file-upload fas">
          <div
            className="img-wrap"
            onClick={() => myWidget.open()}
            title="Click to change Profile Picture"
          >
            <img alt="" src={profilePicture} />
          </div>
          {imgURL && (
            <button onClick={handlePictureUpload}>Click to Confirm</button>
          )}
        </label>
        <div className="name">{name}</div>
        <br />
        
        {!active ? (
          <div className="status">
            <div className="goal">Goal: {goal}</div>
            {status || "It's a beautiful day!"}
          </div>
        ) : (
          <>
            <div className="field">
              <label htmlFor="goal">goal:</label>
              <textarea
              id="goal"
                className="goal"
                value={inputs.goal}
                name="goal"
                onChange={handleChange}
              />
              <label htmlFor="status">status:</label>
              <input
                id="status"
                name="status"
                type="text"
                onChange={handleChange}
                maxLength="35"
                value={inputs.status}
                placeholder="It's a beautiful day!"
                required
              />
            </div>
           
            </>
        )}
        {active && <button
        title="Submit"
            type="submit"
              className="profileBtn"
              onClick={handleSubmit}
            >
              <i className={`fa-solid fa-check`}></i>
            </button>}
        
        <br />
        
        {!active && (
          <button
            type="button"
            className="profileBtn"
            title="Edit"
            onClick={() => setActive(!active)}
          >
            <i className={`fa-solid fa-pen`}></i>
          </button>
        )}
        <div className="name">
          Tasks completed: {tasks ? tasks.length : 0}
        </div>
      </div>
    </div>
  );
}
