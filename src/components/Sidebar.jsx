// src/components/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
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
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Stethoscope, label: "Doctors", path: "/doctors" },
  { icon: Users, label: "Patients", path: "/patients" },
  { icon: Building2, label: "Departments", path: "/departments" },
  { icon: Pill, label: "Medicines", path: "/medicines" },
  { icon: Calendar, label: "Appointments", path: "/appointments" },
  { icon: HeartPulse, label: "Equipments", path: "/equipments" },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
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
        className="absolute -right-11 top-9 z-50 w-4 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-purple-500/50 transition-all"
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

      {/* Logo Area - Perfectly Fixed */}
      <div className="relative h-24 flex items-center justify-center border-b border-gray-200/40 dark:border-gray-800/50">
        <motion.div
          animate={{
            scale: isCollapsed ? 0.85 : 1,
            x: isCollapsed ? 0 : 0,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex items-center gap-3"
        >
          {/* Logo Icon */}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl ring-4 ring-white/20 dark:ring-gray-900/50">
            <span className="text-white font-black text-2xl">A</span>
          </div>

          {/* Logo Text - Only when expanded */}
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

                  {/* Tooltip */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-3 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-2xl">
                      {item.label}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-3 h-3 bg-gray-900 rotate-45" />
                    </div>
                  )}
                </div>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-gray-200/40 dark:border-gray-800/50 space-y-3">
        <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all">
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>

        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-gray-100/70 dark:bg-gray-800/70 hover:bg-gray-200/70 dark:hover:bg-gray-700/70 transition-all"
        >
          <div className="flex items-center gap-4">
            {isDark ? (
              <Moon className="w-5 h-5 text-purple-400" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-500" />
            )}
            {!isCollapsed && (
              <span className="font-medium text-sm">
                {isDark ? "Dark" : "Light"} Mode
              </span>
            )}
          </div>
          {isCollapsed && (
            <div className="w-9 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative">
              <div
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${
                  isDark ? "left-4" : "left-0.5"
                }`}
              />
            </div>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
