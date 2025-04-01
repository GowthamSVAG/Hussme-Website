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
  const [preview, setPreview] = useState(
    "https://i.ibb.co/4wrxz3pC/image-upload-icon.png"
  );

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
              <div className="col-img">
                <label htmlFor="cmpy-logo" className="logo-label">
                  Company Logo
                </label>

                <input
                  className="logo-input"
                  type="file"
                  onChange={previewFile}
                />
              </div>
              <img
                src={preview}
                height="200"
                className="logo-preview"
                alt="Image preview..."
              />
            </div>

            <div className="new-cmpny-input-sec">
              <input type="text" id="cmpy-name" placeholder="Company Name" />
            </div>
            <div className="row-input-fields">
              <div className="new-cmpny-input-sec">
                <input type="text" id="industry" placeholder="Industry" />
              </div>
              <div className="new-cmpny-input-sec">
                <input
                  type="email"
                  id="cmpy-email"
                  placeholder="Company Email"
                />
              </div>
            </div>
            <div className="row-input-fields">
              <div className="new-cmpny-input-sec">
                <input type="tel" id="cmpy-phone" placeholder="Company Phone" />
              </div>
              <div className="new-cmpny-input-sec">
                <input
                  type="url"
                  id="cmpy-website"
                  placeholder=" Company Website"
                />
              </div>
            </div>
            <div className="new-cmpny-input-sec ">
              <textarea
                className="address"
                type="text"
                id="cmpy-address"
                placeholder="Company Address"
              />
            </div>
            <div className="row-input-fields">
              <div className="new-cmpny-input-sec">
                <input type="text" id="cmpy-city" placeholder="City" />
              </div>
              <div className="new-cmpny-input-sec">
                <input type="text" id="cmpy-state" placeholder="State" />
              </div>
            </div>
            <div className="row-input-fields">
              <div className="new-cmpny-input-sec">
                <input type="text" id="cmpy-zip" placeholder="Zip Code" />
              </div>
              <div className="new-cmpny-input-sec">
                <input type="text" id="cmpy-country" placeholder="Country" />
              </div>
            </div>
            <div className="row-input-fields">
        
              <button type="submit" className="new-cmpy-button">
                Create Company Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
