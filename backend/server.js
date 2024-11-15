const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = 5000; // You can use any available port

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// PostgreSQL connection setup
// PostgreSQL connection setup
const pool = new Pool({
    user: 'knight', // Replace with your PostgreSQL username if needed
    host: 'localhost', // Or your database host
    database: 'knight', // Replace with your database name
    password: 'your_password', // Replace with your PostgreSQL password
    port: 5433, // Change to your PostgreSQL port
  });
  

// POST endpoint to handle form submission
app.post('/submit-form', async (req, res) => {
  const {
    fullName,
    dateOfBirth,
    gender,
    contactNumber,
    email,
    currentAddress,
    graduationYear,
    jobTitle,
    currentEmployer,
  } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO alumni (full_name, date_of_birth, gender, contact_number, email, current_address, graduation_year, job_title, current_employer) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [fullName, dateOfBirth, gender, contactNumber, email, currentAddress, graduationYear, jobTitle, currentEmployer]
    );
    res.status(201).json({ message: 'Data inserted successfully!', data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ message: 'Error inserting data', error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
app.get('/filter-alumni', async (req, res) => {
  const {
    graduationYear,
    employerName,
    jobTitle,
    currentEmployer,
    name,
  } = req.query;

  let query = 'SELECT * FROM alumni WHERE 1=1';
  const params = [];

  if (graduationYear) {
    params.push(graduationYear);
    query += ` AND graduation_year = $${params.length}`;
  }

  if (employerName) {
    params.push(`%${employerName}%`);
    query += ` AND current_employer ILIKE $${params.length}`;
  }

  if (jobTitle) {
    params.push(`%${jobTitle}%`);
    query += ` AND job_title ILIKE $${params.length}`;
  }

  if (currentEmployer) {
    params.push(`%${currentEmployer}%`);
    query += ` AND current_employer ILIKE $${params.length}`;
  }

  if (name) {
    params.push(`%${name}%`);
    query += ` AND full_name ILIKE $${params.length}`;
  }

  try {
    const result = await pool.query(query, params);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data', error });
  }
});
