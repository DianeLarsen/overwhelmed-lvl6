import React, { useState } from "react";

export default function ProfileForm(props) {
  const { setSettings } = props

  const initialLayout = {
    rooms: "",
    bathrooms: "",
    dining: "",
    living: "",
    office: "",
    kitchen: "",
    basement: "",
    attic: "",
    mudroom: "",
    frontYard: "",
    backYard: "",
    porch: "",
    deck: "",
    pool: "",
    spa: "",
    playset: "",
    playroom: "",
  };

  const [layoutInput, setLayoutInput] = useState(initialLayout);
 const [goal, setGoal] = useState("")

  const [counter, setCounter] = useState(0);
  const {
    rooms,
    bathrooms,
    dining,
    living,
    office,
    kitchen,
    basement,
    attic,
    mudroom,
    frontYard,
    backYard,
    porch,
    deck,
    pool,
    spa,
    playset,
    playroom,
  } = layoutInput;

  function handleChange(e) {
    const { name, value } = e.target;
    setLayoutInput((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  function addRoom() {
    setCounter(counter + 1);
  }
  function handleGoalChange(e){
    const { name, value } = e.target;
    setGoal((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }
  function handleSubmit(e){
    e.preventDefault()
    setSettings((prevInputs) => ({
      ...prevInputs,
      layout: layoutInput,
      goal: goal
    }))
    setLayoutInput(initialLayout)
  }
  return (
    <div className="public">
     
        <form className="layout" onSubmit={handleSubmit}>
      <label htmlFor="rooms" />
      <input
        type="tel"
        name="rooms"
        placeholder="Bedrooms"
        onChange={handleChange}
        value={rooms}
      />
      <input
        type="tel"
        name="bathrooms"
        placeholder="Bathrooms"
        onChange={handleChange}
        value={bathrooms}
      />
      <input
        type="tel"
        name="dining"
        placeholder="Dining Room"
        onChange={handleChange}
        value={dining}
      />
      <input
        type="tel"
        name="living"
        placeholder="Living Room"
        onChange={handleChange}
        value={living}
      />
      <input
        type="tel"
        name="office"
        placeholder="Office"
        onChange={handleChange}
        value={office}
      />
      <input
        type="tel"
        name="playroom"
        placeholder="Playroom"
        onChange={handleChange}
        value={playroom}
      />
      <input
        type="tel"
        name="kitchen"
        placeholder="Kitchen"
        onChange={handleChange}
        value={kitchen}
      />
      <input
        type="tel"
        name="basement"
        placeholder="Basement"
        onChange={handleChange}
        value={basement}
      />
      <input
        type="tel"
        name="attic"
        placeholder="Attic"
        onChange={handleChange}
        value={attic}
      />
      <input
        type="tel"
        name="mudroom"
        placeholder="Mudroom"
        onChange={handleChange}
        value={mudroom}
      />
      <input
        type="tel"
        name="frontYard"
        placeholder="Front Yard"
        onChange={handleChange}
        value={frontYard}
      />
      <input
        type="tel"
        name="backYard"
        placeholder="Back Yard"
        onChange={handleChange}
        value={backYard}
      />
      <input
        type="tel"
        name="porch"
        placeholder="Porch"
        onChange={handleChange}
        value={porch}
      />
      <input
        type="tel"
        name="deck"
        placeholder="Deck"
        onChange={handleChange}
        value={deck}
      />
      <input
        type="tel"
        name="pool"
        placeholder="Pool"
        onChange={handleChange}
        value={pool}
      />
      <input
        type="tel"
        name="spa"
        placeholder="Spa"
        onChange={handleChange}
        value={spa}
      />
      <input
        type="tel"
        name="playset"
        placeholder="Play Set"
        onChange={handleChange}
        value={playset}
      />
      {Array.from(Array(counter)).map((c, index) => {
        return (
          <React.Fragment key={index}>
            <label htmlFor={`addedRoom${index}`}>
              {" "}
              Added Room # {index + 1}{" "}
            </label>
            <input
              type="text"
              name={`addedRoom${index}`}
              placeholder="Type in name of Room"
              onChange={handleChange}
            />{" "}
          </React.Fragment>
        );
      })}
      <button onClick={addRoom}>Add a Room</button>
      <button type="submit">Update Layout</button>
      </form>
      <h3>Goal</h3>
      <form className="calendar" onSubmit={handleSubmit}>
        <textarea className="goal" value={goal} name="goal" onChange={handleGoalChange}/>
        <button>Update Goal</button>
        </form>
    </div>
  );
}

// by entering a number it creates that number of inputs to name items, like master bedroom, or kids bedroom
// for bathrooms it gives option of full bath, seperate bath/shower, just shower, half bath(sink and toilet)
// for porch and deck if 1 is entered askes if its front or back, if 2 it brings up 2 inputs drop downs so you can say 2 front or one of each
// button to add a room brings up another input
