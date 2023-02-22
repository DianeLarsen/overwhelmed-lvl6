import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/authContext";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { PicContextProvider } from "./context/picUploadContext";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
   
    <DarkModeContextProvider>

      <AuthContextProvider>
<PicContextProvider >
        <App />
        </PicContextProvider>
      </AuthContextProvider>

    </DarkModeContextProvider>
  
  </React.StrictMode>
);
