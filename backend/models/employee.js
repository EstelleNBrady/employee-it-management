const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },  // Add googleId here
  name: { type: String, required: true },
  email: { type: String, required: false, unique: true },
  department: { type: String },
  jobTitle: { type: String },
  software: [{ type: String }],
  devices: [{ type: String }],
});

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
