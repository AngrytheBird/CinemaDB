import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Add from "./components/Add";
import Register from "./components/Register";
import Login from "./components/Login";
import Search from "./components/Search";
import { AuthProvider } from "./context/AuthProvider";

export default function App() {
  return (
    <div className="wrapper">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add" element={<Add />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={<Search />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
