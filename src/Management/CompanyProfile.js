import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../Components/Context/UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Management/CompanyProfile.css";

export function CompanyProfile() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const [companyProfile, setCompanyProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [formErrors, setFormErrors] = useState({});

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

  // Fetch company profile data
  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          process.env.REACT_APP_API_URL + "/company/get-company-profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCompanyProfile(response.data);
        setFormData({
          companyName: response.data.companyName || "",
          industry: response.data.industry || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          website: response.data.website || "",
          address: response.data.address || "",
          city: response.data.city || "",
          state: response.data.state || "",
          zip: response.data.zip || "",
          country: response.data.country || "",
        });
        setPreview(
          response.data.logo ||
            "https://i.ibb.co/4wrxz3pC/image-upload-icon.png"
        );
      } catch (error) {
        console.error("Error fetching company profile:", error);

        // If profile not found, redirect to create profile
        if (error.response && error.response.status === 404) {
          navigate("/new-company");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyProfile();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Map form field IDs to formData property names
    const fieldMapping = {
      "cmpy-name": "companyName",
      industry: "industry",
      "cmpy-email": "email",
      "cmpy-phone": "phone",
      "cmpy-website": "website",
      "cmpy-address": "address",
      "cmpy-city": "city",
      "cmpy-state": "state",
      "cmpy-zip": "zip",
      "cmpy-country": "country",
    };

    setFormData({
      ...formData,
      [fieldMapping[id] || id]: value,
    });
  };

  const previewFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLogoFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.companyName.trim())
      errors.companyName = "Company name is required";
    if (!formData.industry.trim()) errors.industry = "Industry is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm();
    setFormErrors(errors);

    // If there are errors, don't submit
    if (Object.keys(errors).length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You must be logged in to update company profile");
        navigate("/login");
        return;
      }

      // Create a FormData object for multipart/form-data submission
      const formDataToSubmit = new FormData();

      // Add all text fields
      Object.keys(formData).forEach((key) => {
        formDataToSubmit.append(key, formData[key]);
      });

      // Add the logo file if it exists
      if (logoFile) {
        formDataToSubmit.append("logo", logoFile);
      }

      // Make API request
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/company/update-company-profile",
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle success
      toast.success("Company profile updated successfully!");
      setEditMode(false);

      // Update local state with the latest data
      setCompanyProfile(response.data.companyProfile);
      setLogoFile(null); // Reset file input
    } catch (error) {
      // Handle error
      console.error("Error updating company profile:", error);
      toast.error(
        error.response?.data?.message || "Failed to update company profile"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    // Reset any form errors when toggling edit mode
    setFormErrors({});
  };

  // Helper function to get proper image URL
  const getImageUrl = (logoPath) => {
    if (!logoPath) return "https://i.ibb.co/4wrxz3pC/image-upload-icon.png";

    // If it's a full URL already (like a base64 string), return as is
    if (logoPath.startsWith("data:image")) return logoPath;

    // Otherwise, prepend the server URLreturn `${process.env.REACT_APP_API_URL}${logoPath}`;return process.env.REACT_APP_API_URL + `${logoPath}`;
    // Remove /api from the URL when constructing image path since logo paths already include the correct structure
    const baseUrl = process.env.REACT_APP_API_URL.replace("/api", "");
    return baseUrl + logoPath;
  };

  // If still loading, show a loading message
  if (loading) {
    return (
      <div className="loader-container">
        <span class="loader"></span>
      </div>
    );
  }

  return (
    <div className="company-profile-page">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="profile-management-content">
        <div className="info-row"></div>
        <div className="profile-header">
          <h1>Company Profile</h1>
          <button
            className={`edit-toggle-button ${
              editMode ? "save-mode" : "edit-mode"
            }`}
            onClick={toggleEditMode}
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {!editMode ? (
          // View Mode
          <div className="company-details-view">
            <div className="company-logo-section">
              <img
                src={getImageUrl(companyProfile.logo)}
                alt={companyProfile.companyName}
                className="profile-logo"
              />
            </div>
            <div className="company-info-section">
              <div className="info-row">
                <div className="info-group">
                  <h3>Company Name</h3>
                  <p>{companyProfile.companyName}</p>
                </div>
                <div className="info-group">
                  <h3>Industry</h3>
                  <p>{companyProfile.industry}</p>
                </div>
              </div>
              <div className="info-row">
                <div className="info-group">
                  <h3>Email</h3>
                  <p>{companyProfile.email}</p>
                </div>
                <div className="info-group">
                  <h3>Phone</h3>
                  <p>{companyProfile.phone}</p>
                </div>
              </div>
              <div className="info-row">
                <div className="info-group">
                  <h3>Website</h3>
                  <p>{companyProfile.website || "N/A"}</p>
                </div>
                <div className="info-group">
                  <h3>Address</h3>
                  <p>{companyProfile.address || "N/A"}</p>
                </div>
              </div>
              <div className="info-row">
                <div className="info-group">
                  <h3>City</h3>
                  <p>{companyProfile.city || "N/A"}</p>
                </div>
                <div className="info-group">
                  <h3>State</h3>
                  <p>{companyProfile.state || "N/A"}</p>
                </div>
              </div>
              <div className="info-row">
                <div className="info-group">
                  <h3>ZIP Code</h3>
                  <p>{companyProfile.zip || "N/A"}</p>
                </div>
                <div className="info-group">
                  <h3>Country</h3>
                  <p>{companyProfile.country || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Edit Mode
          <div className="company-details-edit">
            <form className="edit-company-form" onSubmit={handleSubmit}>
              <div className="company-logo-section">
                <div className="logo-upload">
                  <label htmlFor="company-logo" className="logo-label">
                    Company Logo
                  </label>
                  <input
                    id="company-logo"
                    className="logo-input"
                    type="file"
                    onChange={previewFile}
                  />
                </div>
                <img
                  src={preview}
                  alt="Company logo preview"
                  className="profile-logo-preview"
                />
              </div>

              <div className="form-group">
                <label htmlFor="cmpy-name">Company Name*</label>
                <input
                  type="text"
                  id="cmpy-name"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={formErrors.companyName ? "error" : ""}
                />
                {formErrors.companyName && (
                  <span className="error-message">
                    {formErrors.companyName}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="industry">Industry*</label>
                <input
                  type="text"
                  id="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className={formErrors.industry ? "error" : ""}
                />
                {formErrors.industry && (
                  <span className="error-message">{formErrors.industry}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cmpy-email">Email*</label>
                  <input
                    type="email"
                    id="cmpy-email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={formErrors.email ? "error" : ""}
                  />
                  {formErrors.email && (
                    <span className="error-message">{formErrors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="cmpy-phone">Phone*</label>
                  <input
                    type="tel"
                    id="cmpy-phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={formErrors.phone ? "error" : ""}
                  />
                  {formErrors.phone && (
                    <span className="error-message">{formErrors.phone}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="cmpy-website">Website</label>
                <input
                  type="url"
                  id="cmpy-website"
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="cmpy-address">Address</label>
                <textarea
                  id="cmpy-address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cmpy-city">City</label>
                  <input
                    type="text"
                    id="cmpy-city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cmpy-state">State</label>
                  <input
                    type="text"
                    id="cmpy-state"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cmpy-zip">ZIP Code</label>
                  <input
                    type="text"
                    id="cmpy-zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cmpy-country">Country</label>
                  <input
                    type="text"
                    id="cmpy-country"
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="save-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
