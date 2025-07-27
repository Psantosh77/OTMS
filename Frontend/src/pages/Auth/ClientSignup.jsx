import React from "react";

const ClientSignup = () => {
  return (
    <div className="container col-md-6 offset-md-3 py-5">
      <h3 className="mb-4 text-center">Client Signup</h3>
      <form>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input type="text" className="form-control" placeholder="Your full name" />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input type="tel" className="form-control" placeholder="Your mobile number" />
        </div>
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input type="email" className="form-control" placeholder="Your email" />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" placeholder="Create a password" />
        </div>
        <button type="submit" className="btn btn-primary w-100">Signup</button>
      </form>
    </div>
  );
};

export default ClientSignup;
