import { createContext, useContext, useEffect, useState } from 'react';
import { Icon } from './icons.jsx';

export const THEMES = [
  { id: 'classic', name: 'Classic', swatch: ['#fbfaf8', '#8a2d3b'] },
  { id: 'midnight', name: 'Midnight', swatch: ['#0f1424', '#e0b45a'] },
  // { id: 'forest', name: 'Forest', swatch: ['#f6faf6', '#1f6b46'] },
  // { id: 'ocean', name: 'Ocean', swatch: ['#f4f9fc', '#0b6e99'] },
  // { id: 'rose', name: 'Rose', swatch: ['#fff7f8', '#c2305a'] },
  // { id: 'ember', name: 'Ember', swatch: ['#1a1210', '#ff7a45'] },
];

export const ICON_STYLES = [
  { id: 'line', name: 'Line' },
  // { id: 'duo', name: 'Duotone' },
  // { id: 'badge', name: 'Badge' },
  // { id: 'ring', name: 'Ring' },
];

const Ctx = createContext(null);
const save = (k, v) => { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } };

export function ThemeProvider({ children }) {
  const root = document.documentElement;
  const [theme, setTheme] = useState(root.dataset.theme || 'classic');
  const [icons, setIcons] = useState(root.dataset.icons || 'duo');

  useEffect(() => { root.dataset.theme = theme; save('pa-theme', theme); }, [theme, root]);
  useEffect(() => { root.dataset.icons = icons; save('pa-icons', icons); }, [icons, root]);

  return <Ctx.Provider value={{ theme, setTheme, icons, setIcons }}>{children}</Ctx.Provider>;
}

export const useTheme = () => useContext(Ctx);

/** Floating panel: pick a colour theme and an icon style; changes apply instantly. */
export function ThemePanel() {
  const { theme, setTheme, icons, setIcons } = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="theme-wrap">
      {open && (
        <div className="theme-panel" role="dialog" aria-label="Appearance">
          <h2>Colour theme</h2>
          <div className="swatches">
            {THEMES.map((t) => (
              <button key={t.id} aria-pressed={theme === t.id} onClick={() => setTheme(t.id)}>
                <span className="swatch" style={{ background: `linear-gradient(135deg, ${t.swatch[0]} 50%, ${t.swatch[1]} 50%)` }} />
                {t.name}
              </button>
            ))}
          </div>
          <h2>Icon style</h2>
          <div className="icon-styles">
            {ICON_STYLES.map((s) => (
              <button key={s.id} aria-pressed={icons === s.id} onClick={() => setIcons(s.id)}>
                <span className={`preview data-${s.id}`}><Icon name="star" lead /></span>
                {s.name}
              </button>
            ))}
          </div>
        </div>
      )}
      <button className="theme-fab" aria-expanded={open} aria-label={open ? 'Close appearance settings' : 'Change theme and icons'} onClick={() => setOpen(!open)}>
        <Icon name={open ? 'close' : 'palette'} />
      </button>
    </div>
  );
}
