// src/components/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Stethoscope,
  Users,
  Building2,
  Pill,
  Calendar,
  HeartPulse,
  LogOut,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Stethoscope, label: "Doctors", path: "/doctors" },
  { icon: Users, label: "Patients", path: "/patients" },
  { icon: Building2, label: "Departments", path: "/departments" },
  { icon: Pill, label: "Medicines", path: "/medicines" },
  { icon: Calendar, label: "Appointments", path: "/appointments" },
  { icon: HeartPulse, label: "Equipments", path: "/equipments" },
];

export default function Sidebar({ setIsAuth }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initial = saved === "dark" || (!saved && prefersDark);
    setIsDark(initial);
    document.documentElement.classList.toggle("dark", initial);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    if (setIsAuth) setIsAuth(false);
    navigate("/");
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 82 : 280 }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      className="relative h-screen bg-white/90 dark:bg-gray-900/95 backdrop-blur-2xl border-r border-gray-200/50 dark:border-gray-800/60 shadow-2xl flex flex-col"
    >
      {/* Collapse Button */}
      <motion.button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-4 top-9 z-50 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-purple-500/50 transition-all cursor-pointer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }}>
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-white" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-white" />
          )}
        </motion.div>
      </motion.button>

      {/* Logo Area */}
      <div className="relative h-24 flex items-center justify-center border-b border-gray-200/40 dark:border-gray-800/50">
        <motion.div
          animate={{ scale: isCollapsed ? 0.85 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl ring-4 ring-white/20 dark:ring-gray-900/50">
            <span className="text-white font-black text-2xl">A</span>
          </div>

          <AnimatePresence>
            {!isCollapsed && (
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap"
              >
                AHMED
              </motion.h1>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className="block group relative"
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="sidebarActive"
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}

                <div
                  className={`relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all ${
                    isActive
                      ? "text-white"
                      : "text-gray-600 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-white/5"
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0 relative z-10" />
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="font-medium relative z-10"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-gray-200/40 dark:border-gray-800/50 space-y-3">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>

        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-gray-100/70 dark:bg-gray-800/70 hover:bg-gray-200/70 dark:hover:bg-gray-700/70 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-4">
            {isDark ? (
              <Moon className="w-5 h-5 text-purple-400" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-500" />
            )}
            {!isCollapsed && (
              <span className="font-medium text-sm text-gray-800 dark:text-gray-200">
                {isDark ? "Dark" : "Light"} Mode
              </span>
            )}
          </div>
        </button>
      </div>
    </motion.aside>
  );
}
