import React, { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
// Import Pages
import Home from "./pages/Home/Home";
import NewProject from "./pages/NewProject/NewProject";
import Projects from "./assets/classes/Projects";
import Project from "./pages/Project/Project";
import NotFound from "./pages/NotFound";
// General Styles
import "./App.scss";

function App() {
    const [projects] = useState(Projects.fromLocalStorage() || new Projects());
    
    useEffect(() => {
        const currentTheme = localStorage["subtitle.js_theme"] === "light" ? "light" : "dark";
        const rootElement = document.getElementById("root");
        if (rootElement) {
            localStorage.setItem("subtitle.js_theme", currentTheme);
            rootElement.classList.remove("dark-theme", "light-theme");
            rootElement.classList.add(currentTheme + "-theme");
        }
    }, []);

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home projects={projects} />} />
                <Route path="/new-project" element={<NewProject projects={projects} />} />
                <Route path="/projects/:projectID" element={<Project projects={projects} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </HashRouter>
    )
}

export default App;