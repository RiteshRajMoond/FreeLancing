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
import AllJobs from "./components/Jobs/AllJobs";
import JobDescription from "./components/Jobs/JobDescription";
import JobApplicants from "./components/Jobs/JobApplicants";
import ClientDashboard from "./components/Jobs/ClientDashboard";
import DeveloperDashboard from "./components/Jobs/DeveloperDashboard";
import DeveloperJobList from "./components/Jobs/DeveloperJobList";
import Layout from "./components/Layout";
import StripePayment from "./components/Payment/StripePayment";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/super-admin" element={<SuperAdmin />} />
          <Route path="/admins" element={<Admins />} />
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/joblist" element={<JobList />} />
          <Route path="/create-job" element={<CreateJob />} />
          <Route path="/alljobs" element={<AllJobs />} />
          <Route path="/job-description" element={<JobDescription />} />
          <Route path="/job-applicants" element={<JobApplicants />} />
          <Route
            path="/client-dashboard/:jobId"
            element={<ClientDashboard />}
          />
          <Route
            path="/developer-dashboard/:jobId"
            element={<DeveloperDashboard />}
          />
          <Route path="/developer-joblist" element={<DeveloperJobList />} />
          <Route path="/payment" element={<StripePayment />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
