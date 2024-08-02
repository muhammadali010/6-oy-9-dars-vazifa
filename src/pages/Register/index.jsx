import React, {useRef, useState} from 'react'
import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';


function Register() {
  const usernameRef = useRef("");
  const emailRef=useRef();
  const passwordRef=useRef();
  const rePasswordRef=useRef();
  const navigate=useNavigate();
  const [disable, setDisable] = useState(false);



  function validate(username, email, password, repassword){
    if(username.current.value<3){
      alert("Username da hato");
      username.current.focus();
      username.current.style.outlineColor="red";
      return false;
    }

    if(email.current.value<3){
      alert("Email da hato ");
      email.current.focus();
      email.current.style.outlineColor="red";
      return false;
    }

    if(password.current.value<3){
      alert("Password da hato");
      password.current.focus();
      password.current.style.outlineColor="red";
      return false;
    }

    if(repassword.current.value<3){
      alert("Password2 da hato");
      repassword.current.focus();
      repassword.current.style.outlineColor="red";
      return false;
    }
    return true;
  }

  function handleRegister(event){
    event.preventDefault();
    const isValid=validate(usernameRef, emailRef, passwordRef, rePasswordRef);
    if(!isValid){
      return;
    }
    const user={
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    console.log(user);
    setDisable(true)
    fetch(`https://auth-rg69.onrender.com/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(data=>data.json())
    .then(data=>{
      
      if(data.message == "Email ishlatilgan"){
        emailRef.current.style.outliColor="red";
        emailRef.current.focus();
        return;
      }

      if(data.message == ' Username ishlatilgan'){
        usernameRef.current.style.outliColor="red";
        usernameRef.current.focus();
        return;
      }

      if(data.message == 'Foydalanuvchi royhatdan otdi'){
        navigate("/login");
      }

    })
    .catch(err=>{
      console.log(err);
    })
    .finally(function(){
      setDisable(false)
    })


  }

  return (
    <div>
      <form action="" className={styles.form}>
        <h1>Registration</h1>
        <input type="text" name="username" id="username" ref={usernameRef} placeholder='Enter username...' />
        <input type="email" name="email" id="email" ref={emailRef} placeholder='Enter email...' />
        <input type="password" name="password" id="password" ref={passwordRef} placeholder='Enter password...' autoComplete='off' />
        <input type="password" name="rePassword" id="rePassword" ref={rePasswordRef} placeholder='Enter password...' autoComplete='off' />
        {
          disable ? <button disabled>Loading...</button> : <button onClick={handleRegister}>Register</button>
        }
      </form>
    </div>
  )
}

export default Register
