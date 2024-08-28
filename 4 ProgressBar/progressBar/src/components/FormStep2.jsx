import React from "react";

export default function FormStep2({ formData, handleChange }) {
  return (
    <div className="form-step">
      <h2>Step 2: Contact Information</h2>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
