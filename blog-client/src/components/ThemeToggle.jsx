import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeProvider';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
// console.log("rendered")
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:ring-2 hover:ring-offset-2 hover:ring-indigo-500 transition"
    >
      {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
  );
};

export default ThemeToggle;