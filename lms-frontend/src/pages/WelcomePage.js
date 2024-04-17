import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div>
      <h1>Welcome to the Learning Management System</h1>
      <p>Get started by registering or logging in.</p>
      <Link to="/register">
        <button>Register</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default WelcomePage;
