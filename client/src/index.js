import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/authContext";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { PicContextProvider } from "./context/picUploadContext";
import { ConfirmContextProvider } from "./context/ConfirmContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
   
    <DarkModeContextProvider>
    <ConfirmContextProvider>
      <AuthContextProvider>
<PicContextProvider >
        <App />
     
        </PicContextProvider>
      </AuthContextProvider>
      </ConfirmContextProvider>
    </DarkModeContextProvider>
  
  </React.StrictMode>
);
