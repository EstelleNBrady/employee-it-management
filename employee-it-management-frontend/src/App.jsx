import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch employees from the backend
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/employees");
        setEmployees(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <h1>Employee IT Management</h1>
      {error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <ul>
          {employees.map((employee) => (
            <li key={employee._id}>
              {employee.name} - {employee.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;