import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import DarkModeToggle from "../../src";

export function App() {
  return (
    <div className="container">
      <h1>React Dark Mode Toggle</h1>
      <p>A beautiful, animated dark mode toggle component</p>

      <div className="demo-section">
        <h2>Default Toggle</h2>
        <div className="toggle-row">
          <span>Light</span>
          <DarkModeToggle />
          <span>Dark</span>
        </div>
      </div>

      <div className="demo-section">
        <h2>Custom Sizes</h2>
        <div className="toggle-row">
          <DarkModeToggle size={16} />
          <DarkModeToggle size={24} />
          <DarkModeToggle size={32} />
          <DarkModeToggle size={48} />
        </div>
      </div>

      <div className="demo-section">
        <h2>Custom Colors</h2>
        <div className="toggle-row">
          <DarkModeToggle
            colors={{
              backgroundColor: "#e3f2fd",
              backgroundColorDark: "#1565c0",
              color: "#1976d2",
              colorDark: "#bbdefb",
            }}
          />
          <DarkModeToggle
            colors={{
              backgroundColor: "#f3e5f5",
              backgroundColorDark: "#7b1fa2",
              color: "#9c27b0",
              colorHover: "#b863ddff",
              colorDark: "#e1bee7",
              colorHoverDark: "#b689beff",
            }}
          />
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
