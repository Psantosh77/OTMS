import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route } from "react-router-dom";
import Header from './Components/Header';
import Sidebar from './Components/Sidebar'
import Dashboard from "./pages/Dashboard";
import Faq from "./pages/Faq";
import Blog from "./pages/Blog";
// import Service from './pages/service';
import Location from './pages/Location';
import "./App.css";

function App() {

  return (
      <div className="app">
        <Header/>
        <Sidebar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/blog" element={<Blog />} />
        {/* <Route path="/service" element={<Service />} /> */}
        <Route path="/location" element={<Location />} />
      </Routes>
    </div>
  )
}

export default App
