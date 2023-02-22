import React from 'react'
import Task from './Task.js'

export default function TaskList(props){
    const { tasks } = props
  return (
    <div className="task-list">
        {tasks && tasks.map(task => <Task {...task} key={task._id}/>) }
    </div>
  )
}