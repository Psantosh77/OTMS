import React, { useState, useEffect } from "react";
import "./Faq.css";

function FaqModal({ open, onClose, onSubmit, editData, mode }) {
  const [formData, setFormData] = useState({
    category: "",
    question: "",
    answer: "",
    active: true,
  });

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData({ category: "", question: "", answer: "", active: true });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{mode === "edit" ? "Edit FAQ" : "Add FAQ"}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="question"
            placeholder="Question"
            value={formData.question}
            onChange={handleChange}
            required
          />
          <textarea
            name="answer"
            placeholder="Answer"
            value={formData.answer}
            onChange={handleChange}
            required
          ></textarea>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
            />
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

export default FaqModal;
