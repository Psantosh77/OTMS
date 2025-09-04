import React, { useState, useEffect } from "react";
import "./Location.css";

function LocationModal({ isOpen, onClose, onSubmit, initialData, mode }) {
  const [form, setForm] = useState({
    name: "",
  code: "",
  state: "",
  city: "",
  pinNo: "",
  address: "",
  active: true,
  });

useEffect(() => {
  if (initialData) {
    setForm({
      name: initialData.locationName || "",
      code: initialData.locationCode || "",
      state: initialData.stateName || "",
      city: initialData.district || "",
      pinNo: initialData.pinNo || "",
      address: initialData.address || "",
      active: initialData.isActive ?? true,
    });
  } else {
    setForm({
      name: "",
      code: "",
      state: "",
      city: "",
      pinNo: "",
      address: "",
      active: true,
    });
  }
}, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{mode === "edit" ? "Edit Location" : "Add Location"}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <input type="text" name="name" placeholder="Location Name" value={form.name} onChange={handleChange} required />
          <input type="text" name="code" placeholder="Location Code" value={form.code} onChange={handleChange} required />
          <input type="text" name="state" placeholder="State" value={form.state} onChange={handleChange} required />
          <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} required />
          <input
  type="text"
  placeholder="Enter Pin Code"
  name="pinNo"
  value={form.pinNo || ""}
  onChange={handleChange} required
/>
<input
  type="text"
  name="address"
  placeholder="Enter Address"
  value={form.address || ""}
  onChange={handleChange}
  required
/>

          <label className="checkbox-label">
            <input type="checkbox" name="active" checked={form.active} onChange={handleChange} />
            Active
          </label>

          <div className="modal-actions">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LocationModal;
