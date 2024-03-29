import React from 'react';
import ReactDOM from 'react-dom/client';
import {Route, BrowserRouter, Redirect, Routes, } from "react-router-dom";
import './ComponentsCSS/Css/index.css';
import Home from './Pages/Home.js';
import HistoricalData from './Pages/Historical-Data.js';
import RecentReports from './Pages/Recent-Reports.js';
import Analytics from './Pages/Analytics.js';
import Report from './Pages/Make-a-Report.js';
import Navbar from "./ComponentsCSS/Navbar.js";
import LogIn from "./Pages/Log-In";
import Profile from "./Pages/Profile";

const root = ReactDOM.createRoot( document.getElementById('root') );
root.render(
    <BrowserRouter>
        <Navbar />
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/historical-data" element={<HistoricalData/>} />
            <Route exact path="/recent-reports" element={<RecentReports/>} />
            <Route exact path="/analytics" element={<Analytics/>} />
            <Route exact path="/report" element={<Report/>} />
            <Route exact path="/login" element={<LogIn/>} />
            <Route exact path="/profile" element={<Profile/>}/>
            {/* Add Routes HERE*/}
        </Routes>
    </BrowserRouter>
);