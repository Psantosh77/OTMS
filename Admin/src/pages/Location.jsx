import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import LocationModal from "./LocationModal";
import "./Location.css";

function Location() {
  // const [locations, setLocations] = useState([
  //   { id: 1, name: "Indore", code: "IND001", state: "Madhya Pradesh", city: "Indore", active: true },
  //   { id: 2, name: "Bhopal", code: "BPL002", state: "Madhya Pradesh", city: "Bhopal", active: false },
  // ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
const [locationData, setlocationData] = useState([]);
 const [loading, setLoading] = useState(false);
    

  // Function to fetch Location data from API
  const getFaq = async () => {
     setLoading(true);
    try {
      const { postApi } = await import("../utils/apiConfig/apiService");
      const res = await postApi({ url: "locations/getlocation" });
      setlocationData(res?.data || res);
    } catch (err) {
      setlocationData([]);
      console.error("Error fetching FAQ:", err);
    }
    finally {
        setLoading(false);
      }
  };

  // Fetch FAQ data on mount
  React.useEffect(() => {
    getFaq();
  }, []);

 

  const handleDelete = (id) => {
    setlocationData(locationData.filter((loc) => loc._id !== id));
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") return locationData;
    return locationData.filter(
      (loc) =>
        loc.locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.locationCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.stateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.district.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // --------------------add a loction api---------------------

const handleSave = async (data) => {
  try {
    const { postApi } = await import("../utils/apiConfig/apiService");
    let res;

    if (editData) {
      // 👇 Edit case (sirf active status update karna)
      res = await postApi({
        url: "locations/update-active",
        payload: {
          id: editData._id,   // required by backend
          isActive: data.active,
        },
      });
    } else {
      // 👇 Add case (pehle duplicate check karo)
      const duplicate = locationData.some(
        (loc) => loc.locationCode === data.code
      );
      if (duplicate) {
        alert("Location Code already exists. Please use a different code.");
        return;
      }

      res = await postApi({
        url: "locations/add",
        payload: {
          locationName: data.name,
          locationCode: data.code,
          stateName: data.state,
          district: data.city,
          pinNo: data.pinNo,
          address: data.address,
          isActive: data.active,
        },
      });
    }

    console.log("API Response:", res);

    const newLocation = {
      ...res.data,
      _id: res.data._id || Date.now(),
    };

    if (editData) {
      setlocationData((prev) =>
        prev.map((loc) =>
          loc._id === editData._id ? { ...loc, ...newLocation } : loc
        )
      );
    } else {
      setlocationData((prev) => [...prev, newLocation]);
    }

    setEditData(null);
    setModalOpen(false);
    alert("Location saved successfully!");
  } catch (err) {
    alert(
      "Failed to save location: " +
        (err?.response?.data?.message || err?.message || "Unknown error")
    );
    console.error("Add Location Error:", err);
  }
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
                <tr key={loc._id}>
                  <td>{loc.locationName}</td>
                  <td>{loc.locationCode}</td>
                  <td>{loc.stateName}</td>
                  <td>{loc.district}</td>
                  <td>
                    <span className={`status ${loc.isActive ? "active" : "inactive"}`}>
                      {loc.isActive ? "True" : "False"}
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
                    <button className="delete-btn" onClick={() => handleDelete(loc._id)}>
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
