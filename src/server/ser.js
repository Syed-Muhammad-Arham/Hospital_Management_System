// server.js → TERA PURA BACKEND AB 100% PERFECT + SAFE
import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";

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

    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("MongoDB Connection Failed:", err);
    process.exit(1);
  }
}

connectDB();

app.post("/add_admin", async (req, res) => {
  try {
    await admins.insertOne(req.body);
    res.json({ message: "Admin added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding admin" });
  }
});

app.get("/admins", async (req, res) => {
  const data = await admins.find({}).toArray();
  res.json({ admins: data });
});

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
    const result = await doctors.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
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
  const result = await departments.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.json({ modifiedCount: result.modifiedCount });
});

app.delete("/departments/:id", async (req, res) => {
  const result = await departments.deleteOne({
    _id: new ObjectId(req.params.id),
  });
  res.json({ deleted: result.deletedCount === 1 });
});

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
  const result = await patients.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.json({ modifiedCount: result.modifiedCount });
});

app.patch("/patients/:id", async (req, res) => {
  const result = await patients.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.json({ modifiedCount: result.modifiedCount });
});

app.delete("/patients/:id", async (req, res) => {
  const result = await patients.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ deleted: result.deletedCount === 1 });
});

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
  const result = await appointments.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.json({ modifiedCount: result.modifiedCount });
});

app.delete("/appointments/:id", async (req, res) => {
  const result = await appointments.deleteOne({
    _id: new ObjectId(req.params.id),
  });
  res.json({ deleted: result.deletedCount === 1 });
});
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
  const result = await medicine.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
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
  const result = await equipment.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
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
