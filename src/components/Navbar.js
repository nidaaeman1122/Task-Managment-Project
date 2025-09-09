import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Navbar = () => {
  return (
    <nav
      className="card flex"
      style={{ justifyContent: 'space-between', alignItems: 'center' }}
    >
      <h1>Task Manager</h1>
      <div className="flex">
        <Link to="/">Dashboard</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;
