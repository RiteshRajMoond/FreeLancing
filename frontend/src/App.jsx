import React from "react";
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Admins from "./components/Admins";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SuperAdmin from "./components/SuperAdmin";
import Dashboard from "./components/Dashboard/Dashboard";
import JobList from "./components/Jobs/JobList";
import CreateJob from "./components/Jobs/CreateJob";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/super-admin" element={<SuperAdmin />} />
        <Route path="/admins" element={<Admins />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/joblist" element={<JobList />} />
        <Route path="/create-job" element={<CreateJob />} /> {/* Add route for AddJob */}
      </Routes>
    </BrowserRouter>
  );
}