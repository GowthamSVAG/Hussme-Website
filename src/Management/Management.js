import "../Management/Management.css";
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../Components/Context/UserContext";
import { ContentManagement } from "./ContentManagement";
import { TrainingProcess } from "./TrainingProcess";
import { Hiring } from "./Hiring";
import { CompanyProfile } from "./CompanyProfile";
import { Settings } from "./Settings";

export function Management() {
  const { user, logout } = useUser();
  const [showLogout, setShowLogout] = useState(false);
  const [activeComponent, setActiveComponent] = useState(<ContentManagement />);
  const [activeIndex, setActiveIndex] = useState(0); // Track the active sidebar index

  const navigate = useNavigate();

  // Function to toggle the logout dropdown
  const toggleLogout = () => setShowLogout(!showLogout);

  // Function to handle logout
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    setShowLogout(false);
  };

  // Function to navigate to change password page
  const handleChangePassword = (e) => {
    e.preventDefault();
    setShowLogout(false);
    navigate("/reset-password");
  };

  // Function to close dropdown when clicking outside
  const closeDropdown = () => setShowLogout(false);

  // Function to load components dynamically
  const loadComponent = (component, index) => {
    setActiveComponent(component);
    setActiveIndex(index);
  };

  return (
    <>
      <div className="mgmt-page" onClick={closeDropdown}>
        {/* Start of navbar */}
        <div className="mgmt-navbar">
          <div className="mgmt-login">
            {user ? (
              <div
                className="user-dropdown-container"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="desk-username" onClick={toggleLogout}>
                  {user.username}
                </span>
                {showLogout && (
                  <div className="mgmt-left logout-dropdown">
                    <Link
                      className="mgmt-change-password-button"
                      onClick={handleChangePassword}
                    >
                      Change Password
                    </Link>
                    <Link className="mgmt-logout-button" onClick={handleLogout}>
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link className="mgmt-login-button" to="/login">
                Login
              </Link>
            )}
          </div>
          <div className="company-name">Hussme Pvt Ltd</div>
          <div className="cmpy-logo">
            <Link to="/">
              <img
                className="mgmt-logo"
                src="https://i.ibb.co/PvSFSPcB/hussme-Logo-2-1-white.jpg"
                alt="Hussme"
              />
            </Link>
          </div>
        </div>
        {/* End of navbar */}

        {/* Start of Sidebar */}
        <div className="management-section">
          <div className="mgmt-sidebar">
            <ul>
              <li
                onClick={() => loadComponent(<ContentManagement />, 0)}
                className={activeIndex === 0 ? "active-sidebar-item" : ""}
              >
                <NavLink>
                  <img
                    src="https://i.ibb.co/Mx9t19CT/document-gear.png"
                    className="mgmt-sidebar-icn"
                  />
                  <div className="mgmt-sidebar-title">Content Management</div>
                </NavLink>
              </li>
              <li
                onClick={() => loadComponent(<TrainingProcess />, 1)}
                className={activeIndex === 1 ? "active-sidebar-item" : ""}
              >
                <NavLink>
                  <img
                    src="https://i.ibb.co/WvzP2QgX/chart-user.png"
                    className="mgmt-sidebar-icn"
                  />
                  <span className="mgmt-sidebar-title">Process & Training</span>
                </NavLink>
              </li>
              <li
                onClick={() => loadComponent(<Hiring />, 2)}
                className={activeIndex === 2 ? "active-sidebar-item" : ""}
              >
                <NavLink>
                  <img
                    src="https://i.ibb.co/s9sNfp8X/assign.png"
                    className="mgmt-sidebar-icn"
                  />
                  <span className="mgmt-sidebar-title">Hiring</span>
                </NavLink>
              </li>
              <li
                onClick={() => loadComponent(<CompanyProfile />, 3)}
                className={activeIndex === 3 ? "active-sidebar-item" : ""}
              >
                <NavLink>
                  <img
                    src="https://i.ibb.co/svcBG24t/user-gear.png"
                    className="mgmt-sidebar-icn"
                  />
                  <span className="mgmt-sidebar-title">Company Profile</span>
                </NavLink>
              </li>
              <li
                onClick={() => loadComponent(<Settings />, 4)}
                className={activeIndex === 4 ? "active-sidebar-item" : ""}
              >
                <NavLink>
                  <img
                    src="https://i.ibb.co/dszqfsqj/gears.png"
                    className="mgmt-sidebar-icn"
                  />
                  <span className="mgmt-sidebar-title">Settings</span>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Render Dynamic Component */}
          <div className="mgmt-content">{activeComponent}</div>
        </div>
      </div>
    </>
  );
}
