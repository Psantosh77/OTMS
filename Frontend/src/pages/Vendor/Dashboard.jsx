import React from 'react';

const Dashboard = () => {
  return (
    <div className="container py-4">
      <h2 className="mb-4">Vendor Dashboard</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow-sm mb-3">
            <div className="card-body">
              <h5>Total Orders</h5>
              <p>0</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm mb-3">
            <div className="card-body">
              <h5>Earnings</h5>
              <p>₹0</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm mb-3">
            <div className="card-body">
              <h5>Profile Status</h5>
              <p>Pending</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
