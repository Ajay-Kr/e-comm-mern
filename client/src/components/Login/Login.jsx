import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if(auth) navigate('/')
  }, []);

  const handleLogin = async () => {
    const loginUrl = 'http://localhost:8000/auth/login';
    let fetchedData = await fetch(loginUrl, 
    {
      method: 'post',
      body: JSON.stringify({email, password}),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    fetchedData = await fetchedData.json();
    if(fetchedData.auth) {
      localStorage.setItem('user', JSON.stringify(fetchedData.user));
      localStorage.setItem('token', JSON.stringify(fetchedData.auth));
      
      navigate('/');
    } else {
      alert('Please enter correct detail');
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <input type="email" className="input-box" 
        placeholder='Enter email' 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
      />
      <input type="password" className="input-box" 
        placeholder='Enter password'
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleLogin} className="login-button" type="button" >Login</button>
    </div>
  );
}

export default Login;