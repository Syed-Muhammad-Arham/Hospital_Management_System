// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Users,
  Stethoscope,
  Building2,
  Calendar,
  Pill,
  HeartPulse,
  Activity,
  TrendingUp,
  Clock,
  UserCheck,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    departments: 0,
    appointments: 0,
    medicine: 0,
    equipment: 0,
  });

  const [recentPatients, setRecentPatients] = useState([]);
  const [recentAppointments, setRecentAppointments] = useState([]);

  // Weekly Data for Chart
  const weeklyData = [
    { day: "Mon", appointments: 45 },
    { day: "Tue", appointments: 58 },
    { day: "Wed", appointments: 52 },
    { day: "Thu", appointments: 71 },
    { day: "Fri", appointments: 68 },
    { day: "Sat", appointments: 85 },
    { day: "Sun", appointments: 60 },
  ];

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const responses = await Promise.all([
        axios.get("http://localhost:8000/patients"),
        axios.get("http://localhost:8000/doctors"),
        axios.get("http://localhost:8000/departments"),
        axios.get("http://localhost:8000/appointments"),
        axios.get("http://localhost:8000/medicine"),
        axios.get("http://localhost:8000/equipment"),
      ]);

      const [p, d, dept, appt, med, eq] = responses;

      setStats({
        patients: p.data.patients?.length || 0,
        doctors: d.data.doctors?.length || 0,
        departments: dept.data.departments?.length || 0,
        appointments: appt.data.appointments?.length || 0,
        medicine: med.data.medicine?.length || 0,
        equipment: eq.data.equipment?.length || 0,
      });

      setRecentPatients((p.data.patients || []).slice(-5).reverse());
      setRecentAppointments((appt.data.appointments || []).slice(-5).reverse());
    } catch (err) {
      console.error("Dashboard data fetch failed:", err);
    }
  };

  const statCards = [
    {
      title: "Total Patients",
      value: stats.patients,
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
      change: "+12%",
    },
    {
      title: "Active Doctors",
      value: stats.doctors,
      icon: Stethoscope,
      gradient: "from-purple-500 to-pink-500",
      change: "+8",
    },
    {
      title: "Departments",
      value: stats.departments,
      icon: Building2,
      gradient: "from-green-500 to-emerald-500",
      change: "100%",
    },
    {
      title: "Total Appointments",
      value: stats.appointments,
      icon: Calendar,
      gradient: "from-orange-500 to-red-500",
      change: "+23%",
    },
    {
      title: "Medicine Stock",
      value: stats.medicine,
      icon: Pill,
      gradient: "from-indigo-500 to-blue-600",
      change: "In Stock",
    },
    {
      title: "Equipment",
      value: stats.equipment,
      icon: HeartPulse,
      gradient: "from-rose-500 to-pink-600",
      change: "Operational",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-3">
          Welcome back, Arham Ahmed • Super Admin
        </p>
      </motion.div>

      {/* Stats Grid - 3 Cards Per Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 max-w-7xl mx-auto">
        {statCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/60 dark:border-gray-700/60 overflow-hidden"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-10 group-hover:opacity-20 transition-opacity`}
            />
            <div className="p-8 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} p-0.5`}
                >
                  <div className="w-full h-full rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur flex items-center justify-center">
                    <card.icon className="w-9 h-9 text-white" />
                  </div>
                </div>
                <span className="text-sm font-bold text-green-500 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {card.change}
                </span>
              </div>
              <h3 className="text-4xl font-black text-gray-900 dark:text-white">
                {card.value}
              </h3>
              <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mt-2">
                {card.title}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Weekly Appointments Chart */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-gray-200/60 dark:border-gray-700/60"
        >
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-8 h-8 text-purple-500" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Weekly Appointments Trend
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(31, 41, 55, 0.8)",
                  border: "none",
                  borderRadius: "12px",
                  color: "white",
                }}
              />
              <Line
                type="monotone"
                dataKey="appointments"
                stroke="#8b5cf6"
                strokeWidth={4}
                dot={{ fill: "#8b5cf6", r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Activity */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-gray-200/60 dark:border-gray-700/60"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <UserCheck className="w-7 h-7 text-blue-500" />
              Recent Patients
            </h3>
            {recentPatients.length > 0 ? (
              recentPatients.map((p) => (
                <div
                  key={p._id}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50 mb-3"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {p.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {p.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {p.age} yrs • {p.gender}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">No patients yet</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-gray-200/60 dark:border-gray-700/60"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <Clock className="w-7 h-7 text-green-500" />
              Today's Appointments
            </h3>
            {recentAppointments.length > 0 ? (
              recentAppointments.map((a) => (
                <div
                  key={a._id}
                  className="flex justify-between items-center p-4 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 mb-3"
                >
                  <div>
                    <p className="font-semibold">Dr. {a.doctor_id}</p>
                    <p className="text-sm text-gray-600">
                      Patient: {a.patient_id}
                    </p>
                  </div>
                  <span className="text-sm font-medium px-3 py-1 bg-green-100 text-green-700 rounded-full">
                    {a.time || "Scheduled"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">
                No appointments today
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
