import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { clearAll } from '../utils/storage';

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const handleReset = () => {
    const ok = window.confirm(
      'This will delete all locally-stored decks, notes and progress. Continue?'
    );
    if (ok) {
      clearAll();
      window.location.reload();
    }
  };

  return (
    <div style={{ maxWidth: 480 }}>
      <h2>Settings</h2>
      <div style={row}>
        <div>
          <strong>Appearance</strong>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>
            Currently using the {theme} theme.
          </p>
        </div>
        <button onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'dark' : 'light'}
        </button>
      </div>
      <div style={row}>
        <div>
          <strong>Reset data</strong>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>
            Clear all saved study data on this device.
          </p>
        </div>
        <button style={{ color: '#ef4444' }} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

const row: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 0',
  borderBottom: '1px solid var(--border)',
};

export default Settings;
