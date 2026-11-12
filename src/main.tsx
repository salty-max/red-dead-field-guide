import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles.css";

// Links and bookmarks from the pre-React guide used hash routes (#guide/3/heart-well).
const legacy = /^#((?:guide|checklist|dashboard|sources)(?:\/.*)?)$/.exec(location.hash);
if (legacy) history.replaceState(null, "", `/${legacy[1]}`);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
