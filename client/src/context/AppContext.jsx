import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedin, setisLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  const getAuthState = async () => {
    try {
      const {data} = await axios.get(backendUrl+ '/api/auth/is-auth')
      if(data.success){
        setisLoggedin(true)
        getUserData()
      }
    } catch (error) {
       toast.error(error.message);
    }
  }

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`, {
        withCredentials: true, // ✅ cookies ke liye
      });

      if (data.success) {
        setUserData(data.user); // ✅ user ka data set karo
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(()=>{getAuthState()},[])

  const value = {
    backendUrl,
    isLoggedin,
    setisLoggedin,
    userData,
    setUserData,
    getUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
