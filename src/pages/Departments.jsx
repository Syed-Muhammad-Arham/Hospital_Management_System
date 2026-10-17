import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Building2,
  Hash,
  User,
  MapPin,
} from "lucide-react";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [obj_id, setObj_id] = useState("");

  const [department_id, setDepartment_id] = useState("");
  const [department_name, setDepartment_name] = useState("");
  const [department_floor, setDepartment_floor] = useState("");
  const [department_head, setDepartment_head] = useState("");

  useEffect(() => {
    getDepartments();
  }, []);

  async function getDepartments() {
    try {
      const res = await axios.get("http://localhost:8000/departments");
      setDepartments(res.data.departments || []);
    } catch (err) {
      console.error(err);
    }
  }

  async function addDepartment() {
    try {
      const res = await axios.post("http://localhost:8000/add_department", {
        department_id,
        name: department_name,
        floor: department_floor,
        head_doctor_id: department_head || null,
      });
      if (res.status === 200) {
        closeModal();
        getDepartments();
      }
    } catch (err) {
      alert("Failed to add department");
    }
  }

  async function delDep(id) {
    if (!window.confirm("Are you sure you want to delete this department?"))
      return;
    try {
      await axios.delete(`http://localhost:8000/departments/${id}`);
      getDepartments();
    } catch (err) {
      alert("Delete failed");
    }
  }

  async function updateDepartment(id) {
    try {
      const res = await axios.put(`http://localhost:8000/departments/${id}`, {
        department_id,
        name: department_name,
        floor: department_floor,
        head_doctor_id: department_head || null,
      });
      if (res.status === 200) {
        closeModal();
        getDepartments();
      }
    } catch (err) {
      alert("Update failed");
    }
  }

  const openAddModal = () => {
    resetForm();
    setIsModal(true);
  };

  const openEditModal = (d) => {
    setObj_id(d._id);
    setDepartment_id(d.department_id);
    setDepartment_name(d.name);
    setDepartment_floor(d.floor);
    setDepartment_head(d.head_doctor_id || "");
    setIsEdit(true);
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
    resetForm();
  };

  const resetForm = () => {
    setDepartment_id("");
    setDepartment_name("");
    setDepartment_floor("");
    setDepartment_head("");
    setIsEdit(false);
    setObj_id("");
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
          Departments
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage hospital departments efficiently
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
        Add New Department
      </motion.button>

      {/* 3 Cards Per Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <AnimatePresence>
          {departments.length > 0 ? (
            departments.map((d, i) => (
              <motion.div
                key={d._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-400 border border-gray-200/60 dark:border-gray-700/60 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="p-8 relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <Building2 className="w-9 h-9 text-white" />
                    </div>
                    <span className="px-4 py-2 rounded-full text-sm font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                      #{d.department_id}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {d.name}
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <MapPin className="w-5 h-5 text-purple-500" />
                      <span className="font-medium">Floor {d.floor}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <User className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">
                        {d.head_doctor_id
                          ? `Dr. ${d.head_doctor_id}`
                          : "Not Assigned"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-3">
                    <button
                      onClick={() => openEditModal(d)}
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => delDep(d._id)}
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
              <Building2 className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-700 mb-6" />
              <p className="text-xl text-gray-500 dark:text-gray-400">
                No departments added yet
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
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
                    {isEdit ? "Update Department" : "Add New Department"}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      label: "Department ID",
                      value: department_id,
                      set: setDepartment_id,
                      icon: Hash,
                    },
                    {
                      label: "Name",
                      value: department_name,
                      set: setDepartment_name,
                      icon: Building2,
                    },
                    {
                      label: "Floor",
                      value: department_floor,
                      set: setDepartment_floor,
                      icon: MapPin,
                    },
                    {
                      label: "Head Doctor ID",
                      value: department_head,
                      set: setDepartment_head,
                      icon: User,
                    },
                  ].map((f) => (
                    <div key={f.label}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {f.label}
                      </label>
                      <div className="relative">
                        <f.icon className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={f.value}
                          onChange={(e) => f.set(e.target.value)}
                          placeholder={f.label}
                          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 mt-10">
                  <button
                    onClick={closeModal}
                    className="flex-1 py-4 rounded-2xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 font-medium transition"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={
                      isEdit ? () => updateDepartment(obj_id) : addDepartment
                    }
                    className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all"
                  >
                    {isEdit ? "Update Department" : "Add Department"}
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
