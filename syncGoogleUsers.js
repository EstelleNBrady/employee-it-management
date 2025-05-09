const { google } = require("googleapis");
const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();
const Employee = require("./backend/models/employee");

// Load Service Account Credentials
const credentials = JSON.parse(fs.readFileSync("C:\\Users\\ebrady\\employee-it-management-1\\backend\\config\\employee-it-management-81244917bfe9.json"));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Authenticate Google API
async function authenticate() {
  const auth = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ["https://www.googleapis.com/auth/admin.directory.user.readonly"],
    "estelle.brady@broughtonpartners.com"
  );
  return auth;
}

// Fetch Users from Google Workspace
async function fetchUsers() {
  const auth = await authenticate();
  const service = google.admin({ version: "directory_v1", auth });

  const res = await service.users.list({
    customer: "my_customer",
    maxResults: 200,
    orderBy: "email",
  });

  return res.data.users || [];
}

// Sync Data with MongoDB
async function syncUsers() {
  const users = await fetchUsers();

  for (const user of users) {
    await Employee.findOneAndUpdate(
      { googleId: user.id },
      {
        googleId: user.id,
        name: user.name.fullName,
        email: user.primaryEmail,
        department: user.orgUnitPath,
        role: user.isAdmin ? "Admin" : "User",
      },
      { upsert: true, new: true }
    );
  }

  console.log("Google Workspace users synced!");
  mongoose.connection.close();
}

// Export the syncUsers function
module.exports = syncUsers;