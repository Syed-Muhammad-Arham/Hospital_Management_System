// src/pages/Login.jsx
import React, { useState } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Lock, Mail, LogIn, Hospital, User, UserPlus } from "lucide-react";

export default function Login({ setIsAuth }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Super Admin");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (isRegister) {
        // Naya Admin Database me add karega
        const res = await axios.post("http://localhost:8000/add_admin", {
          name: name.trim(),
          email: email.trim(),
          password: password.trim(),
          role,
        });
        if (res.status === 200) {
          setSuccess("Admin Account Created in Database! Ab Login karein.");
          setIsRegister(false);
          setPassword("");
        }
      } else {
        // Database se Login Check karega
        const res = await axios.post("http://localhost:8000/login", {
          email: email.trim(),
          password: password.trim(),
        });

        if (res.status === 200 && res.data.user) {
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("user", JSON.stringify(res.data.user));
          if (setIsAuth) setIsAuth(true);
          navigate("/dashboard");
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid Email or Password! (Ya check karein ke ser.js chal raha hai)",
      );
    } finally {
      setLoading(false);
=======
import { motion } from "framer-motion";
import { Lock, Mail, LogIn, Stethoscope, User, Hospital } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Yahan tera backend login call aayega
    if (email && password) {
      // Temporary success (tera real logic yahan daal dena)
      alert("Login Successful! Welcome Super Admin");
      // window.location.href = "/dashboard";
>>>>>>> 810dcecb017ab3bc6e666a4a1b853662c60cf58b
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen w-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
=======
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute inset-0">
>>>>>>> 810dcecb017ab3bc6e666a4a1b853662c60cf58b
        <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>

<<<<<<< HEAD
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-10">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
              <Hospital className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-black text-white mb-1">
              City Care Hospital
            </h1>
            <p className="text-lg text-white/80 font-medium">
              {isRegister ? "Register New Admin" : "Admin Portal"}
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3 bg-red-500/40 border border-red-300 rounded-2xl text-white text-center text-sm font-semibold">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-5 p-3 bg-emerald-500/40 border border-emerald-300 rounded-2xl text-white text-center text-sm font-semibold">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegister && (
              <>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
                  <input
                    type="text"
                    placeholder="Full Name (e.g. Arham Ahmed)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none"
                  />
                </div>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white focus:outline-none [&>option]:text-gray-900"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="Receptionist">Receptionist</option>
                </select>
              </>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
=======
      {/* Main Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-10">
          {/* Hospital Logo + Title */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl"
            >
              <Hospital className="w-14 h-14 text-white" />
            </motion.div>

            <h1 className="text-5xl font-black text-white mb-2">
              City Care Hospital
            </h1>
            <p className="text-xl text-white/80 font-medium">Admin Portal</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-8">
            {/* Email Field */}
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-white/70" />
>>>>>>> 810dcecb017ab3bc6e666a4a1b853662c60cf58b
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
<<<<<<< HEAD
                className="w-full pl-12 pr-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
=======
                className="w-full pl-16 pr-6 py-5 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-white/50 focus:bg-white/30 transition-all text-lg"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-white/70" />
>>>>>>> 810dcecb017ab3bc6e666a4a1b853662c60cf58b
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
<<<<<<< HEAD
                className="w-full pl-12 pr-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-xl flex items-center justify-center gap-3 cursor-pointer"
            >
              {isRegister ? (
                <UserPlus className="w-6 h-6" />
              ) : (
                <LogIn className="w-6 h-6" />
              )}
              {loading
                ? "Checking Database..."
                : isRegister
                  ? "Create Admin Account"
                  : "Login to Dashboard"}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setError("");
                setSuccess("");
              }}
              className="text-white/90 hover:text-white underline text-sm font-medium bg-transparent border-none cursor-pointer"
            >
              {isRegister
                ? "Already have an account? Login here"
                : "New Admin? Create an account in Database"}
            </button>
          </div>
        </div>
      </motion.div>
=======
                className="w-full pl-16 pr-6 py-5 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-white/50 focus:bg-white/30 transition-all text-lg"
              />
            </div>

            {/* Remember + Forgot */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-3 text-white/80">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded accent-purple-500"
                />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-white/80 hover:text-white transition">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-purple-500/50 flex items-center justify-center gap-4 transition-all"
            >
              <LogIn className="w-7 h-7" />
              Login to Dashboard
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-10 text-center">
            <p className="text-white/60 text-sm">
              © 2025 City Care Hospital • Powered by Arham Ahmed
            </p>
          </div>
        </div>
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, x: Math.random() * window.innerWidth }}
            animate={{ y: window.innerHeight + 100 }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
          />
        ))}
      </div>
>>>>>>> 810dcecb017ab3bc6e666a4a1b853662c60cf58b
    </div>
  );
}
