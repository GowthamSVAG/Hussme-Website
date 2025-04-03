import { Link, useNavigate } from "react-router-dom";
import logo from "../Components/Assets/Home-Header-Footer/hussme Logo-2 1-white.jpg";
import "../Components/Header.css";
import cross from "../Components/Assets/Home-Header-Footer/cross.png";
import { useUser } from "../Components/Context/UserContext"; // Import UserContext
import { useState } from "react"; // Import useState

export function Header() {
  const { user, logout } = useUser(); // Get user and logout from context
  const [showLogout, setShowLogout] = useState(false); // State to toggle logout button visibility
  const navigate = useNavigate();

  function showSidebar(event) {
    event.preventDefault();
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "flex";
  }

  function hideSidebar(event) {
    event.preventDefault();
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "none";
  }

  // Function to toggle the logout dropdown
  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  // Function to handle logout click
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    setShowLogout(false); // Hide the logout button after logging out
  };

  // Function to navigate to change password page
  const handleChangePassword = (e) => {
    e.preventDefault();
    setShowLogout(false); // Hide the dropdown
    navigate("/reset-password");
  };

  // Function to close dropdown when clicking outside
  const closeDropdown = () => {
    setShowLogout(false);
  };

  return (
    <div className="nav-bar" onClick={closeDropdown}>
      <header>
        <nav>
          <ul className="sidebar">
            <li onClick={hideSidebar}>
              <img className="cross-icn" src={cross} alt="" />
            </li>
            <li onClick={hideSidebar}>
              <Link to="/">Home</Link>
            </li>
            <li onClick={hideSidebar}>
              <Link to="/business">Business</Link>
            </li>
            <li onClick={hideSidebar}>
              <Link to="/talent">Talent</Link>
            </li>
            <li onClick={hideSidebar}>
              <Link to="/blog">Blog</Link>
            </li>
            <li onClick={hideSidebar}>
              <Link to="/contact">Contact US</Link>
            </li>
            <li onClick={hideSidebar}>
              <div className="username-logout-buttons">
                {user ? (
                  <div className="mobile-user-menu">
                    <span 
                      className="mobile-username"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLogout();
                      }}
                    >
                      {user.username}
                    </span>
                    {showLogout && (
                      <div className="mobile-user-dropdown">
                        <Link 
                          className="change-password-button" 
                          onClick={handleChangePassword}
                        >
                          Change Password
                        </Link>
                        <Link 
                          className="logout-button" 
                          onClick={handleLogout}
                        >
                          Logout
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link className='login-button' to="/login">Login</Link>
                  </>
                )}
              </div>
            </li>
          </ul>

          <ul className="desk-navbar">
            <li>
              <div className="logo">
                <Link to="/">
                  <img src={logo} alt="" />
                </Link>
              </div>
            </li>
            <li className="hideWhileMobileOn">
              <Link to="/">Home</Link>
            </li>
            <li className="hideWhileMobileOn">
              <Link to="/business">Business</Link>
            </li>
            <li className="hideWhileMobileOn">
              <Link to="/talent">Talent</Link>
            </li>
            <li className="hideWhileMobileOn">
              <Link to="/management">Management</Link>
            </li>
            <li className="hideWhileMobileOn">
              <Link to="/new-company">New Company</Link>
            </li>
            <li className="hideWhileMobileOn">
              <Link to="/blog">Blog</Link>
            </li>
            <li className="hideWhileMobileOn">
              <Link to="/contact">Contact US</Link>
            </li>
            <li className="hideWhileMobileOn">
              {user ? (
                <div className="user-dropdown-container" onClick={(e) => e.stopPropagation()}>
                  <span 
                    className="desk-username" 
                    onClick={toggleLogout}
                  >
                    {user.username}
                  </span>
                  {showLogout && (
                    <div className="logout-dropdown">
                      <Link 
                        className="change-password-button" 
                        onClick={handleChangePassword}
                      >
                        Change Password
                      </Link>
                      <Link 
                        className="logout-button" 
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link className="header-login-button" to="/login">
                    Login
                  </Link>
                </>
              )}
            </li>
            <li className="menu-button" onClick={showSidebar}>
              <Link to="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="40px"
                  viewBox="0 -960 960 960"
                  width="40px"
                  fill="9747FF"
                >
                  <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                </svg>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
