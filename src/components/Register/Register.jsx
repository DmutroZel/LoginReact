import React, { useState } from 'react';
import './Register.css';
import useStore from '../../store';

// Компонент форми реєстрації
export default function Register({ switchToLogin }) {
  // Стан для полів форми та повідомлень
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useStore();

  // Обробка реєстрації: перевірка полів і виклик функції з магазину
  const handleRegister = async () => {
    if (!username.trim() || !password.trim() || !name.trim()) return setMessage('Заповніть усі поля!');
    if (password.length < 3) return setMessage('Пароль має бути від 3 символів!');

    setIsLoading(true);
    setMessage('');

    setTimeout(() => {
      const { success, message } = register(username, password, name);
      setMessage(message);
      if (success) setTimeout(switchToLogin, 2000);
      setIsLoading(false);
    }, 800);
  };

  // Обробка натискання клавіші Enter для відправки форми
  const handleKeyPress = (e) => e.key === 'Enter' && handleRegister();

  return (
    <div className="login-container">
      {/* Заголовок форми */}
      <div className="login-header">
        <h2>Реєстрація</h2>
        <p>Створіть новий акаунт</p>
      </div>

      {/* Повідомлення про успіх або помилку */}
      {message && (
        <div className={`message ${message.includes('успішна') ? 'success-message' : 'error-message'}`}>
          {message}
        </div>
      )}

      {/* Поле для вводу імені */}
      <div className="input-group">
        <input type="text" placeholder="Повне ім'я" value={name} onChange={(e) => setName(e.target.value)} onKeyPress={handleKeyPress} disabled={isLoading} />
      </div>

      {/* Поле для вводу логіну */}
      <div className="input-group">
        <input type="text" placeholder="Логін" value={username} onChange={(e) => setUsername(e.target.value)} onKeyPress={handleKeyPress} disabled={isLoading} />
      </div>

      {/* Поле для вводу пароля */}
      <div className="input-group">
        <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress} disabled={isLoading} />
      </div>

      {/* Кнопка відправки форми */}
      <button className="login-btn" onClick={handleRegister} disabled={isLoading}>
        {isLoading ? 'Реєструємо...' : 'Зареєструватись'}
      </button>

      {/* Посилання для переходу до входу */}
      <div className="switch-form">
        <p>Вже маєте акаунт? <button className="link-btn" onClick={switchToLogin}>Увійти</button></p>
      </div>
    </div>
  );
}