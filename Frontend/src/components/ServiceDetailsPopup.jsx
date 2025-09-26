import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

export default function ServiceDetailsPopup({ 
  service, 
  details = [], 
  onClose, 
  onSave 
}) {
  const [vehicle, setVehicle] = useState("");
  const [van, setVan] = useState("");
  const [list, setList] = useState(details);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    setList(details); // parent se aayi list sync karo
  }, [details]);

  const addOrUpdateDetail = () => {
    if (!vehicle || !van) return;

    if (editIndex !== null) {
      // Edit mode
      const updated = [...list];
      updated[editIndex] = { vehicle, van };
      setList(updated);
      setEditIndex(null);
    } else {
      // Add mode
      setList([...list, { vehicle, van }]);
    }

    setVehicle("");
    setVan("");
  };

  const deleteDetail = (index) => {
    const updated = [...list];
    updated.splice(index, 1);
    setList(updated);
  };

  const editDetail = (index) => {
    setVehicle(list[index].vehicle);
    setVan(list[index].van);
    setEditIndex(index);
  };

  const handleSubmit = () => {
    onSave(list);   // parent me bhejna
    onClose();
  };

  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" 
      style={{ background: "rgba(0,0,0,0.5)", zIndex: 1050 }}
    >
      <div className="bg-white p-4 rounded shadow" style={{ width: "400px" }}>
        <h5 className="mb-3">{service?.title}</h5>

        {/* Inputs */}
        <input
          type="text"
          placeholder="Vehicle Number"
          className="form-control mb-2"
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Van Number"
          className="form-control mb-2"
          value={van}
          onChange={(e) => setVan(e.target.value)}
        />

        <button className="btn btn-success w-100 mb-3" onClick={addOrUpdateDetail}>
          {editIndex !== null ? "Update Vehicle" : "Add Vehicle"}
        </button>

        {/* List */}
        <ul className="list-group mb-3">
          {list.map((item, i) => (
            <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{item.vehicle} - {item.van}</span>
              <div>
                <button 
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => editDetail(i)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button 
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => deleteDetail(i)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
