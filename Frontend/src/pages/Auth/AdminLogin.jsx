import React from "react";

const AdminLogin = () => {
  return (
    <div className="container col-md-6 offset-md-3 py-5">
      <h3 className="mb-4 text-center">Admin Login</h3>
      <form>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input type="text" className="form-control" placeholder="Enter admin username" />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" placeholder="Enter password" />
        </div>
        <button type="submit" className="btn btn-dark w-100">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
