import React, { useState } from 'react';
import './App.css';
import useStore from './store';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

export default function App() {
  const { user, logout } = useStore();
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="app-container">
      {user ? (
        <div className="dashboard">
          <div className="user-card">
            <div className="avatar">{user.name[0].toUpperCase()}</div>
            <h1 className="welcome">Привіт, {user.name}!</h1>
            <button className="logout-btn" onClick={logout}>Вийти</button>
          </div>
        </div>
      ) : showRegister ? (
        <Register switchToLogin={() => setShowRegister(false)} />
      ) : (
        <Login switchToRegister={() => setShowRegister(true)} />
      )}
    </div>
  );
}