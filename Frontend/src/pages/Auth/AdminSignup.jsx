import React from "react";

const AdminSignup = () => {
  return (
    <div className="container col-md-6 offset-md-3 py-5">
      <h3 className="mb-4 text-center">Admin Registration</h3>
      <form>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input type="text" className="form-control" placeholder="Admin username" />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" placeholder="Email" />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-dark w-100">Register</button>
      </form>
    </div>
  );
};

export default AdminSignup;
