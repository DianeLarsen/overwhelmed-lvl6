import Navbar from "../components/navbar/Navbar";
import RightBar from "../components/rightBar/RightBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function AppLayout() {
  const [show, setShow] = useState(true)
  return (
    <div>
      <Navbar />
      <div style={{display: "flex", justifyContent: "flex-end"}}>
      <button onClick={()=> setShow(!show)}>{show ? "Hide Social Bar":"Show Social Bar"}</button>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 6 }}>
          <Outlet />
          
        </div>
        
        
        {show && <RightBar />}
        
      </div>
    </div>
  );
}
