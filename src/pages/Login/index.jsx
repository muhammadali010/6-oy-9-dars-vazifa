import React, { useRef, useState, useEffect } from 'react'
import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const usernameRef = useRef("");
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    if (!localStorage.getItem("Token")) {
      navigate('/login');
      return;
    }

    setToken(localStorage.getItem("Token"))

  }, []);


  function validate(username, password) {
    if (username.current.value < 3) {
      alert("username isn't valid");
      username.current.style.outlineColor = "red";
      username.current.focus();
      return false;
    }
    if (password.current.value < 3) {
      alert("password isn't valid");
      password.current.style.outlineColor = "red";
      password.current.focus();
      return false;
    }

    return true;
  }

  function handleLogin(event) {
    event.preventDefault();

    const isValid = validate(usernameRef, passwordRef);
    if (!isValid) {
      return;
    }

    let user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value
    }
    setDisable(true)
    fetch(`https://auth-rg69.onrender.com/api/auth/signin`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(data => data.json())
      .then(data => {
        if (data.message == 'Password hato') {
          alert(data.message)
          passwordRef.current.value = ""
          passwordRef.current.focus();
          return;
        }

        if (data.message == 'Bunaqa foydalanuvchi topilmadi!') {
          alert(data.message);
          navigate("/register")
          return;
        }

        if (data.accessToken) {
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("Token", data.Token);
          navigate('/home');
          return;
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(function () {
        setDisable(false)
      })

  }

  return (
    <div>
      <form autoComplete='off' action="" className={styles.form}>
        <h1>Login</h1>
        <input type="text" name="username" id="username" ref={usernameRef} placeholder='Enter username...' />
        <input autoComplete='off' type="password" name="password" id="password" ref={passwordRef} placeholder='Enter password...' />
        {
          disable ? <button disabled>Loading...</button> : <button onClick={handleLogin}>Login</button>
        }
      </form>
    </div>
  )
}

export default Login
