import React from 'react';
import './Navbar.css';

//Navbar Component for the whole website. CSS file Needed.
const Navbar = () => {
    return(
        <div className="menu-nav">
                <a id="Main-Access-Nav"><i class="fa fa-bars"></i></a>
            <nav id="Main-nav">
                <a href="/">Home</a>
                <a href="/recent-reports">Recent Reports</a>
                <a href='/historical-data'>Historical Data</a>
                <a href='/analytics'>Analytics</a>
                <a href='report'>Make a report</a>
            </nav>
        </div>
    );
};

export default Navbar;