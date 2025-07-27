import React from "react";
import { useNavigate } from "react-router-dom";

const SelectUserType = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-5 text-center">
      <h2 className="mb-4">Continue as</h2>
      <div className="d-flex justify-content-center gap-3">
        <button className="btn btn-primary" onClick={() => navigate("/auth/client-login")}>Client</button>
        <button className="btn btn-success" onClick={() => navigate("/auth/vendor-login")}>Vendor</button>
        <button className="btn btn-danger" onClick={() => navigate("/auth/admin-login")}>Admin</button>
      </div>
    </div>
  );
};

export default SelectUserType;
