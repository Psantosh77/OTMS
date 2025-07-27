import React from "react";

const ClientLogin = () => {
  return (
    <div className="container col-md-6 offset-md-3 py-5">
      <h3 className="mb-4 text-center">Client Login</h3>
      <form>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" placeholder="Enter email" />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" placeholder="Enter password" />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default ClientLogin;
