import React from 'react';

const KYC = () => {
  return (
    <div className="container py-4">
      <h2>KYC Verification</h2>
      <form className="mt-4">
        <div className="mb-3">
          <label className="form-label">Aadhar Card Upload</label>
          <input type="file" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">PAN Card Upload</label>
          <input type="file" className="form-control" />
        </div>
        <button className="btn btn-primary">Submit for Verification</button>
      </form>
    </div>
  );
};

export default KYC;
