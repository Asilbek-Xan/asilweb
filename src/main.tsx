import React from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";import App from "./App";import { ThemeProvider,useTheme } from "./context/ThemeContext";
function Toasts(){const {theme}=useTheme();return <ToastContainer position="bottom-right" autoClose={2600} theme={theme} newestOnTop closeOnClick pauseOnHover/>}
createRoot(document.getElementById("root")!).render(<React.StrictMode><ThemeProvider><App/><Toasts/></ThemeProvider></React.StrictMode>);
