
import React from "react";
import CustomerDashboardHeader from "./CustomerDashboardHeader";
import VendorCatalogCard from "../../components/VendorCatalogCard";
import FilterBar from "../../components/FilterBar";
import { useState, useEffect } from "react";


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

  useEffect(() => {
    const rerenderOnUserUpdate = () => setUserUpdateFlag(f => f + 1);
    window.addEventListener('user-updated', rerenderOnUserUpdate);
    return () => window.removeEventListener('user-updated', rerenderOnUserUpdate);
  }, []);

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

  return (
    <>
      <CustomerDashboardHeader />
      <div style={{ padding: '24px 0', background: '#fff1eb', borderRadius: 16 }}>
        <FilterBar filters={filters} setFilters={setFilters} onFilter={handleFilter} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'flex-start' }}>
          {filteredVendors.map((vendor, idx) => (
            <VendorCatalogCard key={idx} vendor={vendor} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;

