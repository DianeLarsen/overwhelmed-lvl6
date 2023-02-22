import Navbar from "../components/navbar/Navbar";
import RightBar from "../components/rightBar/RightBar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <div style={{ flex: 6 }}>
          <Outlet />
        </div>
        <RightBar />
      </div>
    </div>
  );
}
