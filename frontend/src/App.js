import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./views/home/Home";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import VeiewTask from "./components/body/VeiewTask";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/register/*" element={<Register />} />
        <Route path="/tasks/view" element={<VeiewTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
