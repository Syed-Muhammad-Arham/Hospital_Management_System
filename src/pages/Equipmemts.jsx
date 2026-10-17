// src/pages/Equipment.jsx → PURA REPLACE KAR DE, SAB CHALEGA!
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Package,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

export default function Equipment() {
  const [equipment, setEquipment] = useState([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [form, setForm] = useState({
    item: "",
    count: "",
    status: "Working",
  });

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const res = await axios.get("http://localhost:8000/equipment");
      setEquipment(res.data.equipment || []);
    } catch (err) {
      console.error("Fetch equipment error:", err);
    }
  };

  const handleSave = async () => {
    try {
      if (editItem) {
        await axios.put(
          `http://localhost:8000/equipment/${editItem._id}`,
          form
        );
        alert("Equipment updated!");
      } else {
        await axios.post("http://localhost:8000/add_equipment", form);
        alert("Equipment added!");
      }
      setModal(false);
      setEditItem(null);
      setForm({ item: "", count: "", status: "Working" });
      fetchEquipment();
    } catch (err) {
      console.error(err);
      alert("Failed! Check console");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this equipment permanently?")) return;
    try {
      await axios.delete(`http://localhost:8000/equipment/${id}`);
      fetchEquipment();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const openEdit = (eq) => {
    setEditItem(eq);
    setForm({
      item: eq.item || "",
      count: eq.count || "",
      status: eq.status || "Working",
    });
    setModal(true);
  };

  const openAdd = () => {
    setEditItem(null);
    setForm({ item: "", count: "", status: "Working" });
    setModal(true);
  };

  const filtered = equipment.filter(
    (e) =>
      e.item?.toLowerCase().includes(search.toLowerCase()) ||
      e.status?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 p-6 lg:p-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-6xl font-black bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
          Hospital Equipment
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-4">
          Track and manage all medical equipment
        </p>
      </motion.div>

      {/* Search + Add Button */}
      <div className="flex flex-col lg:flex-row gap-6 mb-10 max-w-7xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500 z-10" />
          <input
            type="text"
            placeholder="Search equipment name or status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-16 pr-8 py-5 bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl border border-gray-200/60 dark:border-gray-700/60 focus:ring-4 focus:ring-orange-500/40 outline-none text-lg shadow-lg"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openAdd}
          className="flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-lg rounded-3xl shadow-2xl hover:shadow-orange-500/50"
        >
          <Plus className="w-7 h-7" /> Add Equipment
        </motion.button>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <AnimatePresence>
          {filtered.map((eq, i) => (
            <motion.div
              key={eq._id}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-white/90 dark:bg-gray-800/95 backdrop-blur-2xl rounded-3xl shadow-2xl hover:shadow-3xl border border-gray-200/50 dark:border-gray-700/60 overflow-hidden transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="p-8 relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-2xl">
                    <Package className="w-10 h-10" />
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${
                      eq.status === "Working"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300"
                        : eq.status === "Under Maintenance"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/60 dark:text-yellow-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900/60 dark:text-red-300"
                    }`}
                  >
                    {eq.status === "Working" ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : eq.status === "Under Maintenance" ? (
                      <AlertTriangle className="w-4 h-4" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                    {eq.status}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {eq.item}
                </h3>

                <div className="space-y-4">
                  <div className="text-4xl font-black text-orange-600 dark:text-orange-400">
                    {eq.count}
                    <span className="text-lg font-normal text-gray-500 ml-2">
                      units
                    </span>
                  </div>

                  {eq.count < 5 && (
                    <div className="px-4 py-2 bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300 rounded-full text-sm font-bold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> Low Stock Alert!
                    </div>
                  )}
                </div>

                <div className="mt-8 flex gap-4">
                  <button
                    onClick={() => openEdit(eq)}
                    className="flex-1 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Edit2 className="w-5 h-5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(eq._id)}
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
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-xl z-50 flex items-center justify-center p-6"
            onClick={() => setModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-3xl p-10 w-full max-w-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-4xl font-black bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  {editItem ? "Update Equipment" : "Add New Equipment"}
                </h2>
                <button
                  onClick={() => setModal(false)}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              <div className="space-y-8">
                <input
                  placeholder="Equipment Name (e.g. X-Ray Machine, Ventilator)"
                  value={form.item}
                  onChange={(e) => setForm({ ...form, item: e.target.value })}
                  className="w-full px-6 py-5 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-4 focus:ring-orange-500/30 outline-none text-lg"
                />

                <input
                  type="number"
                  placeholder="Total Count"
                  value={form.count}
                  onChange={(e) => setForm({ ...form, count: e.target.value })}
                  className="w-full px-6 py-5 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-4 focus:ring-orange-500/30 outline-none text-lg"
                />

                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full px-6 py-5 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-4 focus:ring-orange-500/30 outline-none text-lg"
                >
                  <option>Working</option>
                  <option>Under Maintenance</option>
                  <option>Out of Service</option>
                </select>
              </div>

              <div className="flex gap-6 mt-12">
                <button
                  onClick={() => setModal(false)}
                  className="flex-1 py-5 rounded-2xl bg-gray-200 dark:bg-gray-700 font-bold text-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-lg shadow-2xl"
                >
                  {editItem ? "Update Equipment" : "Add Equipment"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
