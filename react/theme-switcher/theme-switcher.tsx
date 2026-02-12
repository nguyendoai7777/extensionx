import useThemeAnimation from "./theme-switcher.hook.ts";
import './theme-switcher.css';

export default function App() {
  const {toggleAnimationTheme, theme} = useThemeAnimation()
  return (
    <>
      <h1>🔍 Theme Toggle Debug Version</h1>
      <p className="subtitle">Click button để test animation</p>
      <button className="toggle-button" id="themeToggle">
        <span id="themeIcon">☀️</span>
      </button>
      <div className="debug-info">
        <strong>Debug Log:</strong>
        <pre id="debugLog">Waiting for click...</pre>
      </div>

      <div className="info-box">
        <h3>Browser Support Check:</h3>
        <div id="supportCheck">Checking...</div>
      </div>

      <button className="theme-toggle" onClick={toggleAnimationTheme} aria-label="Toggle theme">
        {theme === "dark" ? "🌙" : "☀️"}
      </button>
    </>
  );
}
