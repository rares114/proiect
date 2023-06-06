import React from 'react';
import { Link } from 'react-router-dom';

const PrimaryNavbar = () => {
  return (
    <div className="primary-navbar">
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/register">
        <button className='regBtn'>Register</button>
      </Link>
      <Link to="/faq">
        <button>FAQ</button>
      </Link>
      <Link to="/about">
        <button>About Us</button>
      </Link>
      <Link to="/contact">
        <button>Contact Us</button>
      </Link>
    </div>
  );
};

export default PrimaryNavbar;
