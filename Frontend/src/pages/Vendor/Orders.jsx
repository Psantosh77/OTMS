import React from 'react';

const Orders = () => {
  return (
    <div className="container py-4">
      <h2>Vendor Orders</h2>
      <table className="table table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>Order ID</th>
            <th>Client</th>
            <th>Service</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#1001</td>
            <td>John Doe</td>
            <td>Oil Change</td>
            <td>Pending</td>
            <td>27 July 2025</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
