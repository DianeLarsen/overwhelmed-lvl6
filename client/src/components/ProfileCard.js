import React, { useContext, useEffect, useState } from "react";
import "./ProfileImage.css";
import { AuthContext } from "../context/authContext";
import { PicContext } from "../context/picUploadContext";

export default function ProfileCard() {
  const { userState, updateUser } = useContext(AuthContext);
  const { myWidget, imgURL, setImgURL } = useContext(PicContext);
  const { user } = userState;

  const { name, profilePicture } = user;

  const initalCard = {
    imagePreviewUrl: profilePicture, 
    status: "",
    active: true,
  };
  const [inputs, setInputs] = useState(initalCard);
  const [card, setCard] = useState(initalCard);
  const [active, setActive] = useState(false);

  const [btnText, setBtnText] = useState("fa-pen");

  function handleChange(e) {
    const { value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      status: value,
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    setCard(inputs);
  }
  useEffect(() => {
    if (active === true) {
      setBtnText("fa-check");
    } else {
      setBtnText("fa-pen");
    }
  }, [active]);

  function toggleActive() {
    if (btnText === "fa-check") {
      setActive((prev) => !prev);
    } else {
      setActive((prev) => !prev);
    }
  }

  function handlePictureUpload(){
    updateUser({profilePicture: imgURL})
    setImgURL("")
  }
  return (
    <div className="body">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <label className="custom-file-upload fas">
            <div className="img-wrap" onClick={() => myWidget.open()} title="Click to change Profile Picture">
              
              <img alt="" src={card.imagePreviewUrl} />
            </div>
            {imgURL && <button onClick={handlePictureUpload}>Click to Confirm</button>}
          </label>
          <div className="name">{name}</div>
          <br />
          {!active ? (
            <div className="status">
              {card.status || "It's a beautiful Day"}
            </div>
          ) : (
            <div className="field">
              <label htmlFor="status">status:</label>
              <input
                id="status"
                type="text"
                onChange={handleChange}
                maxLength="35"
                value={inputs.status}
                placeholder="It's a nice day!"
                required
              />
            </div>
          )}
          <br />
          <div className="name">
            Tasks completed: (placeholder for task number)
          </div>

          <button type="submit" className="profileBtn" onClick={toggleActive}>
            <i className={`fa-solid ${btnText}`}></i>
          </button>
        </form>
      </div>
    </div>
  );
}
