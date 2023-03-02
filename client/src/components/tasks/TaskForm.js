import React, { useState, useContext } from 'react'
import { PicContext } from "../../context/picUploadContext";
import { AuthContext } from "../../context/authContext";
import { PermMedia } from "@mui/icons-material";


export default function TaskForm(props){
  const initInputs = {
    title: "",
    description: "",
    imgUrl: ""
  }
  const { myWidget, imgURL, setImgURL } = useContext(PicContext);
  const { updateTask } = useContext(AuthContext);
  const [inputs, setInputs] = useState(initInputs)
const { addTask } = props

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }


  function handleSubmit(e){
    e.preventDefault()
    addTask(inputs)
    setInputs(initInputs)
    
  }
  function handlePictureUpload() {
    setInputs(prev => ({...prev, imgUrl: imgURL }));
    setImgURL("");
  }
  function handlePictureRemove() {
    setInputs(prev => ({...prev, imgUrl: "" }));
    setImgURL("");
  }
  const { title, description, imgUrl } = inputs

  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="title" 
        value={title} 
        onChange={handleChange} 
        placeholder="Title"/>
      <input 
        type="text" 
        name="description" 
        value={description} 
        onChange={handleChange} 
        placeholder="Description"/>
       <div style={{display:"flex", gap:"10px"}}>
          <div
           
            onClick={() => myWidget.open()}
            title="Click to change"
          >
            <img alt="" src={imgUrl} />
            
            <PermMedia htmlColor="tomato" className="shareIcon" />

          </div>
    <button type="button" onClick={handlePictureUpload}>Confirm </button>
    <button type="button" onClick={handlePictureRemove}> Cancel </button>  
    </div>
      <button>Add Task</button>
    </form>
  )
}