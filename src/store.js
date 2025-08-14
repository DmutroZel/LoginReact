import { create } from 'zustand';

// Створення магазину стану з Zustand
const useStore = create((set, get) => ({
  // Поточний користувач (null, якщо не авторизований)
  user: null,

  // Початковий список користувачів
  users: [
    { username: 'admin', password: '12345', name: 'Адмін' },
    { username: 'user', password: 'password', name: 'Користувач' },
    { username: 'demo', password: 'demo', name: 'Демо' }
  ],

  // Логін: перевірка логіну та пароля, збереження користувача в стан
  login: (username, password) => {
    const user = get().users.find(u => u.username === username && u.password === password);
    if (user) {
      set({ user: { name: user.name, username } });
      return true;
    }
    return false;
  },

  // Реєстрація: перевірка унікальності логіну та додавання нового користувача
  register: (username, password, name) => {
    if (get().users.some(u => u.username === username)) {
      return { success: false, message: 'Логін вже зайнято!' };
    }
    set({ users: [...get().users, { username, password, name }] });
    return { success: true, message: 'Реєстрація успішна!' };
  },

  // Вихід: скидання стану користувача
  logout: () => set({ user: null })
}));

export default useStore;