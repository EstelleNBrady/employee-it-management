const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: false, unique: true },
  department: { type: String },
  jobTitle: { type: String },
  software: [{ type: String }], // Array of software names
  devices: [{ type: String }], // Array of device names
});

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
