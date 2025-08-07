import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const VendorLayout = () => {
  return (
    <div className="vendor-layout">
      <Header />
      <main className="vendor-main">
        <Outlet />
      </main>
      <style jsx>{`
        .vendor-layout {
          min-height: 100vh;
          background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
        }
        .vendor-main {
          padding: 20px;
          min-height: calc(100vh - 120px);
        }
        @media (max-width: 768px) {
          .vendor-main {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default VendorLayout;
