import React, {useContext} from 'react'
import TaskForm from '../../components/tasks/TaskForm.js'
import TaskList from '../../components/tasks/TaskList.js'
import ProfileCard from "../../components/ProfileCard";

import { AuthContext } from '../../context/authContext'
// import ProfilePic from "./ProfilePic"



export default function Tasks(){
    const {userState, addTask} = useContext(AuthContext)
  
const {user, tasks} = userState

const { name } = user

console.log(name)
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
  return (
    <div className="profile">
       <ProfileCard/>
      
      {/* <img src="https://images.unsplash.com/photo-1675526193131-83c24921f33c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1228&q=80"/> */}
      <p>placeholder for goal</p>
      <a href="/settings" >Edit Profile</a>
      <h1>Welcome {capitalizeFirstLetter(name)}!</h1>
      <h3>Add A Task</h3>
      <TaskForm addTask={addTask}/>
      <h3>Your Tasks</h3>
      <TaskList tasks={tasks}/>
    </div>
  )
}