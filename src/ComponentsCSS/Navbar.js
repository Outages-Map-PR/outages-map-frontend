import React, {useEffect, useState} from 'react';
import './/Css/Navbar.css';
import {Link} from "react-router-dom";
import {Button} from "./Button";
import {
    HiMenuAlt2,
    HiOutlineFolderOpen,
    HiOutlineDocumentReport,
    HiOutlinePresentationChartBar,
    HiOutlineLogin,
    HiOutlineLogout
} from 'react-icons/hi';
import {HiOutlineHome, HiXMark} from 'react-icons/hi2';
import {TbReportAnalytics} from 'react-icons/tb';




//Navbar Component for the whole website. CSS file Needed.
const Navbar = () => {
    const [nav, setNav] = useState(true);

    const handleNav = () => {
        setNav(!nav)
    }

    const [user, setUser] = useState(localStorage.getItem('user'))

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if(!loggedInUser) {
            setUser(0)
        }
    }, [])

    const handleLogout = () => {
        setUser(0);
        localStorage.clear();
    };

    let buttonUser1;
    if (user != 0){
        buttonUser1 = (<li className='nav-item'>
            <Link to='/' className='btn-mobile' onClick={handleLogout()}>
                <button
                    className='btn--outline btn btn--medium'>Logout
                </button>
            </Link></li>)
    } else{
        buttonUser1 = <li className='nav-item'>
            <Link to='/login' className='btn-mobile'>
                <button
                    className='btn--outline btn btn--medium'>Log In
                </button>
            </Link></li>
    }
    let buttonUser2;
    if (user != 0){
        buttonUser2 = (<li className='mobile-item'>
            <Link to='/' className='nav-links-mobile' onClick={handleLogout}>
                                <span>
                                <HiOutlineLogout className='icon-mobile' size='25px'/> Logout
                                </span>
            </Link>
        </li>)
    } else {
        buttonUser2 = (<li className='mobile-item'>
            <Link to='/login' className='nav-links-mobile'>
                                <span>
                                <HiOutlineLogin className='icon-mobile' size='25px'/> Login
                                </span>
            </Link>
        </li>)
    }


    return(
        <navbar className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">OUTAGES PR</Link>

                <ul className='nav-menu'>
                    <li className='nav-item'>
                        <Link to='/recent-reports' className='nav-links' >
                            Recent Reports
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/historical-data' className='nav-links' >
                            Historical Data
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/analytics' className='nav-links' >
                            Analytics
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/report' className='nav-links'>
                            Make a Report
                        </Link>
                    </li>
                    {buttonUser1}
                </ul>



                {/*Mobile Navbar*/}
                <div className=' menu-icon' onClick={handleNav}>
                    {!nav ? <HiXMark/> : <HiMenuAlt2/>}
                </div>

                <div className={!nav ? ' nav-menu active' : 'nav-item nav-menu hidden'}>
                    <ul className={!nav ? 'nav-item active' : 'nav-item hidden'}>
                        <li className='mobile-item'>
                            <Link to='/' className='nav-links-mobile' >
                                <span><HiOutlineHome className='icon-mobile' size='25px'/> Home </span>
                            </Link>
                        </li>
                        <li className='mobile-item'>
                            <Link to='/recent-reports' className='nav-links-mobile' >
                                <span>
                                    <TbReportAnalytics className='icon-mobile' size='25px'/> Recent Reports
                                </span>
                            </Link>
                        </li>
                        <li className='mobile-item'>
                            <Link to='/historical-data' className='nav-links-mobile' >
                                 <span>
                                     <HiOutlineFolderOpen className='icon-mobile' size='25px'/> Historical Data
                                      </span>
                            </Link>
                        </li>
                        <li className='mobile-item'>
                            <Link to='/analytics' className='nav-links-mobile' >
                                 <span>
                                <HiOutlinePresentationChartBar className='icon-mobile' size='25px'/> Analytics
                                      </span>
                            </Link>
                        </li>
                        <li className='mobile-item'>
                            <Link to='/report' className='nav-links-mobile'>
                                 <span>
                                <HiOutlineDocumentReport className='icon-mobile' size='25px'/> Make a Report
                                      </span>
                            </Link>
                        </li>
                        {buttonUser2}
                    </ul>
                </div>

            </div>

        </navbar>

    );
};

export default Navbar;