import React from 'react';
import { Routes, Route } from "react-router-dom";

//---pages
//landing page
import LandingPage from './pages/landingPage/LandingPage';

//layouts
import AuthLayout from './pages/layouts/AuthLayout';
import MainLayout from './pages/layouts/MainLayout';

//authentication
import Login from './pages/authentication/Login';

//mainapp
import Dashboard from './pages/dashboard/Dashboard';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />

      <Route element={<AuthLayout/>}>
        <Route path="/login" element={<Login/>} />
      </Route>

      <Route element={<MainLayout/>}>
        <Route path="/dashboard" element={<Dashboard/>} />
      </Route>
    
    </Routes>
  )
}

export default App