import { create } from 'zustand';


const useStore = create((set, get) => ({
  // Поточний користувач (null якщо не авторизований)
  user: null,

  // Cписок користувачів
  users: [
    { username: 'admin', password: '12345', name: 'Адмін' },
    { username: 'user', password: 'password', name: 'Користувач' },
    { username: 'demo', password: 'demo', name: 'Демо' }
  ],

  // Логін
  login: (username, password) => {
    const user = get().users.find(u => u.username === username && u.password === password);
    if (user) {
      set({ user: { name: user.name, username } });
      return true;
    }
    return false;
  },

  // Реєстрація
  register: (username, password, name) => {
    if (get().users.some(u => u.username === username)) {
      return { success: false, message: 'Логін вже зайнято!' };
    }
    set({ users: [...get().users, { username, password, name }] });
    return { success: true, message: 'Реєстрація успішна!' };
  },

  // Вихід
  logout: () => set({ user: null })
}));


export default useStore;
