import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [authenticated, setauthenticated] = useState(false)
  useEffect(() => {
    if (!localStorage.getItem("Token")) {
      navigate('/login');
      return;
    }
    setToken(localStorage.getItem("Token"))
    console.log(token);
    setauthenticated(true)

  }, []);
  function ProtectedRoute({ isExist, children }) {
    if (!isExist) {
      navigate("/login")
    }
    return children;
  }
  return (
    <div className='wrapper'>
      <Routes>
        <Route path='/' element={<ProtectedRoute isExist={authenticated}><Home></Home></ProtectedRoute>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
      </Routes>
    </div>
  )
}
export default App
