import React from 'react';

const Onboarding = () => {
  return (
    <div className="container py-4">
      <h2>Vendor Onboarding</h2>
      <p>Complete the steps to go live:</p>
      <ul className="list-group mt-3">
        <li className="list-group-item">✅ Basic Info</li>
        <li className="list-group-item">✅ Service Category</li>
        <li className="list-group-item">🔄 KYC Verification</li>
        <li className="list-group-item">🔒 Admin Approval</li>
      </ul>
    </div>
  );
};

export default Onboarding;
