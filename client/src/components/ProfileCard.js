import React, { useContext, useEffect, useState } from "react";
import "./ProfileImage.scss";

import { AuthContext } from "../context/authContext";
import { PicContext } from "../context/picUploadContext";
import { ConfirmContext } from "../context/ConfirmContext";

export default function ProfileCard() {
  const { userState, updateUser } = useContext(AuthContext);
  const { myWidget, imgURL, setImgURL } = useContext(PicContext);
  const { Confirm } = useContext(ConfirmContext);
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
    e.preventDefault(e);
    updateUser(inputs);
    setActive(!active);
  }
console.log(active)
  function handlePictureUpload() {
    updateUser({ profilePicture: imgURL });
    setImgURL("");
  }
  function notSaved(e) {
    if (active) {
      Confirm.open({
        title: "Profile Image",
        message:
          "Would you like to Save or Cancel your Changes?  note: if Cancelled changes will be lost",
        okText: "Save",
        cancelText: "Cancel",
        onok: () => {
          handleSubmit(e);
        },
        oncancel: () => {
          return;
        },
      });
    }
  }

  function imgClickHandler() {
    Confirm.open({
      title: "Profile Image",
      message: "Would you like to Change or Remove your Profile Image?",
      okText: "Change",
      cancelText: "Remove",
      onok: () => {
        myWidget.open();
      },
      oncancel: () => {
        updateUser({
          profilePicture:
            "https://res.cloudinary.com/dqjh46sk5/image/upload/v1677786781/zpoquv2r7p88ahgupk0d.jpg",
        });
      },
    });
  }
  return (
    <div className="body">
      <div className="card" onBlur={notSaved}>
        <div className="custom-file-upload">
          <div
            className="img-wrap"
            onClick={() => imgClickHandler()}
            title="Click to change Profile Picture"
          >
            {imgURL ? (
               <img alt="" src={imgURL } />
              // <i className="fa-solid fa-upload img-upload"></i>
            ) : (
              <img alt="" src={profilePicture} />
            )}
          </div>
          {imgURL && (
            <button onClick={handlePictureUpload}>Click to Confirm</button>
          )}
        </div>
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
        {active && (
          <button
            title="Submit"
            type="submit"
            className="profileBtn"
            onClick={handleSubmit}
          >
            <i className={`fa-solid fa-check`}></i>
          </button>
        )}

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
        <div className="name">Tasks completed: {tasks ? tasks.length : 0}</div>
      </div>
    </div>
  );
}
