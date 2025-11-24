// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
    </BrowserRouter>
  );
}

export default App;
