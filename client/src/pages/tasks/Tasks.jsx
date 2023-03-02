import React, { useContext } from "react";
import TaskForm from "../../components/tasks/TaskForm.js";
import TaskList from "../../components/tasks/TaskList.js";
import ProfileCard from "../../components/ProfileCard";

import { AuthContext } from "../../context/authContext";
// import ProfilePic from "./ProfilePic"

export default function Tasks() {
  const { userState, addTask } = useContext(AuthContext);

  const { user, tasks } = userState;

  const { name } = user;


  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="profile">
      <ProfileCard />
<div className="tasksArea">
      <a href="/settings">Edit Profile</a>
      <h1>Welcome {capitalizeFirstLetter(name)}!</h1>
      <h3>Add A Task</h3>
      <TaskForm addTask={addTask} />
      <h3>Your Tasks</h3>
      <TaskList tasks={tasks} />
      </div>
    </div>
  );
}
