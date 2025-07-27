import React from 'react';

const Services = () => {
  return (
    <div className="container py-4">
      <h2>Services Offered</h2>
      <ul className="list-group mt-3">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Oil Change
          <button className="btn btn-danger btn-sm">Remove</button>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Car Wash
          <button className="btn btn-danger btn-sm">Remove</button>
        </li>
      </ul>
      <form className="mt-4">
        <div className="mb-3">
          <label className="form-label">Add New Service</label>
          <input type="text" className="form-control" placeholder="Enter service name" />
        </div>
        <button className="btn btn-primary">Add Service</button>
      </form>
    </div>
  );
};

export default Services;
