import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom"; // 👈 this will render child routes
import CTA from "../components/CTA";

const MainLayout = () => {
  return (
    <>
      <Header/>
      <main>
        <Outlet /> {/* 👈 This will inject Home, About, etc. */}
        <CTA/>
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
