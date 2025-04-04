// utils/googleSync.js
const { google } = require("googleapis");
const auth = new google.auth.GoogleAuth({
    keyFile: "C:\\Users\\ebrady\\employee-it-management-1\\config\\employee-it-management-81244917bfe9.json", // Correct the path
    scopes: ["https://www.googleapis.com/auth/admin.directory.user.readonly"],
});
  

const getGoogleUsers = async () => {
  const admin = google.admin({ version: "directory_v1", auth });
  const res = await admin.users.list({
    customer: "my_customer",
    maxResults: 50,
    orderBy: "email",
  });
  return res.data.users;
};

module.exports = getGoogleUsers;
