const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");
const getGoogleUsers = require("../utils/googleSync");
const syncGoogleUsers = require("../syncGoogleUsers");  // Correct path based on your project structure

// Create Employee
router.post("/", async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Sync route for testing
// In your employeeRoutes.js file
router.get('/sync', async (req, res) => {
  try {
    await syncGoogleUsers(); // Call the exported function
    res.status(200).json({ message: 'Users synced successfully' });
  } catch (err) {
    console.error("Sync Error:", err);
    res.status(500).json({ error: 'Failed to sync users', message: err.message });
  }
});
  

// Get All Employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get One Employee by ID
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Employee
router.put("/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Employee
router.delete("/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
