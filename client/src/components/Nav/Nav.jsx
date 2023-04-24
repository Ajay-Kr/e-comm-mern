import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './nav.css';

const Nav = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem('user');

  const logout = () => {
    localStorage.clear();
    navigate('/auth/login');
  }

  return (
    <div>
      <img 
        className="logo"
        src="data:image/png;base64,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" 
        alt="Product Icon" 
      />
      {
        auth
        ? <ul className="nav-ul">
            <li><Link to="/">Products</Link></li>
            <li><Link to="/add">Add Products</Link></li>
            {/* <li><Link to="/update">Update Products</Link></li> */}
            <li><Link to="/profile">Profile</Link></li>
            <li><Link onClick={logout} to="/auth/login">Logout ({JSON.parse(auth).name})</Link></li>
          </ul>
        : <ul className="nav-ul nav-right">
            <li><Link to="/auth/signup">Sign Up</Link></li> 
            <li><Link to="/auth/login">Login</Link></li> 
          </ul>
      }
    </div>
  );
}

export default Nav;