import React, { useState, useContext } from "react";
import CreatableSelect from "react-select/creatable";
import layoutData from "./layoutData";
import makeAnimated from "react-select/animated";
import { AuthContext } from "../context/authContext.js";
const animatedComponents = makeAnimated();

export default function ProfileForm() {
  const { updateUser, userState } = useContext(AuthContext);
  const { user } = userState
  

  const [counter, setCounter] = useState(0);
  const [layout, setLayout] = useState("");
  const [layoutDisplay, setLayoutDisplay] = useState(true);


  // console.log(settings)
  function handleLayoutSubmit(e) {
    e.preventDefault();
    const layoutUpdate = { layout: layout };
    updateUser(layoutUpdate);
    toggleLayout()
 }
function toggleLayout(){
  setLayoutDisplay(prev => !prev)
}
function notSaved(e){
  if (!layoutDisplay && layout !== ""){
    if(!window.confirm("You are currently editing, Are you done (OK) or would you like to keep editing (Cancel)?")){
      e.preventDefault()

    } else {
      handleLayoutSubmit(e)
    }
  } else {
    toggleLayout()
  }
}
  function handleLayoutChange(e) {
    const layoutInputs = e.map((prev) => ({ ...prev }));
    // console.log(layoutInputs);
    setLayout(layoutInputs);
  }
  // console.log(!layoutDisplay && layout !== "")
  return (
    <div className="public">
      <form className="layout" onBlur={notSaved}>
      {layoutDisplay ? (
        <ul>
          {user.layout &&
            user.layout.map((stuff, index) => <li key={index}>{stuff.label}</li>)}
            <button onClick={toggleLayout}>Edit Layout</button>
        </ul>
      ) : (
        <>
          <CreatableSelect
            options={layoutData}
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            onChange={handleLayoutChange}
          />
  {user.layout &&
            user.layout.map((stuff, index) => <li key={index}>{stuff.label} <button>X</button><button>edit</button></li>)}
          <button onClick={handleLayoutSubmit} type="submit">
            Update Layout
          </button>
          <button onClick={notSaved}>Cancel</button>
          </>
      )}
     
     </form>
    </div>
  );
}



