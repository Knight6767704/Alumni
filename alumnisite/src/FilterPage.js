import React, { useState } from 'react';

const FilterPage = () => {
  const [filters, setFilters] = useState({
    graduationYear: '',
    employerName: '',
    jobTitle: '',
    currentEmployer: '',
    name: '',
  });
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    const queryParams = new URLSearchParams(filters).toString();
    try {
      const response = await fetch(`http://localhost:5000/filter-alumni?${queryParams}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data');
    }
  };

  return (
    <div>
      <h2>Filter Alumni Records</h2>
      <div className="filter-form">
        <div className="form-group">
          <label htmlFor="graduationYear">Graduation Year:</label>
          <input
            type="number"
            id="graduationYear"
            name="graduationYear"
            value={filters.graduationYear}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="employerName">Employer Name:</label>
          <input
            type="text"
            id="employerName"
            name="employerName"
            value={filters.employerName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="jobTitle">Job Title:</label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={filters.jobTitle}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="currentEmployer">Current Employer:</label>
          <input
            type="text"
            id="currentEmployer"
            name="currentEmployer"
            value={filters.currentEmployer}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={filters.name}
            onChange={handleChange}
          />
        </div>

        <button onClick={handleSearch}>Search</button>
      </div>

      <h3>Results:</h3>
      <ul>
        {results.length > 0 ? (
          results.map((alumni) => (
            <li key={alumni.id}>
              <p><strong>Name:</strong> {alumni.full_name}</p>
              <p><strong>Graduation Year:</strong> {alumni.graduation_year}</p>
              <p><strong>Job Title:</strong> {alumni.job_title}</p>
              <p><strong>Employer:</strong> {alumni.current_employer}</p>
            </li>
          ))
        ) : (
          <p>No results found</p>
        )}
      </ul>
    </div>
  );
};

export default FilterPage;
