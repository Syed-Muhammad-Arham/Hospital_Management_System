<<<<<<< HEAD
// ser.js → TERA PURA BACKEND AB 100% PERFECT + LOGIN READY
import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import dns from "dns";

// Pakistan ISP DNS Fix for MongoDB Atlas
dns.setServers(["8.8.8.8", "8.8.4.4"]);
=======
// server.js → TERA PURA BACKEND AB 100% PERFECT + SAFE
import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
>>>>>>> 810dcecb017ab3bc6e666a4a1b853662c60cf58b

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = "mongodb+srv://arham:arham@arham.kdehejt.mongodb.net/";
const client = new MongoClient(uri);
const dbName = "hospital_management";

let admins, doctors, patients, departments, appointments, medicine, equipment;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db(dbName);

    admins = db.collection("admins");
    doctors = db.collection("doctors");
    patients = db.collection("patients");
    departments = db.collection("departments");
    appointments = db.collection("appointments");
    medicine = db.collection("medicine");
    equipment = db.collection("equipment");

<<<<<<< HEAD
    // Agar database me koi admin nahi hai toh default Super Admin bana dega
    const adminCount = await admins.countDocuments();
    if (adminCount === 0) {
      await admins.insertOne({
        name: "Arham Ahmed",
        email: "syedmuhammadarham0@gmail.com",
        password: "admin123",
        role: "Super Admin",
      });
      console.log(
        "Default Admin Created -> Email: syedmuhammadarham0@gmail.com | Pass: admin123",
      );
    }

=======
>>>>>>> 810dcecb017ab3bc6e666a4a1b853662c60cf58b
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("MongoDB Connection Failed:", err);
    process.exit(1);
  }
}

connectDB();

<<<<<<< HEAD
// ================= LOGIN ROUTE (DATABASE CHECK) =================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Pehle Admins collection me check karega
    const admin = await admins.findOne({ email, password });
    if (admin) {
      return res.status(200).json({
        message: "Login successful",
        user: {
          _id: admin._id,
          name: admin.name || "Arham Ahmed",
          email: admin.email,
          role: admin.role || "Super Admin",
        },
      });
    }

    // 2. Agar admin nahi mila, toh Doctors collection me bhi check kar lega
    const doctor = await doctors.findOne({ email, password });
    if (doctor) {
      return res.status(200).json({
        message: "Login successful",
        user: {
          _id: doctor._id,
          name: `Dr. ${doctor.name}`,
          email: doctor.email,
          role: "Doctor",
        },
      });
    }

    // 3. Agar dono me nahi mila toh error bhejega
    return res.status(401).json({ message: "Invalid Email or Password!" });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});

// ================= ADMINS ROUTES =================
app.post("/add_admin", async (req, res) => {
  try {
    const existing = await admins.findOne({ email: req.body.email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists!" });
    }
    await admins.insertOne({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role || "Admin",
    });
    res.status(200).json({ message: "Admin added successfully" });
=======
app.post("/add_admin", async (req, res) => {
  try {
    await admins.insertOne(req.body);
    res.json({ message: "Admin added successfully" });
>>>>>>> 810dcecb017ab3bc6e666a4a1b853662c60cf58b
  } catch (err) {
    res.status(500).json({ message: "Error adding admin" });
  }
});

app.get("/admins", async (req, res) => {
  const data = await admins.find({}).toArray();
  res.json({ admins: data });
});

<<<<<<< HEAD
// ================= DOCTORS ROUTES =================
=======
>>>>>>> 810dcecb017ab3bc6e666a4a1b853662c60cf58b
app.post("/add_doctor", async (req, res) => {
  try {
    await doctors.insertOne(req.body);
    res.json({ message: "Doctor added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding doctor" });
  }
});

app.get("/doctors", async (req, res) => {
  const data = await doctors.find({}).toArray();
  res.json({ doctors: data });
});

app.put("/doctor/:id", async (req, res) => {
  try {
<<<<<<< HEAD
    const { _id, ...updateFields } = req.body;
    const result = await doctors.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updateFields },
=======
    const result = await doctors.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
>>>>>>> 810dcecb017ab3bc6e666a4a1b853662c60cf58b
    );
    res.json({
      message: "Doctor updated",
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

app.delete("/doctor/:id", async (req, res) => {
  try {
    const result = await doctors.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json({ deleted: result.deletedCount === 1 });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

<<<<<<< HEAD
// ================= DEPARTMENTS ROUTES =================
=======
>>>>>>> 810dcecb017ab3bc6e666a4a1b853662c60cf58b
app.post("/add_department", async (req, res) => {
  try {
    await departments.insertOne(req.body);
    res.json({ message: "Department added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

app.get("/departments", async (req, res) => {
  const data = await departments.find({}).toArray();
  res.json({ departments: data });
});

app.put("/departments/:id", async (req, res) => {
<<<<<<< HEAD
  const { _id, ...updateFields } = req.body;
  const result = await departments.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: updateFields },
=======
  const result = await departments.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
>>>>>>> 810dcecb017ab3bc6e666a4a1b853662c60cf58b
  );
  res.json({ modifiedCount: result.modifiedCount });
});

app.delete("/departments/:id", async (req, res) => {
  const result = await departments.deleteOne({
    _id: new ObjectId(req.params.id),
  });
  res.json({ deleted: result.deletedCount === 1 });
});

<<<<<<< HEAD
// ================= PATIENTS ROUTES =================
=======
>>>>>>> 810dcecb017ab3bc6e666a4a1b853662c60cf58b
app.post("/add_patients", async (req, res) => {
  try {
    await patients.insertOne(req.body);
    res.json({ message: "Patient added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

app.get("/patients", async (req, res) => {
  const data = await patients.find({}).toArray();
  res.json({ patients: data });
});

app.put("/patients/:id", async (req, res) => {
<<<<<<< HEAD
  const { _id, ...updateFields } = req.body;
  const result = await patients.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: updateFields },
=======
  const result = await patients.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
>>>>>>> 810dcecb017ab3bc6e666a4a1b853662c60cf58b
  );
  res.json({ modifiedCount: result.modifiedCount });
});

app.patch("/patients/:id", async (req, res) => {
<<<<<<< HEAD
  const { _id, ...updateFields } = req.body;
  const result = await patients.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: updateFields },
=======
  const result = await patients.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
>>>>>>> 810dcecb017ab3bc6e666a4a1b853662c60cf58b
  );
  res.json({ modifiedCount: result.modifiedCount });
});

app.delete("/patients/:id", async (req, res) => {
  const result = await patients.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ deleted: result.deletedCount === 1 });
});

<<<<<<< HEAD
// ================= APPOINTMENTS ROUTES =================
=======
>>>>>>> 810dcecb017ab3bc6e666a4a1b853662c60cf58b
app.post("/add_appointment", async (req, res) => {
  try {
    await appointments.insertOne(req.body);
    res.json({ message: "Appointment booked!" });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

app.get("/appointments", async (req, res) => {
  const data = await appointments.find({}).toArray();
  res.json({ appointments: data });
});

app.put("/appointments/:id", async (req, res) => {
<<<<<<< HEAD
  const { _id, ...updateFields } = req.body;
  const result = await appointments.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: updateFields },
=======
  const result = await appointments.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
>>>>>>> 810dcecb017ab3bc6e666a4a1b853662c60cf58b
  );
  res.json({ modifiedCount: result.modifiedCount });
});

app.delete("/appointments/:id", async (req, res) => {
  const result = await appointments.deleteOne({
    _id: new ObjectId(req.params.id),
  });
  res.json({ deleted: result.deletedCount === 1 });
});
<<<<<<< HEAD

// ================= MEDICINE ROUTES =================
=======
>>>>>>> 810dcecb017ab3bc6e666a4a1b853662c60cf58b
app.post("/add_medicine", async (req, res) => {
  try {
    await medicine.insertOne(req.body);
    res.json({ message: "Medicine added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding medicine" });
  }
});

app.get("/medicine", async (req, res) => {
  const data = await medicine.find({}).toArray();
  res.json({ medicine: data });
});

app.put("/medicine/:id", async (req, res) => {
<<<<<<< HEAD
  const { _id, ...updateFields } = req.body;
  const result = await medicine.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: updateFields },
=======
  const result = await medicine.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
>>>>>>> 810dcecb017ab3bc6e666a4a1b853662c60cf58b
  );
  res.json({
    message: "Medicine updated",
    modifiedCount: result.modifiedCount,
  });
});

app.delete("/medicine/:id", async (req, res) => {
  const result = await medicine.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ deleted: result.deletedCount === 1 });
});

<<<<<<< HEAD
// ================= EQUIPMENT ROUTES =================
=======
>>>>>>> 810dcecb017ab3bc6e666a4a1b853662c60cf58b
app.post("/add_equipment", async (req, res) => {
  try {
    await equipment.insertOne(req.body);
    res.json({ message: "Equipment added" });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

app.get("/equipment", async (req, res) => {
  const data = await equipment.find({}).toArray();
  res.json({ equipment: data });
});

app.put("/equipment/:id", async (req, res) => {
<<<<<<< HEAD
  const { _id, ...updateFields } = req.body;
  const result = await equipment.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: updateFields },
=======
  const result = await equipment.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
>>>>>>> 810dcecb017ab3bc6e666a4a1b853662c60cf58b
  );
  res.json({ modifiedCount: result.modifiedCount });
});

app.delete("/equipment/:id", async (req, res) => {
  const result = await equipment.deleteOne({
    _id: new ObjectId(req.params.id),
  });
  res.json({ deleted: result.deletedCount === 1 });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} Successfully`);
});
