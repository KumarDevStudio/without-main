import React, { useState } from 'react';
import './Form.css';

const Form = () => {
  const [person, setPerson] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  const validateValues = (data) => {
    let validationErrors = {};
    if (data.name.trim().length < 4) {
      validationErrors.name = 'Name must be at least 4 characters long.';
    }
    if (!data.email.trim()) {
      validationErrors.email = 'Email is required.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      validationErrors.email = 'Email is invalid.';
    }
    if (!data.message.trim()) {
      validationErrors.message = 'Message is required.';
    } else if (data.message.length > 100) {
      validationErrors.message = 'Message cannot exceed 100 characters.';
    }
    return validationErrors;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateValues(person);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const storedData = JSON.parse(localStorage.getItem('ArrayData')) || [];
    storedData.push(person);
    localStorage.setItem('ArrayData', JSON.stringify(storedData));

    setPerson({ name: '', email: '', message: '' });
    setErrors({});
    alert('Data saved successfully!');
  };

  const handleChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h2>Submit Your Details</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={person.name}
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={person.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={person.message}
            onChange={handleChange}
            rows="4"
          ></textarea>
          {errors.message && <p>{errors.message}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
