// src/pages/Doctors.jsx → SIRF YEHI COPY-PASTE KAR, EDIT 100% CHALEGA!
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Phone,
  Mail,
  Clock,
  User,
  CalendarCheck,
} from "lucide-react";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);

  const [formData, setFormData] = useState({
    doctor_id: "",
    name: "",
    specialization: "",
    gender: "Male",
    phone: "",
    email: "",
    department_id: "",
    availability: "Available",
    timing: "",
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:8000/doctors");
      setDoctors(res.data.doctors || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingDoctor) {
        // SAB KUCHw fields bhejo jo backend expect karta hai
        const updatedData = {
          doctor_id: formData.doctor_id,
          name: formData.name,
          specialization: formData.specialization,
          gender: formData.gender,
          phone: formData.phone,
          email: formData.email,
          department_id: formData.department_id,
          availability: formData.availability,
          timing: formData.timing,
        };

        await axios.put(
          `http://localhost:8000/doctor/${editingDoctor._id}`,
          updatedData
        );
        alert("Doctor updated successfully!");
      } else {
        await axios.post("http://localhost:8000/add_doctor", formData);
        alert("Doctor added successfully!");
      }
      closeModal();
      fetchDoctors();
    } catch (err) {
      console.error("ERROR:", err.response?.data || err);
      alert("Failed! Check console (F12) for details");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this doctor permanently?")) return;
    try {
      await axios.delete(`http://localhost:8000/doctor/${id}`);
      fetchDoctors();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const openEdit = (doc) => {
    setEditingDoctor(doc);
    setFormData({
      doctor_id: doc.doctor_id || "",
      name: doc.name || "",
      specialization: doc.specialization || "",
      gender: doc.gender || "Male",
      phone: doc.phone || "",
      email: doc.email || "",
      department_id: doc.department_id || "",
      availability: doc.availability || "Available",
      timing: doc.timing || "",
    });
    setIsModalOpen(true);
  };

  const openAdd = () => {
    setEditingDoctor(null);
    setFormData({
      doctor_id: "",
      name: "",
      specialization: "",
      gender: "Male",
      phone: "",
      email: "",
      department_id: "",
      availability: "Available",
      timing: "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDoctor(null);
  };

  const filtered = doctors.filter(
    (d) =>
      d.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 p-6 lg:p-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Doctors
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-3">
          Manage all hospital doctors
        </p>
      </motion.div>

      {/* Search + Add */}
      <div className="flex flex-col lg:flex-row gap-6 mb-10 max-w-7xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500 z-10" />
          <input
            type="text"
            placeholder="Search by name, specialty, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-8 py-5 bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl border border-gray-200/60 dark:border-gray-700/60 focus:ring-4 focus:ring-purple-500/30 outline-none text-lg shadow-lg"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openAdd}
          className="flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-3xl shadow-2xl"
        >
          <Plus className="w-7 h-7" /> Add New Doctor
        </motion.button>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <AnimatePresence>
          {filtered.map((doc, i) => (
            <motion.div
              key={doc._id}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-white/90 dark:bg-gray-800/95 backdrop-blur-2xl rounded-3xl shadow-2xl hover:shadow-3xl border border-gray-200/50 dark:border-gray-700/60 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="p-8 relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-black shadow-2xl">
                    {doc.name.charAt(0).toUpperCase()}
                  </div>
                  <span
                    className={`px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${
                      doc.availability === "Available"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300"
                        : "bbc-red-100 text-red-700 dark:bg-red-900/60 dark:text-red-300"
                    }`}
                  >
                    <CalendarCheck className="w-4 h-4" /> {doc.availability}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {doc.name}
                </h3>
                <p className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-6">
                  {doc.specialization}
                </p>

                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5" /> {doc.gender}
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" /> {doc.phone || "N/A"}
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5" /> {doc.email || "N/A"}
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5" /> {doc.timing || "Full Time"}
                  </div>
                </div>

                <div className="mt-10 flex gap-4">
                  <button
                    onClick={() => openEdit(doc)}
                    className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Edit2 className="w-5 h-5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(doc._id)}
                    className="flex-1 py-4 bg-red-500/10 text-red-600 font-bold rounded-2xl hover:bg-red-500/20 flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-5 h-5" /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-xl z-50 flex items-center justify-center p-6"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-3xl p-10 w-full max-w-4xl max-h-screen overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {editingDoctor ? "Update Doctor" : "Add New Doctor"}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  "doctor_id",
                  "name",
                  "specialization",
                  "phone",
                  "email",
                  "department_id",
                  "timing",
                ].map((field) => (
                  <input
                    key={field}
                    type={field === "email" ? "email" : "text"}
                    placeholder={field.replace(/_/g, " ").toUpperCase()}
                    value={formData[field] || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                    className="px-6 py-5 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-4 focus:ring-purple-500/30 outline-none text-lg"
                  />
                ))}

                <select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className="px-6 py-5 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-4 focus:ring-purple-500/30 outline-none text-lg"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>

                <select
                  value={formData.availability}
                  onChange={(e) =>
                    setFormData({ ...formData, availability: e.target.value })
                  }
                  className="px-6 py-5 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-4 focus:ring-purple-500/30 outline-none text-lg"
                >
                  <option>Available</option>
                  <option>Busy</option>
                  <option>On Leave</option>
                </select>
              </div>

              <div className="flex gap-6 mt-12">
                <button
                  onClick={closeModal}
                  className="flex-1 py-5 rounded-2xl bg-gray-200 dark:bg-gray-700 font-bold text-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow-2xl"
                >
                  {editingDoctor ? "Update Doctor" : "Add Doctor"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
