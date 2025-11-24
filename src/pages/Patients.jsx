import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  User,
  Calendar,
  Pill,
  FileText,
  Stethoscope,
} from "lucide-react";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [obj_id, setObj_id] = useState("");

  const [pn, setPn] = useState("");
  const [pg, setPg] = useState("");
  const [pa, setPa] = useState("");
  const [pavl, setPavl] = useState("");
  const [pcm, setPcm] = useState("");
  const [pmh, setPmh] = useState("");

  useEffect(() => {
    getPatients();
  }, []);

  async function getPatients() {
    try {
      let res = await axios.get("http://localhost:8000/patients");
      setPatients(res.data.patients || []);
    } catch (err) {
      console.error(err);
    }
  }

  async function delPatients(id) {
    if (!window.confirm("Are you sure you want to delete this patient?"))
      return;
    try {
      await axios.delete(`http://localhost:8000/patients/${id}`);
      getPatients();
    } catch (err) {
      alert("Delete failed");
    }
  }

  async function add_patients() {
    try {
      let res = await axios.post("http://localhost:8000/add_patients", {
        name: pn,
        gender: pg,
        age: pa,
        appointments: pavl,
        medical_history: pmh,
        current_medications: pcm,
      });
      if (res.status === 200) {
        setIsModal(false);
        resetForm();
        getPatients();
      }
    } catch (err) {
      alert("Add failed");
    }
  }

  async function updatePatients(id) {
    try {
      let res = await axios.put(`http://localhost:8000/patients/${id}`, {
        name: pn,
        gender: pg,
        age: pa,
        appointments: pavl,
        medical_history: pmh,
        current_medications: pcm,
      });
      if (res.status === 200) {
        setIsModal(false);
        resetForm();
        getPatients();
      }
    } catch (err) {
      alert("Update failed");
    }
  }

  const resetForm = () => {
    setPn("");
    setPg("");
    setPa("");
    setPavl("");
    setPcm("");
    setPmh("");
    setIsEdit(false);
    setObj_id("");
  };

  const openAddModal = () => {
    resetForm();
    setIsModal(true);
  };

  const openEditModal = (p) => {
    setObj_id(p._id);
    setPn(p.name);
    setPg(p.gender);
    setPa(p.age);
    setPavl(p.appointments);
    setPcm(p.current_medications);
    setPmh(p.medical_history);
    setIsEdit(true);
    setIsModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Patients Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage all patient records efficiently
        </p>
      </motion.div>

      {/* Add Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={openAddModal}
        className="mb-10 flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all font-medium"
      >
        <Plus className="w-5 h-5" />
        Add New Patient
      </motion.button>

      {/* 3 Cards Per Row - Same as Departments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <AnimatePresence>
          {patients.length > 0 ? (
            patients.map((p, i) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-400 border border-gray-200/60 dark:border-gray-700/60 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="p-8 relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {p.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="px-4 py-2 rounded-full text-sm font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                      {p.gender}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {p.name}
                  </h3>
                  <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
                    {p.age} yrs
                  </p>

                  <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-purple-500" />
                      <span className="font-medium truncate">
                        {p.appointments || "No appointments"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Pill className="w-5 h-5 text-blue-500" />
                      <span className="font-medium truncate">
                        {p.current_medications || "None"}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="font-medium line-clamp-2">
                        {p.medical_history || "No history"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-3">
                    <button
                      onClick={() => openEditModal(p)}
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => delPatients(p._id)}
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 font-semibold hover:bg-red-500/20 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-24">
              <User className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-700 mb-6" />
              <p className="text-xl text-gray-500 dark:text-gray-400">
                No patients found
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal - Same as before */}
      <AnimatePresence>
        {isModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {isEdit ? "Update Patient" : "Add New Patient"}
                  </h2>
                  <button
                    onClick={() => setIsModal(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Name", value: pn, set: setPn, icon: User },
                    {
                      label: "Gender",
                      value: pg,
                      set: setPg,
                      icon: Stethoscope,
                    },
                    { label: "Age", value: pa, set: setPa, icon: Calendar },
                    {
                      label: "Appointments",
                      value: pavl,
                      set: setPavl,
                      icon: Calendar,
                    },
                    {
                      label: "Current Medications",
                      value: pcm,
                      set: setPcm,
                      icon: Pill,
                    },
                    {
                      label: "Medical History",
                      value: pmh,
                      set: setPmh,
                      icon: FileText,
                      full: true,
                    },
                  ].map((field) => (
                    <div
                      key={field.label}
                      className={field.full ? "md:col-span-2" : ""}
                    >
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {field.label}
                      </label>
                      <div className="relative">
                        <field.icon className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={field.value}
                          onChange={(e) => field.set(e.target.value)}
                          placeholder={field.label}
                          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 mt-10">
                  <button
                    onClick={() => setIsModal(false)}
                    className="flex-1 py-4 rounded-2xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 font-medium transition"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={
                      isEdit ? () => updatePatients(obj_id) : add_patients
                    }
                    className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all"
                  >
                    {isEdit ? "Update Patient" : "Add Patient"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
