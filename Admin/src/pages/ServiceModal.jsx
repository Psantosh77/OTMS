import React, { useState, useEffect } from "react";
import "./Service.css";

const ServiceModal = ({ closeModal, addService, updateService, editingService }) => {
  const [title, setTitle] = useState("");
  const [subitems, setSubitems] = useState([{ name: "", price: "" }]);

  useEffect(() => {
    if (editingService) {
      setTitle(editingService.title);
      setSubitems(editingService.subitems);
    }
  }, [editingService]);

  // Add Subitem
  const handleAddSubitem = () => {
    setSubitems([...subitems, { name: "", price: "" }]);
  };

  // Update Subitem
  const handleSubitemChange = (index, field, value) => {
    const updated = [...subitems];
    updated[index][field] = value;
    setSubitems(updated);
  };

  // Delete Subitem
  const handleDeleteSubitem = (index) => {
    setSubitems(subitems.filter((_, i) => i !== index));
  };

  // Save Service
  const handleSubmit = (e) => {
    e.preventDefault();
    const newService = { id: editingService?.id || Date.now(), title, subitems };
    if (editingService) {
      updateService(newService);
    } else {
      addService(newService);
    }
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{editingService ? "✏️ Edit Service" : "➕ Add Service"}</h3>
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter service title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <h4>Subitems</h4>
          {subitems.map((item, index) => (
            <div key={index} className="subitem-row">
              <input
                type="text"
                placeholder="Subitem name"
                value={item.name}
                onChange={(e) => handleSubitemChange(index, "name", e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleSubitemChange(index, "price", e.target.value)}
                required
              />
              <button
                type="button"
                className="delete-btn"
                onClick={() => handleDeleteSubitem(index)}
              >
                ❌
              </button>
            </div>
          ))}

          <button type="button" className="add-btn" onClick={handleAddSubitem}>
            ➕ Add Subitem
          </button>

          <div className="modal-actions">
            <button type="submit" className="save-btn">
              {editingService ? "💾 Update" : "✅ Save"}
            </button>
            <button type="button" className="cancel-btn" onClick={closeModal}>
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceModal;
