import React from 'react';

const PricingSetup = () => {
  return (
    <div className="container py-4">
      <h2>Pricing Setup</h2>
      <form className="row g-3 mt-3">
        <div className="col-md-6">
          <label className="form-label">Service Type</label>
          <select className="form-select">
            <option>Oil Change</option>
            <option>AC Repair</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Base Price (₹)</label>
          <input type="number" className="form-control" />
        </div>
        <div className="col-12">
          <button className="btn btn-success mt-2">Save Pricing</button>
        </div>
      </form>
    </div>
  );
};

export default PricingSetup;
