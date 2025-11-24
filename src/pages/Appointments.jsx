// src/pages/Appointments.jsx → PURA REPLACE KAR DE, SAB CHALEGA!
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Calendar,
  Clock,
  User,
  Stethoscope,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [editAppt, setEditAppt] = useState(null);

  const [form, setForm] = useState({
    patient_id: "",
    doctor_id: "",
    date: "",
    time: "",
    status: "Scheduled",
    notes: "",
  });

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [apptRes, docRes, patRes] = await Promise.all([
        axios.get("http://localhost:8000/appointments"),
        axios.get("http://localhost:8000/doctors"),
        axios.get("http://localhost:8000/patients"),
      ]);
      setAppointments(apptRes.data.appointments || []);
      setDoctors(docRes.data.doctors || []);
      setPatients(patRes.data.patients || []);
    } catch (err) {
      console.error(err);
    }
  };

  const getDoctorName = (id) => {
    const doc = doctors.find((d) => d._id === id);
    return doc ? doc.name : "Unknown Doctor";
  };

  const getPatientName = (id) => {
    const pat = patients.find((p) => p._id === id);
    return pat ? pat.name : "Unknown Patient";
  };

  const handleSave = async () => {
    try {
      if (editAppt) {
        await axios.put(
          `http://localhost:8000/appointments/${editAppt._id}`,
          form
        );
      } else {
        await axios.post("http://localhost:8000/add_appointment", form);
      }
      setModal(false);
      setEditAppt(null);
      fetchAll();
      alert(editAppt ? "Appointment Updated!" : "Appointment Booked!");
    } catch (err) {
      console.error(err);
      alert("Failed! Check console");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;
    try {
      await axios.delete(`http://localhost:8000/appointments/${id}`);
      fetchAll();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const openEdit = (appt) => {
    setEditAppt(appt);
    setForm({
      patient_id: appt.patient_id || "",
      doctor_id: appt.doctor_id || "",
      date: appt.date ? appt.date.split("T")[0] : "",
      time: appt.time || "",
      status: appt.status || "Scheduled",
      notes: appt.notes || "",
    });
    setModal(true);
  };

  const openAdd = () => {
    setEditAppt(null);
    setForm({
      patient_id: "",
      doctor_id: "",
      date: "",
      time: "",
      status: "Scheduled",
      notes: "",
    });
    setModal(true);
  };

  const filtered = appointments.filter(
    (a) =>
      getDoctorName(a.doctor_id)
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      getPatientName(a.patient_id)
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      a.date?.includes(search) ||
      a.status?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 p-6 lg:p-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-6xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Appointments
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-4">
          Manage all patient appointments
        </p>
      </motion.div>

      {/* Search + Add */}
      <div className="flex flex-col lg:flex-row gap-6 mb-10 max-w-7xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500 z-10" />
          <input
            type="text"
            placeholder="Search by doctor, patient, date, status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-16 pr-8 py-5 bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl border border-gray-200/60 dark:border-gray-700/60 focus:ring-4 focus:ring-indigo-500/40 outline-none text-lg shadow-lg"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openAdd}
          className="flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg rounded-3xl shadow-2xl"
        >
          <Plus className="w-7 h-7" /> Book Appointment
        </motion.button>
      </div>

      {/* Appointments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <AnimatePresence>
          {filtered.map((appt, i) => (
            <motion.div
              key={appt._id}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-white/90 dark:bg-gray-800/95 backdrop-blur-2xl rounded-3xl shadow-2xl hover:shadow-3xl border border-gray-200/50 dark:border-gray-700/60 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="p-8 relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-2xl">
                    <Calendar className="w-10 h-10" />
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${
                      appt.status === "Completed"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300"
                        : appt.status === "Cancelled"
                        ? "bg-red-100 text-red-700 dark:bg-red-900/60 dark:text-red-300"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/60 dark:text-yellow-300"
                    }`}
                  >
                    {appt.status === "Completed" ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : appt.status === "Cancelled" ? (
                      <XCircle className="w-4 h-4" />
                    ) : (
                      <Clock className="w-4 h-4" />
                    )}
                    {appt.status}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {getPatientName(appt.patient_id)}
                </h3>
                <p className="text-lg font-medium text-indigo-600 dark:text-indigo-400 mb-4">
                  Dr. {getDoctorName(appt.doctor_id)}
                </p>

                <div className="space-y-3 text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5" />{" "}
                    {new Date(appt.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5" /> {appt.time}
                  </div>
                  {appt.notes && (
                    <div className="text-sm italic mt-4 text-gray-500">
                      "{appt.notes}"
                    </div>
                  )}
                </div>

                <div className="mt-8 flex gap-4">
                  <button
                    onClick={() => openEdit(appt)}
                    className="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Edit2 className="w-5 h-5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(appt._id)}
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
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-3xl p-10 w-full max-w-4xl max-h-screen overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {editAppt ? "Update Appointment" : "Book New Appointment"}
                </h2>
                <button
                  onClick={() => setModal(false)}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <select
                  value={form.patient_id}
                  onChange={(e) =>
                    setForm({ ...form, patient_id: e.target.value })
                  }
                  className="px-6 py-5 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-4 focus:ring-indigo-500/30 outline-none text-lg"
                >
                  <option value="">Select Patient</option>
                  {patients.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name}
                    </option>
                  ))}
                </select>

                <select
                  value={form.doctor_id}
                  onChange={(e) =>
                    setForm({ ...form, doctor_id: e.target.value })
                  }
                  className="px-6 py-5 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-4 focus:ring-indigo-500/30 outline-none text-lg"
                >
                  <option value="">Select Doctor</option>
                  {doctors.map((d) => (
                    <option key={d._id} value={d._id}>
                      Dr. {d.name} ({d.specialization})
                    </option>
                  ))}
                </select>

                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="px-6 py-5 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-4 focus:ring-indigo-500/30 outline-none text-lg"
                />

                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="px-6 py-5 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-4 focus:ring-indigo-500/30 outline-none text-lg"
                />

                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="px-6 py-5 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-4 focus:ring-indigo-500/30 outline-none text-lg"
                >
                  <option>Scheduled</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>

                <input
                  placeholder="Notes (optional)"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="px-6 py-5 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-4 focus:ring-indigo-500/30 outline-none text-lg col-span-2"
                />
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
                  className="flex-1 py-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg shadow-2xl"
                >
                  {editAppt ? "Update Appointment" : "Book Appointment"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
