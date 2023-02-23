import React, { useState, useContext } from "react";
import CreatableSelect from "react-select/creatable";
import layoutData from "../components/layoutData";
import makeAnimated from "react-select/animated";
import { AuthContext } from "../context/authContext.js";
const animatedComponents = makeAnimated();

export default function ProfileForm(props) {
  const { updateUser, userState } = useContext(AuthContext);
  const { user } = userState
  const { setSettings, settings } = props;
  const [goal, setGoal] = useState("");
  const [counter, setCounter] = useState(0);
  const [layout, setLayout] = useState([]);
  const [layoutDisplay, setLayoutDisplay] = useState(true);

  function handleGoalChange(e) {
    const { name, value } = e.target;
    setGoal((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }
  function handleGoalSubmit(e) {
    e.preventDefault();
    setSettings((prevInputs) => ({
      ...prevInputs,
      goal: goal,
    }));
  }
  function handleLayoutSubmit(e) {
    e.preventDefault();
    const layoutUpdate = { layout: layout };
    updateUser(layoutUpdate);
    toggleLayout()
    // setSettings((prevInputs) => ({
    //   ...prevInputs,
    //   layout
    // }))
  }
function toggleLayout(){
  setLayoutDisplay(prev => !prev)
}

  function handleLayoutChange(e) {
    const layoutInputs = e.map((prev) => ({ ...prev }));
    console.log(layoutInputs);
    setLayout(layoutInputs);
  }
  
  return (
    <div className="public">
      {layoutDisplay ? (
        <ul>
          {user.layout &&
            user.layout.map((stuff, index) => <li key={index}>{stuff.label}</li>)}
            <button onClick={toggleLayout}>Edit Layout</button>
        </ul>
      ) : (
        <form className="layout">
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
        </form>
      )}
      <h3>Goal</h3>
      <form className="calendar" onSubmit={handleGoalSubmit}>
        <textarea
          className="goal"
          value={goal}
          name="goal"
          onChange={handleGoalChange}
        />
        <button>Update Goal</button>
      </form>
    </div>
  );
}



