import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./views/home/Home";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import VeiewTask from "./components/body/VeiewTask";
import Addtask from "./views/home/Addtask";
import Profile from "./views/home/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/register/*" element={<Register />} />
        <Route path="/tasks/view" element={<VeiewTask />} />
        <Route path="/tasks/add" element={<Addtask />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
    // </ThemeProvider>
  );
}

export default App;
