import React, {useEffect, useState} from 'react';
import './/Css/Navbar.css';
import {Link, useNavigate} from "react-router-dom";
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
import {BsPerson} from 'react-icons/bs';




//Navbar Component for the whole website. CSS file Needed.
const Navbar = () => {
    const [nav, setNav] = useState(true);
    const navigate = useNavigate();

    const handleNav = () => {
        setNav((prevState) => {return !prevState})
    }

    const [user, setUser] = useState("0")

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        //console.log(localStorage.localStorage.getItem("user"))
        if(!loggedInUser){
            setUser("0")
        }
        else {
            setUser(loggedInUser)
        }

    }, [user])

    const handleLogout = () => {
        setUser("0");
        localStorage.clear();
        window.location.reload(false)
        navigate('/')
    };

    let buttonUser1;
    if (!user.startsWith("0")){
        buttonUser1 = (<li className='nav-item'>
            <Link to='/' className=' nav-links-btn btn btn--medium' onClick={() => handleLogout()}>Logout
            </Link></li>)
    } else{
        buttonUser1 = <li className='nav-item' >
            <Link to='/login' className='nav-links-btn btn--medium btn--outline'>Log In

            </Link></li>
    }
    let buttonUser2;
    if (!user.startsWith("0")){
        buttonUser2 = (<li className='mobile-item'>
            <Link to='/' className='nav-links-mobile' onClick={() => {handleLogout(); handleNav()}}>
                                <span>
                                <HiOutlineLogout className='icon-mobile'/> Logout
                                </span>
            </Link>
        </li>)
    } else {
        buttonUser2 = (<li className='mobile-item'>
            <Link to='/login' className='nav-links-mobile' onClick={handleNav}>
                                <span>
                                <HiOutlineLogin className='icon-mobile'/> Login
                                </span>
            </Link>
        </li>)
    }

    // console.log(user)

    return(
        <navbar className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={nav? function(){} : handleNav}>OUTAGES PR</Link>
                <ul className='nav-menu max'>
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
                    {(user !== "0" &&
                        <li className='nav-item'>
                            <Link to='/profile' className='nav-links'>
                                Profile
                            </Link>
                        </li>
                    )}
                    {buttonUser1}
                </ul>





                {/*Mobile Navbar*/}
                <div className=' menu-icon' onClick={handleNav}>
                    {!nav ? <HiXMark/> : <HiMenuAlt2/>}
                </div>

                <div className={!nav ? ' nav-menu active' : 'nav-item nav-menu hidden'}>
                    <ul className={!nav ? 'nav-item active' : 'nav-item hidden'}>
                        <li className='mobile-item'>
                            <Link to='/' className='nav-links-mobile' onClick={handleNav}>
                                <span><HiOutlineHome className='icon-mobile'/> Home </span>
                            </Link>
                        </li>
                        <li className='mobile-item'>
                            <Link to='/recent-reports' className='nav-links-mobile' onClick={handleNav}>
                                <span>
                                    <TbReportAnalytics className='icon-mobile'/> Recent Reports
                                </span>
                            </Link>
                        </li>
                        <li className='mobile-item'>
                            <Link to='/historical-data' className='nav-links-mobile' onClick={handleNav}>
                                 <span>
                                     <HiOutlineFolderOpen className='icon-mobile'/> Historical Data
                                      </span>
                            </Link>
                        </li>
                        <li className='mobile-item'>
                            <Link to='/analytics' className='nav-links-mobile' onClick={handleNav}>
                                 <span>
                                <HiOutlinePresentationChartBar className='icon-mobile'/> Analytics
                                      </span>
                            </Link>
                        </li>
                        <li className='mobile-item'>
                            <Link to='/report' className='nav-links-mobile' onClick={handleNav}>
                                 <span>
                                <HiOutlineDocumentReport className='icon-mobile'/> Make a Report
                                      </span>
                            </Link>
                        </li>
                        {(user !== "0" &&
                            <li className='mobile-item'>
                                <Link to='/profile' className='nav-links-mobile' onClick={handleNav}>
                                    <span>
                                    <BsPerson className='icon-mobile'/> Profile
                                        </span>
                                </Link>
                            </li>
                        )}
                        {buttonUser2}
                    </ul>
                </div>

            </div>

        </navbar>

    );
};

export default Navbar;