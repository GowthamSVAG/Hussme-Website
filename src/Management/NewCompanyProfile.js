import { Link, NavLink, useNavigate } from "react-router-dom";
import "../Management/NewCompanyProfile.css";
import React, { useState } from "react";
import { useUser } from "../Components/Context/UserContext";
export function NewCompanyProfile() {
  const { user, logout } = useUser();
  const [showLogout, setShowLogout] = useState(false);
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
  const [preview, setPreview] = useState("https://i.ibb.co/4wrxz3pC/image-upload-icon.png");

  const previewFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setPreview("");
    }
  };
  return (
    <>
      <div className="new-cmpy">
        <div className="new-cmpy-navbar">
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
              <Link className="new-cmpy-login-button" to="/login">
                Login
              </Link>
            )}
          </div>
          {/* <div className="new-company-name">Create New Company Profile</div> */}
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
        <div className="new-company-name">Create New Company Profile</div>
        <div className="new-cmpy-form-conatiner">
          

          <form className="new-cmpy-form" action="">
            <div className="new-cmpny-input-logo-sec">
              <label htmlFor="cmpy-logo" className="logo-label">
                Company Logo
              </label>

             
                <img
                  src={preview}
                  height="200"
                  className="logo-preview"
                  alt="Image preview..."
                />
             
              <input
                className="logo-input"
                type="file"
                onChange={previewFile}
              />
            </div>
            <div className="new-cmpny-input-sec">
              <label htmlFor="cmpy-name"> Company Name</label>
              <input type="text" id="cmpy-name" />
            </div>

            <div className="new-cmpny-input-sec">
              <label htmlFor="industry"> Industry</label>
              <input type="text" id="industry" />
            </div>
            <div className="new-cmpny-input-sec">
              <label htmlFor="cmpy-email"> Company Email</label>
              <input type="email" id="cmpy-email" />
            </div>
            <div className="new-cmpny-input-sec">
              <label htmlFor="cmpy-phone"> Company Phone</label>
              <input type="tel" id="cmpy-phone" />
            </div>
            <div className="new-cmpny-input-sec">
              <label htmlFor="cmpy-website"> Company Website</label>
              <input type="url" id="cmpy-website" />
            </div>
            <div className="new-cmpny-input-sec">
              <label htmlFor="cmpy-address"> Company Address</label>
              <input type="text" id="cmpy-address" />
            </div>
            <div className="new-cmpny-input-sec">
              <label htmlFor="cmpy-city"> City</label>
              <input type="text" id="cmpy-city" />
            </div>
            <div className="new-cmpny-input-sec">
              <label htmlFor="cmpy-state"> State</label>
              <input type="text" id="cmpy-state" />
            </div>
            <div className="new-cmpny-input-sec">
              <label htmlFor="cmpy-zip"> Zip Code</label>
              <input type="text" id="cmpy-zip" />
            </div>
            <div className="new-cmpny-input-sec">
              <label htmlFor="cmpy-country"> Country</label>
              <input type="text" id="cmpy-country" />
            </div>

            <button type="submit" className="new-cmpy-button">
              Create Company Profile
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
