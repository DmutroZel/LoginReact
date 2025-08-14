import React, { useState } from 'react';
import './login.css';
import useStore from '../../store';

// Компонент форми входу
export default function Login({ switchToRegister }) {
  // Стан для полів форми та повідомлень
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useStore();

  // Обробка входу: перевірка полів і виклик функції з магазину
  const handleLogin = async () => {
    if (!loginInput.trim() || !passwordInput.trim()) return setError('Заповніть усі поля!');

    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const success = login(loginInput, passwordInput);
      if (!success) setError('Невірний логін або пароль');
      setIsLoading(false);
    }, 800);
  };

  // Обробка натискання клавіші Enter для відправки форми
  const handleKeyPress = (e) => e.key === 'Enter' && handleLogin();

  return (
    <div className="login-container">
     
      <div className="login-header">
        <h2>Вхід в систему</h2>
        <p>Введіть свої дані</p>
      </div>

      {/* Повідомлення про помилку */}
      {error && <div className="error-message">{error}</div>}

      {/* Поле для вводу логіну */}
      <div className="input-group">
        <input type="text" placeholder="Логін" value={loginInput} onChange={(e) => setLoginInput(e.target.value)} onKeyPress={handleKeyPress} disabled={isLoading} />
      </div>

      {/* Поле для вводу пароля */}
      <div className="input-group">
        <input type="password" placeholder="Пароль" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} onKeyPress={handleKeyPress} disabled={isLoading} />
      </div>

      {/* Кнопка відправки форми */}
      <button className="login-btn" onClick={handleLogin} disabled={isLoading}>
        {isLoading ? 'Входимо...' : 'Увійти'}
      </button>

      {/* Посилання для переходу до реєстрації */}
      <div className="switch-form">
        <p>Немає акаунту? <button className="link-btn" onClick={switchToRegister}>Зареєструватись</button></p>
      </div>
    </div>
  );
}