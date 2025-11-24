// src/pages/Medicine.jsx → COPY-PASTE KAR DE, 100% CHALEGA!
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Pill,
  Package,
  Calendar,
  AlertCircle,
} from "lucide-react";

export default function Medicine() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    stock: "",
    unit: "",
    expiry: "",
  });

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const res = await axios.get("http://localhost:8000/medicine");
      setMedicines(res.data.medicine || []);
    } catch (err) {
      console.error("Failed to fetch medicines:", err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingMedicine) {
        // UPDATE
        await axios.put(
          `http://localhost:8000/medicine/${editingMedicine._id}`,
          formData
        );
      } else {
        // ADD NEW
        await axios.post("http://localhost:8000/add_medicine", formData);
      }
      closeModal();
      fetchMedicines();
    } catch (err) {
      alert("Operation failed! Check console (F12)");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this medicine permanently?")) return;
    try {
      await axios.delete(`http://localhost:8000/medicine/${id}`);
      fetchMedicines();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const openEdit = (med) => {
    setEditingMedicine(med);
    setFormData({
      name: med.name || "",
      stock: med.stock || "",
      unit: med.unit || "",
      expiry: med.expiry || "",
    });
    setIsModalOpen(true);
  };

  const openAdd = () => {
    setEditingMedicine(null);
    setFormData({ name: "", stock: "", unit: "", expiry: "" });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMedicine(null);
  };

  const filtered = medicines.filter(
    (m) =>
      m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.unit?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 p-6 lg:p-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-6xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
          Medicine Inventory
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-4">
          Manage hospital pharmacy stock
        </p>
      </motion.div>

      {/* Search + Add Button */}
      <div className="flex flex-col lg:flex-row gap-6 mb-10 max-w-7xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500 z-10" />
          <input
            type="text"
            placeholder="Search medicine name or unit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-16 pr-8 py-5 bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl border border-gray-200/60 dark:border-gray-700/60 focus:ring-4 focus:ring-emerald-500/40 outline-none text-lg shadow-lg"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openAdd}
          className="flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg rounded-3xl shadow-2xl hover:shadow-emerald-500/50 transition-all"
        >
          <Plus className="w-7 h-7" /> Add Medicine
        </motion.button>
      </div>

      {/* Medicines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <AnimatePresence>
          {filtered.map((med, i) => (
            <motion.div
              key={med._id}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-white/90 dark:bg-gray-800/95 backdrop-blur-2xl rounded-3xl shadow-2xl hover:shadow-3xl border border-gray-200/50 dark:border-gray-700/60 overflow-hidden transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="p-8 relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-2xl">
                    <Pill className="w-10 h-10" />
                  </div>
                  {med.stock < 10 && (
                    <span className="px-4 py-2 bg-red-100 text-red-700 dark:bg-red-900/60 dark:text-red-300 rounded-full text-sm font-bold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" /> Low Stock!
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {med.name}
                </h3>
                <p className="text-lg font-medium text-emerald-600 dark:text-emerald-400 mb-6">
                  {med.unit}
                </p>

                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5" /> Stock:{" "}
                    <span className="font-bold text-2xl text-emerald-600">
                      {med.stock}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5" /> Expiry:{" "}
                    <span className="font-medium">
                      {new Date(med.expiry).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <button
                    onClick={() => openEdit(med)}
                    className="flex-1 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Edit2 className="w-5 h-5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(med._id)}
                    className="flex-1 py-4 bg-red-500/10 text-red-600 dark:text-red-400 font-bold rounded-2xl hover:bg-red-500/20 transition flex items-center justify-center gap-2"
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
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-3xl p-10 w-full max-w-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {editingMedicine ? "Update Medicine" : "Add New Medicine"}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl transition"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              <div className="space-y-8">
                <input
                  placeholder="Medicine Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-6 py-5 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-4 focus:ring-emerald-500/30 outline-none text-lg"
                />
                <input
                  type="number"
                  placeholder="Stock Quantity"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  className="w-full px-6 py-5 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-4 focus:ring-emerald-500/30 outline-none text-lg"
                />
                <input
                  placeholder="Unit (e.g. Tablet, Syrup, Injection)"
                  value={formData.unit}
                  onChange={(e) =>
                    setFormData({ ...formData, unit: e.target.value })
                  }
                  className="w-full px-6 py-5 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-4 focus:ring-emerald-500/30 outline-none text-lg"
                />
                <input
                  type="date"
                  placeholder="Expiry Date"
                  value={formData.expiry}
                  onChange={(e) =>
                    setFormData({ ...formData, expiry: e.target.value })
                  }
                  className="w-full px-6 py-5 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-4 focus:ring-emerald-500/30 outline-none text-lg"
                />
              </div>

              <div className="flex gap-6 mt-12">
                <button
                  onClick={closeModal}
                  className="flex-1 py-5 rounded-2xl bg-gray-200 dark:bg-gray-700 font-bold text-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg shadow-2xl"
                >
                  {editingMedicine ? "Update Medicine" : "Add Medicine"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
