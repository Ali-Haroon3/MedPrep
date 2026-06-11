import React from 'react';

const SHORTCUTS: { keys: string; action: string }[] = [
  { keys: 'Space', action: 'Flip the current card' },
  { keys: '1', action: 'Grade "Again" (forgot)' },
  { keys: '2', action: 'Grade "Hard"' },
  { keys: '3', action: 'Grade "Good"' },
  { keys: '4', action: 'Grade "Easy"' },
  { keys: '?', action: 'Toggle this help' },
];

interface ShortcutHelpProps {
  open: boolean;
  onClose: () => void;
}

const ShortcutHelp: React.FC<ShortcutHelpProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div style={overlay} onClick={onClose}>
      <div style={panel} onClick={(e) => e.stopPropagation()}>
        <h3 style={{ marginTop: 0 }}>Keyboard shortcuts</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {SHORTCUTS.map((s) => (
              <tr key={s.keys}>
                <td style={{ padding: '0.35rem 0' }}>
                  <kbd style={kbd}>{s.keys}</kbd>
                </td>
                <td style={{ color: '#475569' }}>{s.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button style={{ marginTop: '1rem' }} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const overlay: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(15,23,42,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 50,
};
const panel: React.CSSProperties = {
  background: '#fff',
  borderRadius: 12,
  padding: '1.5rem',
  minWidth: 320,
};
const kbd: React.CSSProperties = {
  background: '#f1f5f9',
  border: '1px solid #cbd5e1',
  borderRadius: 6,
  padding: '0.1rem 0.5rem',
  fontFamily: 'monospace',
};

export default ShortcutHelp;
