import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Header />
      <main className="admin-main">
        <Outlet />
      </main>
      <style jsx>{`
        .admin-layout {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .admin-main {
          padding: 20px;
          min-height: calc(100vh - 120px);
        }
        @media (max-width: 768px) {
          .admin-main {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
