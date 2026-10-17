// src/pages/Dashboard.jsx
import React from "react";
import {
  Users,
  UserCheck,
  Building2,
  Pill,
  Calendar,
  Activity,
} from "lucide-react";

export default function Dashboard() {
  const loggedInUser = JSON.parse(localStorage.getItem("user")) || {
    name: "Arham Ahmed",
    role: "Administrator",
  };

  const stats = [
    {
      title: "Total Patients",
      count: "1,248",
      icon: Users,
      color: "bg-blue-500",
      change: "+12%",
    },
    {
      title: "Active Doctors",
      count: "48",
      icon: UserCheck,
      color: "bg-green-500",
      change: "+4%",
    },
    {
      title: "Departments",
      count: "10",
      icon: Building2,
      color: "bg-purple-500",
      change: "0%",
    },
    {
      title: "Appointments Today",
      count: "86",
      icon: Calendar,
      color: "bg-orange-500",
      change: "+18%",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, {loggedInUser.name}! 👋
          </h1>
          <p className="text-blue-100 mt-1">
            Here is the overview of your hospital management system today.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-sm">
          <span>
            Role: <strong className="capitalize">{loggedInUser.role}</strong>
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {item.title}
                </p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {item.count}
                </h3>
                <span className="text-xs text-green-600 dark:text-green-400 font-semibold mt-2 inline-block">
                  {item.change} from last month
                </span>
              </div>
              <div
                className={`p-4 rounded-xl text-white ${item.color} shadow-md`}
              >
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Hospital Performance Overview
          </h3>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl text-gray-400">
            Analytics & Reports Active
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-100 dark:hover:bg-blue-900/40 transition">
              + Register New Patient
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-medium hover:bg-purple-100 dark:hover:bg-purple-900/40 transition">
              + Schedule Appointment
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 font-medium hover:bg-green-100 dark:hover:bg-green-900/40 transition">
              + Add Doctor Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
