import React from 'react'

export default function Task(props){
    const { title, description, imgUrl} = props
  return (
    <div className="task">
        <h1>{ title }</h1>
        <h3>{ description }</h3>
        <img src={ imgUrl } alt="" width={300}/>
    </div>
  )
}