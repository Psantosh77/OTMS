import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom"; // 👈 this will render child routes

const MainLayout = () => {
  return (
    <>
      
      <main>
        <Outlet /> {/* 👈 This will inject Home, About, etc. */}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
