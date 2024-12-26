import React, { useEffect, useState } from 'react'
import { Button, } from 'react-bootstrap';
import logo from "../../assets/images/dummy-logo.svg";
import sidebarLogoLg from "../../assets/images/sidebar-logo-lg.svg";
import sidebarLogosm from "../../assets/images/auth-logo.svg";
import { NavLink } from 'react-router-dom';
import { loading } from '../../redux/Loader/loader.action';
import { logoutFromSystem } from '../../redux/Service/login';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
/**
 * Sidebar component
 */
const Sidebar = (props) => {


  const [SidebarSize, setSidebarSize] = useState('lg');
  const windowSize = document.documentElement.clientWidth;

  const toogleMenu = () => {
    if (windowSize > 1024) {
      setSidebarSize(SidebarSize === 'sm' ? 'lg' : 'sm');
      document.documentElement.setAttribute('data-sidebar-size', SidebarSize === 'lg' ? 'sm' : 'lg');
    }
  };

  return (

    // {/* <!-- ========== App Menu ========== --> */ }
    < div className="app-menu navbar-menu" >
      {/* <!-- LOGO --> */}
      < div className="navbar-brand-box" >
        <a href="index.html" className="logo logo-dark">
          <span className="logo-sm">
            <img src={sidebarLogosm} alt="logoSm" height="48" />
          </span>
          <span className="logo-lg">
            <img src={sidebarLogoLg} alt="sidebarLogoLg" height="48" />
          </span>
        </a>
        <Button className=" vertical-menu-btn topnav-hamburger " id="topnav-hamburger-icon" onClick={toogleMenu}>
          <i className='th-outline-arrow-left'></i>
          {/* <span className="hamburger-icon">
                <span></span>
                <span></span>
                <span></span>
              </span> */}
        </Button>
      </div >

      <div id="scrollbar">
        <div className="container-fluid">

          <div id="two-column-menu">
          </div>
          <div className="navbar-sidemenu">
            <ul className="navbar-nav" id="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link menu-link " to="/dashboard">
                  <i className="th-outline-home-1"></i> <span data-key="t-widgets">Dashboard</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link menu-link" to="/charity-management">
                  <i className="th-outline-gift"></i> <span data-key="t-widgets">Charity Management </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link menu-link" to="/donor-management">
                  <i className="th-outline-profile-2user"></i> <span data-key="t-widgets">Donor Management</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link menu-link" to="/subscribers">
                  <i className="th-outline-user-octagon"></i> <span data-key="t-widgets">Manage Subscriber</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link menu-link" to="/manage-blogs">
                  <i className="th-outline-document-text"></i> <span data-key="t-widgets">Manage Blogs</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link menu-link" to="/user-management">
                  <i className="th-outline-user"></i> <span data-key="t-widgets">User Management</span>
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="navbar-bottom navbar-sidemenu">
            <ul className="navbar-nav" id="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link menu-link" to="/settings">
                  <i className="th-outline-setting-2"></i> <span data-key="t-widgets">Settings</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link menu-link" to="" onClick={() => { props.logoutFromSystem() }}>
                  <i className="th-outline-logout"></i> <span data-key="t-widgets">Logout</span>
                </NavLink>
              </li>
            </ul>
            <div className="sidebar-footer">
              <p>© 2024 PureCharity</p>
            </div>
          </div>
        </div>
        {/* <!-- Sidebar --> */}
      </div>

      <div className="sidebar-background"></div>
    </div >
    // {/* <!-- Left Sidebar End --> */ }

  )
}

const mapStateToProps = (state: RootState) => ({
});

const mapDispatchToProps = {
  loading,
  logoutFromSystem

};
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);