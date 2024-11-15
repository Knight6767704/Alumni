import React, { useState } from 'react';
import './AlumniForm.css'; // Optional: For custom styles if needed

const AlumniForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    contactNumber: '',
    email: '',
    currentAddress: '',
    graduationYear: '',
    jobTitle: '',
    currentEmployer: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/submit-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
        if (response.ok) {
          alert('Form submitted successfully!');
          console.log('Server Response:', data);
        } else {
          alert(`Submission failed: ${data.message}`);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error submitting form');
      }
    }
  };
  

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    const yearRegex = /^\d{4}$/;

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.contactNumber) {
      newErrors.contactNumber = 'Contact Number is required';
    } else if (!phoneRegex.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Invalid phone number. Please use 10-15 digits.';
    }
    if (!formData.email) {
      newErrors.email = 'Email Address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.currentAddress.trim()) newErrors.currentAddress = 'Current Address is required';
    if (!formData.graduationYear) {
      newErrors.graduationYear = 'Graduation Year is required';
    } else if (!yearRegex.test(formData.graduationYear)) {
      newErrors.graduationYear = 'Please enter a valid year (e.g., 2024)';
    }
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job Title is required';
    if (!formData.currentEmployer.trim()) newErrors.currentEmployer = 'Current Employer is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <form onSubmit={handleSubmit} className="alumni-form">
      <h2>Alumni Registration Form</h2>

      <div className="form-group">
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <small className="error">{errors.fullName}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="dateOfBirth">Date of Birth:</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
        {errors.dateOfBirth && <small className="error">{errors.dateOfBirth}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && <small className="error">{errors.gender}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="contactNumber">Contact Number:</label>
        <input
          type="tel"
          id="contactNumber"
          name="contactNumber"
          placeholder="Enter your phone number"
          value={formData.contactNumber}
          onChange={handleChange}
        />
        {errors.contactNumber && <small className="error">{errors.contactNumber}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <small className="error">{errors.email}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="currentAddress">Current Address:</label>
        <textarea
          id="currentAddress"
          name="currentAddress"
          placeholder="Enter your current address"
          value={formData.currentAddress}
          onChange={handleChange}
        />
        {errors.currentAddress && <small className="error">{errors.currentAddress}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="graduationYear">Graduation Year:</label>
        <input
          type="number"
          id="graduationYear"
          name="graduationYear"
          placeholder="Enter your graduation year (e.g., 2024)"
          value={formData.graduationYear}
          onChange={handleChange}
        />
        {errors.graduationYear && <small className="error">{errors.graduationYear}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="jobTitle">Job Title:</label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          placeholder="Enter your job title"
          value={formData.jobTitle}
          onChange={handleChange}
        />
        {errors.jobTitle && <small className="error">{errors.jobTitle}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="currentEmployer">Current Employer:</label>
        <input
          type="text"
          id="currentEmployer"
          name="currentEmployer"
          placeholder="Enter your current employer"
          value={formData.currentEmployer}
          onChange={handleChange}
        />
        {errors.currentEmployer && <small className="error">{errors.currentEmployer}</small>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default AlumniForm;
