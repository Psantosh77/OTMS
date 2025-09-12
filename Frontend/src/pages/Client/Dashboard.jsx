
import React from "react";
import StarIcon from '@mui/icons-material/Star';
// import CustomerDashboardHeader from "./CustomerDashboardHeader";
import VendorCatalogCard from "../../components/VendorCatalogCard";
import FilterBar from "../../components/FilterBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


// Example vendor data
const vendorsData = [
  {
    name: "AutoCare Garage",
    image: "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=400&q=80",
    description: "Expert car repair and maintenance services.",
    services: ["Car Spa", "Repair", "Inspection", "Emergency"],
  },
  {
    name: "Speedy Rentals",
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&q=80",
    description: "Affordable car rentals for every need.",
    services: ["Car Rentals", "Scheduled Maintenance"],
  },
  {
    name: "Elite Motors",
    image: "https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?auto=format&fit=crop&w=400&q=80",
    description: "Premium vehicle inspection and spa.",
    services: ["Vehicle Inspection", "Car Spa"],
  },
];

const Dashboard = () => {
  const [filters, setFilters] = useState({
    location: "All",
    brand: "All",
    model: "All",
    service: "All",
    vendor: "All",
  });
  const [filteredVendors, setFilteredVendors] = useState(vendorsData);
  const [userUpdateFlag, setUserUpdateFlag] = useState(0);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const rerenderOnUserUpdate = () => setUserUpdateFlag(f => f + 1);
  //   window.addEventListener('user-updated', rerenderOnUserUpdate);
  //   return () => window.removeEventListener('user-updated', rerenderOnUserUpdate);
  // }, []);

  const handleFilter = () => {
    let result = vendorsData;
    if (filters.vendor !== "All") {
      result = result.filter(v => v.name === filters.vendor);
    }
    if (filters.service !== "All") {
      result = result.filter(v => v.services.includes(filters.service));
    }
    // For demo, brand/model/location are not in vendor data, so skip filtering them
    setFilteredVendors(result);
  };

  // Reset filtered vendors when filters are cleared
  useEffect(() => {
    if (
      filters.location === "All" &&
      filters.brand === "All" &&
      filters.model === "All" &&
      filters.service === "All" &&
      filters.vendor === "All"
    ) {
      setFilteredVendors(vendorsData);
    }
  }, [filters]);

  console.log("test", filteredVendors);

  return (
    <>
    
      <div
        style={{
          padding: '32px 0',
          borderRadius: 24,
          fontFamily: 'Inter, Roboto, Arial, sans-serif',
          minHeight: '100vh',
        
        }}
      >
       <div style={{ marginTop: "5rem" }}>
  <FilterBar
    filters={filters}
    setFilters={setFilters}
    onFilter={handleFilter}
  />
</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
            margin: '0 auto',
            maxWidth: 900,
            width: '100%',
              marginBlock: "4rem",
              
          }}
        >
          {filteredVendors.map((vendor, idx) => (
            <div
              key={idx}
              style={{
                background: '#fff',
                borderRadius: 16,
                boxShadow: '0 4px 24px 0 rgba(255,107,53,0.10)',
                padding: 0,
                width: '100%',
                marginBottom: 0,
                fontFamily: 'inherit',
                position: 'relative',
              }}
            >
              {/* Rating Star in top right */}
              <div style={{
                position: 'absolute',
                top: 16,
                right: 20,
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.95)',
                borderRadius: 16,
                padding: '2px 10px',
                boxShadow: '0 2px 8px 0 rgba(255,107,53,0.10)',
                fontWeight: 600,
                fontSize: 16,
                zIndex: 2
              }}>
                <span style={{ color: '#FFA726', marginRight: 4 }}>4.5</span>
                <StarIcon sx={{ color: '#FFA726', fontSize: 22 }} />
              </div>
              <VendorCatalogCard vendor={vendor} />
              {/* Book Now button in bottom right */}
              <button
                style={{
                  position: 'absolute',
                  bottom: 20,
                  right: 24,
                  background: 'linear-gradient(90deg, #ff9800 0%, #ff5722 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 22px',
                  fontWeight: 600,
                  fontSize: 16,
                  boxShadow: '0 2px 8px 0 rgba(255,107,53,0.10)',
                  cursor: 'pointer',
                  zIndex: 2
                }}
                onClick={() => navigate(`/service-details?vendorId=${encodeURIComponent(vendor.name)}`)}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;

