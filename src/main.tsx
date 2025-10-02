import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DarkModeToggle } from "./component";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DarkModeToggle />
  </StrictMode>
);
