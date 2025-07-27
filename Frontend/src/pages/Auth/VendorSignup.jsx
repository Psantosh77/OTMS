import React from "react";

const VendorSignup = () => {
  return (
    <div className="container col-md-6 offset-md-3 py-5">
      <h3 className="mb-4 text-center">Vendor Signup</h3>
      <form>
        <div className="mb-3">
          <label className="form-label">Garage Name</label>
          <input type="text" className="form-control" placeholder="Business/Garage Name" />
        </div>
        <div className="mb-3">
          <label className="form-label">Contact Number</label>
          <input type="tel" className="form-control" placeholder="Phone Number" />
        </div>
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input type="email" className="form-control" placeholder="Email" />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
};

export default VendorSignup;
