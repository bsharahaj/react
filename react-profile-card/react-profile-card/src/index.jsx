import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// R1 — The entry point. This is the one place the React world touches the
// plain HTML world: it finds <div id="root"> in index.html and mounts the
// component tree into it.
//
// StrictMode is a development-only wrapper. It surfaces unsafe patterns early
// by intentionally double-invoking some code, and disappears in the build.

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
