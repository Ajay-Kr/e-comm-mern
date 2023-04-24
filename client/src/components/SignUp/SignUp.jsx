import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';


const SignUp = () => {
  const [ name, setName ] = useState('');
  const [ password, setPassword] = useState('');
  const [ email, setEmail ] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    // console.log(auth);
    if(auth) {
      navigate('/');
    }
  });

  const collectData = async () => {
    // console.log(name, email, password);
    const signupUrl = 'http://localhost:8000/auth/register'
    let fetchedData = await fetch(signupUrl, {
      method: 'post',
      body: JSON.stringify({name, email, password}),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    fetchedData = await fetchedData.json();
    // console.log(fetchedData);
    localStorage.setItem('user', JSON.stringify(fetchedData.result))
    localStorage.setItem('token', JSON.stringify(fetchedData.auth))
    navigate('/');
  }

  return (
    <div className='register'>
      <h1>Register</h1>
      <input className='input-box' type="text" 
        value={ name } 
        onChange={ (e) => setName(e.target.value) } 
        placeholder='Enter Name' 
      />
      <input className='input-box' type="email" 
        value={ email } 
        onChange={ (e) => setEmail(e.target.value) } 
        placeholder='Enter Email' 
      />
      <input className='input-box' type="password" 
        value={ password } 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder='Enter Password' 
      />
      <button className='signup-button' type="button"
        onClick={collectData}>Sign Up</button>
    </div>
  );
}

export default SignUp;