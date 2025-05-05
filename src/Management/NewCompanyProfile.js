import { useNavigate } from "react-router-dom";
import "../Management/NewCompanyProfile.css";
import React, { useState } from "react";
import { useUser } from "../Components/Context/UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export function NewCompanyProfile() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  const [preview, setPreview] = useState(
    "https://i.ibb.co/4wrxz3pC/image-upload-icon.png"
  );
  const [logoFile, setLogoFile] = useState(null);
  const [input, setInput] = useState("");
  const [showList, setShowList] = useState(false);

  const usaCities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
    "Austin",
    "Jacksonville",
    "Fort Worth",
    "Columbus",
    "Charlotte",
  ];

  const filteredCities = usaCities.filter((city) =>
    city.toLowerCase().startsWith(input.toLowerCase())
  );

  const handleSelect = (city) => {
    setInput(city);
    setShowList(false);
  };

  const previewFile = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLogoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    try {
      const ext = file.name.split(".").pop();
      const newFileName = `company-logo.${ext}`;

      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/get-upload-url`,
        {
          params: { fileName: newFileName },
        }
      );

      const uploadUrl = res.data.url;
      const imageUrlOnly = uploadUrl.split("?")[0];

      await axios.put(uploadUrl, file, {
        headers: {
          "x-ms-blob-type": "BlockBlob",
          "Content-Type": file.type,
        },
      });

      setPreview(imageUrlOnly); // Set preview to uploaded URL
      setFormData((prev) => ({ ...prev, logoUrl: imageUrlOnly })); // Add to formData
    } catch (err) {
      console.error("Image upload error:", err);
      toast.error("Logo upload failed.");
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
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
      [fieldMapping[id]]: value,
    });
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
        toast.error("You must be logged in to create a company profile");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/company/update-company-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Company profile created successfully!");
      setTimeout(() => navigate("/management"), 2000);
    } catch (err) {
      console.error("Profile submission error:", err);
      toast.error(
        err.response?.data?.message || "Failed to create company profile"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="new-cmpy">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="new-company-name">Create New Company Profile</div>
      <div className="new-cmpy-form-conatiner">
        <form className="new-cmpy-form" onSubmit={handleSubmit}>
          {/* <div className="new-cmpny-input-logo-sec">
            <div className="col-img">
              <label htmlFor="cmpy-logo" className="logo-label">
                Company Logo
              </label>
              <input
                className="logo-input"
                type="file"
                onChange={previewFile}
                accept="image/*"
              />
            </div>
            <img
              src={preview}
              height="200"
              className="logo-preview"
              alt="Image preview..."
            />
          </div> */}

          <div className="new-cmpny-input-sec for-1st-row">
            <input
              type="text"
              id="cmpy-name"
              placeholder="Company Name"
              onChange={handleInputChange}
              value={formData.companyName}
              className={formErrors.companyName ? "error" : ""}
            />
            {formErrors.companyName && (
              <span className="error-message">{formErrors.companyName}</span>
            )}
            <div className="new-cmpny-input-logo-sec">
              <div className="col-img">
                <label htmlFor="cmpy-logo" className="logo-label">
                  Company Logo
                </label>
                <input
                  className="logo-input"
                  type="file"
                  onChange={previewFile}
                  accept="image/*"
                />
              </div>
              <img
                src={preview}
                height="200"
                className="logo-preview"
                alt="Image preview..."
              />
            </div>
          </div>
          <div className="new-cmpny-input-sec">
            <input
              type="text"
              id="dba"
              placeholder="DBA"
              onChange={handleInputChange}
              value={formData.dba}
            />
            <input
              type="text"
              id="taxid"
              placeholder="Federal Tax ID/ EIN"
              onChange={handleInputChange}
              value={formData.industry}
            />
            <input
              type="text"
              id="industry"
              placeholder="Industry"
              onChange={handleInputChange}
              value={formData.industry}
              className={formErrors.industry ? "error" : ""}
            />
            {formErrors.industry && (
              <span className="error-message">{formErrors.industry}</span>
            )}

            <input
              type="email"
              id="cmpy-email"
              placeholder="Company Email"
              onChange={handleInputChange}
              value={formData.email}
              className={formErrors.email ? "error" : ""}
            />
            {formErrors.email && (
              <span className="error-message">{formErrors.email}</span>
            )}
            <input
              type="tel"
              id="cmpy-phone"
              placeholder="Company Phone"
              onChange={handleInputChange}
              value={formData.phone}
              className={formErrors.phone ? "error" : ""}
            />
            {formErrors.phone && (
              <span className="error-message">{formErrors.phone}</span>
            )}
            <input
              type="url"
              id="cmpy-website"
              placeholder="Company Website"
              onChange={handleInputChange}
              value={formData.website}
            />

            <input
              type="text"
              id="cmpy-address-1"
              placeholder="Company Address 1"
              onChange={handleInputChange}
              value={formData.address1}
            />
            <input
              type="text"
              id="cmpy-address-2"
              placeholder="Company Address 2"
              onChange={handleInputChange}
              value={formData.address2}
            />
            <div style={{ position: "relative", width: "90%" }}>
              <input
                type="text"
                id="cmpy-city"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setShowList(true);
                }}
                onFocus={() => setShowList(true)}
                onBlur={() => setTimeout(() => setShowList(false), 150)} // allow time for item click
                placeholder="City"
                className="cmpy-city"
                autoComplete="off"
                style={{ width: "100%" }}
              />

              {showList && filteredCities.length > 0 && (
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    minWidth: "110%",
                    maxHeight: "220px",
                    overflowY: "auto",
                    border: "0.5px solid #ccc",
                    backgroundColor: "white",
                    zIndex: 1000,
                  }}
                >
                  {filteredCities.map((city) => (
                    <li
                      key={city}
                      onMouseDown={() => handleSelect(city)}
                      style={{ padding: "8px", cursor: "pointer" }}
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <input
              type="text"
              id="cmpy-zip"
              placeholder="Zip Code"
              onChange={handleInputChange}
              value={formData.zip}
            />
            <input
              type="text"
              id="cmpy-country"
              placeholder="Country"
              onChange={handleInputChange}
              value={formData.country}
            />
          </div>

          <div className="new-cmpy-social-detail-sec">
            <div className="cmpy-social-title">Social Platforms Details</div>
            <div className="new-cmpny-input-sec">
              <input
                type="text"
                id="cmpy-country"
                placeholder="LinkedIN"
                onChange={handleInputChange}
                value={formData.country}
              />
              <input
                type="text"
                id="cmpy-country"
                placeholder="Facebook"
                onChange={handleInputChange}
                value={formData.country}
              />
              <input
                type="text"
                id="cmpy-country"
                placeholder="Instagram"
                onChange={handleInputChange}
                value={formData.country}
              />
              <input
                type="text"
                id="cmpy-country"
                placeholder="X"
                onChange={handleInputChange}
                value={formData.country}
              />
              <input
                type="text"
                id="cmpy-country"
                placeholder="Youtube"
                onChange={handleInputChange}
                value={formData.country}
              />
            </div>
          </div>
          <div className="cmpy-brand-template-sec">
            <div className="cmpy-brand-title">Comapny Brand Details</div>
            <div className="new-cmpny-input-sec">
              <input
                type="text"
                id="cmpy-country"
                placeholder="Font Family"
                onChange={handleInputChange}
                value={formData.country}
              />
              <input
                type="color"
                id="cmpy-country"
                placeholder="Color Pallete Color 1"
                onChange={handleInputChange}
                value={formData.country}
              />
              <input
                type="text"
                id="cmpy-country"
                placeholder="Color Pallete Color 2"
                onChange={handleInputChange}
                value={formData.country}
              />
            </div>
          </div>

          <div className="row-input-fields">
            <button
              type="submit"
              className="new-cmpy-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
