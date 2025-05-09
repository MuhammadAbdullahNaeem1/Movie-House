import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function ToggleButton() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleDarkMode}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px 20px',
        backgroundColor: darkMode ? '#333' : '#fff',
        color: darkMode ? '#fff' : '#333',
        border: 'none',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
        cursor: 'pointer',
      }}
    >
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}

export default ToggleButton; 