import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  
  const [err, setErr] = useState(null);
  function register (inputs) {
   axios.post("http://localhost:9000/api/auth/register", inputs)
   .then(res=>console.log(res.data))
   .catch ((err)=> setErr(err.response.data));
    }


  const login = async (inputs) => {
    const res = await axios.post("http://localhost:9000/api/auth/login", inputs, {
      withCredentials: true,
    });

    setCurrentUser(res.data)
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, register, err }}>
      {children}
    </AuthContext.Provider>
  );
};
