import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate=useNavigate();
  const [user, setUser] = useState({});
  useEffect(()=>{
    if(!localStorage.getItem("Token")){
      navigate("/login")
      return;
    }
      setUser(JSON.parse(localStorage.getItem("user")));
      console.log(user);
  }, [])
  return (
    <div>
      <h1>Hello</h1>
    </div>
  )
}

export default Home
