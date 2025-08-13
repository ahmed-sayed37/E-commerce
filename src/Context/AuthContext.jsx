import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let authContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));



  async function verifyToken() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      localStorage.setItem("userId", data.decoded.id);


    } catch (err) {
      console.log(err);

      setToken(null)
      localStorage.removeItem("token")
    }
  }

  useEffect(() => {
    verifyToken();
  }, []);


  
  return (
    <authContext.Provider value={{ token, setToken, verifyToken }}>
      {children}
    </authContext.Provider>
  );
}
