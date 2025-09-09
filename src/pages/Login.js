import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      // ✅ Save both name & email
      localStorage.setItem('currentUser', JSON.stringify({ name: user.name, email: user.email }));
      navigate('/dashboard');
    } else {
      alert('Invalid email or password!');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="card">
        <h3>Login</h3>
        <form onSubmit={handleLogin} className="task-form" style={{ flexDirection: 'column', gap: '1rem' }}>
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
          <button className="task-button" type="submit">Login</button>
        </form>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          Don’t have an account? <Link to="/signup" style={{ color: '#4dabf7' }}>Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
