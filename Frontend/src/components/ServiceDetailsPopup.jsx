import React, { useState } from "react";

export default function ServiceDetailsPopup({ 
  service, 
  details = [], 
  onClose, 
  onSave 
}) {
  const [vehicle, setVehicle] = useState("");
  const [van, setVan] = useState("");
  const [list, setList] = useState(details);

  const addDetail = () => {
    if (!vehicle || !van) return;
    setList([...list, { vehicle, van }]);
    setVehicle("");
    setVan("");
  };

  const deleteDetail = (index) => {
    const updated = [...list];
    updated.splice(index, 1);
    setList(updated);
  };

  const handleSubmit = () => {
    onSave(list);   // parent me data bhejna
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

        <button className="btn btn-success w-100 mb-3" onClick={addDetail}>
          Add Vehicle
        </button>

        {/* List */}
        <ul className="list-group mb-3">
          {list.map((item, i) => (
            <li key={i} className="list-group-item d-flex justify-content-between">
              {item.vehicle} - {item.van}
              <button className="btn btn-sm btn-danger" onClick={() => deleteDetail(i)}>
                Delete
              </button>
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
