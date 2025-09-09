import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find((u) => u.email === email)) {
      alert('Email already exists!');
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);

    // ✅ Save new user list
    localStorage.setItem('users', JSON.stringify(users));

    // ✅ Save logged-in user {name, email}
    localStorage.setItem('currentUser', JSON.stringify({ name, email }));

    navigate('/dashboard');
  };

  return (
    <div className="dashboard-container">
      <div className="card">
        <h3>Signup</h3>
        <form onSubmit={handleSignup} className="task-form" style={{ flexDirection: 'column', gap: '1rem' }}>
          <input
            className="task-input"
            type="text"
            placeholder="Enter your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="task-input"
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="task-input"
            type="password"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="task-button" type="submit">Signup</button>
        </form>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          Already have an account? <Link to="/login" style={{ color: '#4dabf7' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
