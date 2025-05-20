import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../Components/Context/UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Management/CompanyProfile.css";

export function CompanyProfile() {
  const navigate = useNavigate();
  const [companyProfile, setCompanyProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [brandRelateImages, setBrandRelateImages] = useState({
    brandRelateImage1: null,
    brandRelateImage2: null,
    brandRelateImage3: null,
    brandRelateImage4: null,
    brandRelateImage5: null,
    brandRelateImage6: null,
  });
  const handleBrandImageChange = (event) => {
    const { id, files } = event.target;
    setBrandRelateImages((prev) => ({
      ...prev,
      [id]: files[0] || null,
    }));
  };
  const [formData, setFormData] = useState({
    companyName: "",
    dba: "",
    fedraltaxid: "",
    industry: "",
    email: "",
    phone: "",
    website: "",
    address1: "",
    address2: "",
    city: "",
    zip: "",
    state: "",
    country: "",
    linkedin: "",
    facebook: "",
    insta: "",
    x: "",
    youtube: "",
    fontfamily: "",
    color1: "#ffffff", // Using the color you specified
    color2: "#ffffff",
    color3: "#ffffff",
    logoUrl: "", // Add this to store the logo URL
  });

  const [formErrors, setFormErrors] = useState({});

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
          dba: response.data.dba || "",
          fedraltaxid: response.data.fedraltaxid || "",
          industry: response.data.industry || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          website: response.data.website || "",
          address1: response.data.address1 || "",
          address2: response.data.address2 || "",
          city: response.data.city || "",
          zip: response.data.zip || "",
          state: response.data.state || "",
          country: response.data.country || "",
          linkedin: response.data.linkedin || "",
          facebook: response.data.facebook || "",
          insta: response.data.insta || "",
          x: response.data.x || "",
          youtube: response.data.youtube || "",
          fontfamily: response.data.fontfamily || "",
          color1: response.data.color1 || "#ffffff",
          color2: response.data.color2 || "#ffffff",
          color3: response.data.color3 || "#ffffff",
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
      "cmpy-dba": "dba",
      "cmpy-taxid": "fedraltaxid",
      "cmpy-industry": "industry",
      "cmpy-email": "email",
      "cmpy-phone": "phone",
      "cmpy-website": "website",
      "cmpy-address1": "address1",
      "cmpy-address2": "address2",
      "cmpy-city": "city",
      "cmpy-state": "state",
      "cmpy-zip": "zip",
      "cmpy-country": "country",
      "cmpy-linkedin": "linkedin",
      "cmpy-facebook": "facebook",
      "cmpy-insta": "insta",
      "cmpy-twitter": "x",
      "cmpy-youtube": "youtube",
      "cmpy-fontfamily": "fontfamily",
      "cmpy-color1": "color1",
      "cmpy-color2": "color2",
      "cmpy-color3": "color3",
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Validate form
  //   const errors = validateForm();
  //   setFormErrors(errors);

  //   // If there are errors, don't submit
  //   if (Object.keys(errors).length > 0) {
  //     toast.error("Please fill in all required fields");
  //     return;
  //   }

  //   setIsSubmitting(true);

  //   try {
  //     // Get the token from localStorage
  //     const token = localStorage.getItem("token");

  //     if (!token) {
  //       toast.error("You must be logged in to update company profile");
  //       navigate("/login");
  //       return;
  //     }

  //     // Create a FormData object for multipart/form-data submission
  //     const formDataToSubmit = new FormData();

  //     // Add all text fields
  //     Object.keys(formData).forEach((key) => {
  //       formDataToSubmit.append(key, formData[key]);
  //     });

  //     // Add the logo file if it exists
  //     if (logoFile) {
  //       formDataToSubmit.append("logo", logoFile);
  //     }

  //     // Make API request
  //     const response = await axios.post(
  //       process.env.REACT_APP_API_URL + "/company/update-company-profile",
  //       formDataToSubmit,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     // Handle success
  //     toast.success("Company profile updated successfully!");
  //     setEditMode(false);

  //     // Update local state with the latest data
  //     setCompanyProfile(response.data.companyProfile);
  //     setLogoFile(null); // Reset file input
  //   } catch (error) {
  //     // Handle error
  //     console.error("Error updating company profile:", error);
  //     toast.error(
  //       error.response?.data?.message || "Failed to update company profile"
  //     );
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
const handleSubmit = async (e) => {
  e.preventDefault();

  // Validate form
  const errors = validateForm();
  setFormErrors(errors);

  if (Object.keys(errors).length > 0) {
    toast.error("Please fill in all required fields");
    return;
  }

  setIsSubmitting(true);

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to update company profile");
      navigate("/login");
      return;
    }

    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });

    if (logoFile) {
      formDataToSubmit.append("logo", logoFile);
    }

    // Add brand images to the form data (optional)
    Object.entries(brandRelateImages).forEach(([key, file]) => {
      if (file) {
        formDataToSubmit.append(key, file);
      }
    });

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

    toast.success("Company profile updated successfully!");
    setEditMode(false);
    setCompanyProfile(response.data.companyProfile);
    setLogoFile(null);
    setBrandRelateImages({
      brandRelateImage1: null,
      brandRelateImage2: null,
      brandRelateImage3: null,
      brandRelateImage4: null,
      brandRelateImage5: null,
      brandRelateImage6: null,
    });
  } catch (error) {
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

  // If still loading, show a loading message
  if (loading) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="company-profile-page">
      <ToastContainer position="top-right" autoClose={1000} />

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
          // View Mode !!!
          <div className="company-details-edit">
            <div className="cmpy-logo-carrier">
              <img
                src={companyProfile.logo}
                alt={companyProfile.companyName}
                className="profile-logo"
              />
            </div>
            <div className="edit-form-input-container">
              <div className="form-group">
                <label htmlFor="cmpy-name">Company Name</label>
                <input
                  type="text"
                  id="cmpy-name"
                  value={formData.companyName}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="cmpy-dba">DBA</label>
                <input
                  type="text"
                  id="cmpy-dba"
                  value={formData.dba}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="cmpy-taxid">Federal Tax ID</label>
                <input
                  type="text"
                  id="cmpy-taxid"
                  value={formData.fedraltaxid}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="cmpy-industry">Industry</label>
                <input
                  type="text"
                  id="cmpy-industry"
                  value={formData.industry}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="cmpy-email">Email</label>
                <input
                  type="email"
                  id="cmpy-email"
                  value={formData.email}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="cmpy-phone">Phone</label>
                <input
                  type="tel"
                  id="cmpy-phone"
                  value={formData.phone}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="cmpy-website">Website</label>
                <input
                  type="url"
                  id="cmpy-website"
                  value={formData.website}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="cmpy-address1">Address Line 1</label>
                <input
                  type="text"
                  id="cmpy-address1"
                  value={formData.address1}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="cmpy-address2">Address Line 2</label>
                <input
                  type="text"
                  id="cmpy-address2"
                  value={formData.address2}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="cmpy-city">City</label>
                <input
                  type="text"
                  id="cmpy-city"
                  value={formData.city}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="cmpy-state">State</label>
                <input
                  type="text"
                  id="cmpy-state"
                  value={formData.state}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="cmpy-zip">ZIP Code</label>
                <input
                  type="text"
                  id="cmpy-zip"
                  value={formData.zip}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="cmpy-country">Country</label>
                <input
                  type="text"
                  id="cmpy-country"
                  value={formData.country}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="cmpy-linkedin">LinkedIn</label>
                <input
                  type="url"
                  id="cmpy-linkedin"
                  value={formData.linkedin}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="cmpy-facebook">Facebook</label>
                <input
                  type="url"
                  id="cmpy-facebook"
                  value={formData.facebook}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="cmpy-insta">Instagram</label>
                <input
                  type="url"
                  id="cmpy-insta"
                  value={formData.insta}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="cmpy-twitter">X (Twitter)</label>
                <input
                  type="url"
                  id="cmpy-twitter"
                  value={formData.x}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="cmpy-youtube">YouTube</label>
                <input
                  type="url"
                  id="cmpy-youtube"
                  value={formData.youtube}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="cmpy-fontfamily">Font Family</label>
                <input
                  type="text"
                  id="cmpy-fontfamily"
                  value={formData.fontfamily}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="cmpy-color1">Primary Color</label>
                <input
                  type="color"
                  id="cmpy-color1"
                  className="edit-color-input"
                  value={formData.color1}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="cmpy-color2">Secondary Color</label>
                <input
                  type="color"
                  id="cmpy-color2"
                  className="edit-color-input"
                  value={formData.color2}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="cmpy-color3">Tertiary Color</label>
                <input
                  type="color"
                  id="cmpy-color3"
                  className="edit-color-input"
                  value={formData.color3}
                  disabled
                />
              </div>
            </div>
            <div className="brand-relate-image-container">
              {companyProfile.brandRelateImage1 !== "null" && (
                <div className="info-group-img">
                  <label htmlFor="">Brand Relate Image 1</label>
                  <img
                    src={companyProfile.brandRelateImage1}
                    alt={companyProfile.companyName}
                    className="profile-logo"
                  />
                </div>
              )}
              {companyProfile.brandRelateImage2 !== "null" && (
                <div className="info-group-img">
                  <label htmlFor="">Brand Relate Image2</label>
                  <img
                    src={companyProfile.brandRelateImage2}
                    alt={companyProfile.companyName}
                    className="profile-logo"
                  />
                </div>
              )}
              {companyProfile.brandRelateImage3 !== "null" && (
                <div className="info-group-img">
                  <label htmlFor="">Brand Relate Image3</label>
                  <img
                    src={companyProfile.brandRelateImage3}
                    alt={companyProfile.companyName}
                    className="profile-logo"
                  />
                </div>
              )}
              {companyProfile.brandRelateImage4 !== "null" && (
                <div className="info-group-img">
                  <label htmlFor="">Brand Relate Image4</label>
                  <img
                    src={companyProfile.brandRelateImage4}
                    alt={companyProfile.companyName}
                    className="profile-logo"
                  />
                </div>
              )}
              {companyProfile.brandRelateImage5 !== "null" && (
                <div className="info-group-img">
                  <label htmlFor="">Brand Relate Image5</label>
                  <img
                    src={companyProfile.brandRelateImage5}
                    alt={companyProfile.companyName}
                    className="profile-logo"
                  />
                </div>
              )}
              {companyProfile.brandRelateImage6 !== "null" && (
                <div className="info-group-img">
                  <label htmlFor="">Brand Relate Image6</label>
                  <img
                    src={companyProfile.brandRelateImage6}
                    alt="NA"
                    className="profile-logo"
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          // Edit Mode
          <div className="company-details-edit">
            <form className="edit-company-form" onSubmit={handleSubmit}>
              <div className="company-logo-section edit-logo">
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

              <div className="edit-form-input-container">
                <div className="form-group">
                  <label htmlFor="cmpy-name">Company Name</label>
                  <input
                    type="text"
                    id="cmpy-name"
                    value={formData.companyName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cmpy-dba">DBA</label>
                  <input
                    type="text"
                    id="cmpy-dba"
                    value={formData.dba}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cmpy-taxid">Federal Tax ID</label>
                  <input
                    type="text"
                    id="cmpy-taxid"
                    value={formData.fedraltaxid}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cmpy-industry">Industry</label>
                  <input
                    type="text"
                    id="cmpy-industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cmpy-email">Email</label>
                  <input
                    type="email"
                    id="cmpy-email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cmpy-phone">Phone</label>
                  <input
                    type="tel"
                    id="cmpy-phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
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
                  <label htmlFor="cmpy-address1">Address Line 1</label>
                  <input
                    type="text"
                    id="cmpy-address1"
                    value={formData.address1}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cmpy-address2">Address Line 2</label>
                  <input
                    type="text"
                    id="cmpy-address2"
                    value={formData.address2}
                    onChange={handleInputChange}
                  />
                </div>

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

                <div className="form-group">
                  <label htmlFor="cmpy-linkedin">LinkedIn</label>
                  <input
                    type="url"
                    id="cmpy-linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cmpy-facebook">Facebook</label>
                  <input
                    type="url"
                    id="cmpy-facebook"
                    value={formData.facebook}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cmpy-insta">Instagram</label>
                  <input
                    type="url"
                    id="cmpy-insta"
                    value={formData.insta}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cmpy-twitter">X (Twitter)</label>
                  <input
                    type="url"
                    id="cmpy-twitter"
                    value={formData.x}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cmpy-youtube">YouTube</label>
                  <input
                    type="url"
                    id="cmpy-youtube"
                    value={formData.youtube}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cmpy-fontfamily">Font Family</label>
                  <input
                    type="text"
                    id="cmpy-fontfamily"
                    value={formData.fontfamily}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cmpy-color1">Primary Color</label>
                  <input
                    type="color"
                    id="cmpy-color1"
                    className="edit-color-input"
                    value={formData.color1}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cmpy-color2">Secondary Color</label>
                  <input
                    type="color"
                    id="cmpy-color2"
                    className="edit-color-input"
                    value={formData.color2}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cmpy-color3">Tertiary Color</label>
                  <input
                    type="color"
                    id="cmpy-color3"
                    className="edit-color-input"
                    value={formData.color3}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="cmpy-brand-title-in-edit ">
                Company Brand Details{" "}
                <span>
                  (Brand Logos, Website/Promo Banner, Product or Service Image,
                  etc)
                </span>
              </div>
              <div className="new-cmpny-input-brand-sec">
                <div className="brand-col-img">
                  <label htmlFor="brandRelateImage1">
                    Brand Relate Image 1
                  </label>
                  <input
                    className="logo-input"
                    type="file"
                    onChange={handleBrandImageChange}
                    accept="image/*"
                    id="brandRelateImage1"
                  />
                </div>
                <div className="brand-col-img">
                  <label htmlFor="brandRelateImage2">
                    Brand Relate Image 2
                  </label>
                  <input
                    className="logo-input"
                    type="file"
                    onChange={handleBrandImageChange}
                    accept="image/*"
                    id="brandRelateImage2"
                  />
                </div>
                <div className="brand-col-img">
                  <label htmlFor="brandRelateImage3">
                    Brand Relate Image 3
                  </label>
                  <input
                    className="logo-input"
                    type="file"
                    onChange={handleBrandImageChange}
                    accept="image/*"
                    id="brandRelateImage3"
                  />
                </div>
                <div className="brand-col-img">
                  <label htmlFor="brandRelateImage4">
                    Brand Relate Image 4
                  </label>
                  <input
                    className="logo-input"
                    type="file"
                    onChange={handleBrandImageChange}
                    accept="image/*"
                    id="brandRelateImage4"
                  />
                </div>
                <div className="brand-col-img">
                  <label htmlFor="brandRelateImage5">
                    Brand Relate Image 5
                  </label>
                  <input
                    className="logo-input"
                    type="file"
                    onChange={handleBrandImageChange}
                    accept="image/*"
                    id="brandRelateImage5"
                  />
                </div>

                <div className="brand-col-img">
                  <label htmlFor="brandRelateImage6">
                    Brand Relate Image 6
                  </label>
                  <input
                    className="logo-input"
                    type="file"
                    onChange={handleBrandImageChange}
                    accept="image/*"
                    id="brandRelateImage6"
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
