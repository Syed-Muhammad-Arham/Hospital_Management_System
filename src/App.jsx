// src/App.jsx
<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
=======
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
>>>>>>> 810dcecb017ab3bc6e666a4a1b853662c60cf58b
import { motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/Doctors";
import Patients from "./pages/Patients";
import Departments from "./pages/Departments";
import Medicines from "./pages/Medicine";
import Appointments from "./pages/Appointments";
import Equipments from "./pages/Equipmemts";

function App() {
<<<<<<< HEAD
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("isAuthenticated") === "true",
  );

  // Login ya Logout hone par state update karne ke liye
  useEffect(() => {
    const checkAuth = () => {
      setIsAuth(localStorage.getItem("isAuthenticated") === "true");
    };
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <BrowserRouter>
      {!isAuth ? (
        /* AGAR LOGIN NAHI HAI TOH SIRF LOGIN PAGE DIKhao (NO SIDEBAR) */
        <Routes>
          <Route path="*" element={<Login setIsAuth={setIsAuth} />} />
        </Routes>
      ) : (
        /* AGAR LOGIN HAI TOH SIDEBAR + DASHBOARD DIKHAO */
        <div className="flex h-screen w-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
          <Sidebar setIsAuth={setIsAuth} />

          <motion.main
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600"
          >
            <div className="min-h-screen px-6 py-8 lg:px-12 lg:py-10">
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/departments" element={<Departments />} />
                <Route path="/medicines" element={<Medicines />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/equipments" element={<Equipments />} />
                <Route
                  path="*"
                  element={<Navigate to="/dashboard" replace />}
                />
              </Routes>
            </div>
          </motion.main>
        </div>
      )}
=======
  return (
    <BrowserRouter>
      {/* Full Screen Flex Layout */}
      <div className="flex h-screen w-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
        {/* Sidebar - Collapsible */}
        <Sidebar />

        {/* Main Content Area - Full Width & Smooth Entry */}
        <motion.main
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600"
        >
          {/* Inner Padding - Responsive */}
          <div className="min-h-screen px-6 py-8 lg:px-12 lg:py-10">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/medicines" element={<Medicines />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/equipments" element={<Equipments />} />
            </Routes>
          </div>
        </motion.main>
      </div>
>>>>>>> 810dcecb017ab3bc6e666a4a1b853662c60cf58b
    </BrowserRouter>
  );
}

export default App;
