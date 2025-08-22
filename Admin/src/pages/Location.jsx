import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import LocationModal from "./LocationModal";
import "./Location.css";

function Location() {
  const [locations, setLocations] = useState([
    { id: 1, name: "Indore", code: "IND001", state: "Madhya Pradesh", city: "Indore", active: true },
    { id: 2, name: "Bhopal", code: "BPL002", state: "Madhya Pradesh", city: "Bhopal", active: false },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSave = (data) => {
    if (editData) {
      setLocations(locations.map((loc) => (loc.id === editData.id ? { ...loc, ...data } : loc)));
    } else {
      setLocations([...locations, { id: Date.now(), ...data }]);
    }
    setEditData(null);
  };

  const handleDelete = (id) => {
    setLocations(locations.filter((loc) => loc.id !== id));
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") return locations;
    return locations.filter(
      (loc) =>
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <>
      <div className="location-page">
        <div className="location-header">
          {/* Left Side Search */}
          <div className="search-box">
            <input
              type="text"
              placeholder="Search location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-btn">
              <FaSearch /> Search
            </button>
          </div>

          {/* Right Side Add Location */}
          <button className="add-btn" onClick={() => setModalOpen(true)}>
            <FaPlus /> Add Location
          </button>
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="location-table">
            <thead>
              <tr>
                <th>Location Name</th>
                <th>Location Code</th>
                <th>State</th>
                <th>City</th>
                <th>Active</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {handleSearch().map((loc) => (
                <tr key={loc.id}>
                  <td>{loc.name}</td>
                  <td>{loc.code}</td>
                  <td>{loc.state}</td>
                  <td>{loc.city}</td>
                  <td>
                    <span className={`status ${loc.active ? "active" : "inactive"}`}>
                      {loc.active ? "True" : "False"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditData(loc);
                        setModalOpen(true);
                      }}
                    >
                      <FaEdit /> Edit
                    </button>
                  </td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(loc.id)}>
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <LocationModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditData(null);
        }}
        onSubmit={handleSave}
        initialData={editData}
        mode={editData ? "edit" : "add"}
      />
    </>
  );
}

export default Location;
