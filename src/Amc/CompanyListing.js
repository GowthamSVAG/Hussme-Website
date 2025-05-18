import "../Amc/CompanyListing.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import viewicn from "../Components/Assets/Our Levers/eye.png";
export function CompanyListing() {
  const [
    showSectionTwoSelectedCompanyDetail,
    setShowSectionTwoSelectedCompanyDetail,
  ] = useState(false);
  const [companiesWithTasks, setCompaniesWithTasks] = useState([]);

  const [companyProfile, setCompanyProfile] = useState(null);
  const [companyListingWindow, setCompanyListingWindow] = useState(true);
  const fetchCompanyAllDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to access this page.");
        return;
      }

      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/admin/all-companies",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        console.log("Successfull fetch Company Listing Section-2");
        const companies = response.data;

        if (companies.length > 0) {
          setCompaniesWithTasks(companies);
        } else {
          toast.info("No company has tasks.");
        }
      } else {
        toast.error("Failed to fetch company profile");
      }
    } catch (error) {
      console.error("Error fetching company profile:", error);
      toast.error("An error occurred while fetching company details.");
    }
  };

  useEffect(() => {
    fetchCompanyAllDetails();
  }, []);
  return (
    <div className="admin-cmpy-detail">
      {companyListingWindow && (
        <div className="company-listing-container">
          {companiesWithTasks.map((companyData, index) => (
            <div
              key={companyData.company._id}
              className="admin-cmpy-detail-row"
            >
              <ul>
                <li>
                  {index + 1}.{" "}
                  <img
                    src={companyData.company.logo}
                    className="admin-cmpy-logo"
                    alt=""
                  />
                </li>
            
                <li>
                  <h2>Name:</h2>
                  <p>{companyData.company.companyName}</p>
                </li>
                <li>
                  <h2>Mobile No:</h2>
                  <p>{companyData.company.phone}</p>
                </li>
                <li>
                  <h2>Email:</h2> <p>{companyData.company.email}</p>
                </li>
                <li>
                  <h2>Tasks:</h2>
                  <p>{companyData.tasks.length}</p>
                </li>
                <li
                  onClick={() => {
                    setCompanyProfile(companyData.company);
                    setShowSectionTwoSelectedCompanyDetail(true);
                    setCompanyListingWindow(false);
                  }}
                >
                  View <img className="eye-icn" src={viewicn} alt="view" />
                </li>
              </ul>
            </div>
          ))}
        </div>
      )}
      {showSectionTwoSelectedCompanyDetail && (
        <div className="admin-company-details-view ">
          <div className="admin-alt-gap">
            <img
              src={companyProfile.logo}
              alt={companyProfile.companyName}
              className="profile-logo"
            />
            <div className="info-group">
              <h3>Company Name</h3>
              <p>{companyProfile.companyName || "N/A"}</p>
            </div>
            <div className="info-group">
              <h3>Doing Business As (DBA)</h3>
              <p>{companyProfile.dba || "N/A"}</p>
            </div>
            <div className="info-group">
              <h3>Federal Tax ID</h3>
              <p>{companyProfile.fedraltaxid || "N/A"}</p>
            </div>
            <div className="info-group">
              <h3>Industry</h3>
              <p>{companyProfile.industry || "N/A"}</p>
            </div>
            <div className="info-group">
              <h3>Email</h3>
              <p>{companyProfile.email || "N/A"}</p>
            </div>
            <div className="info-group">
              <h3>Phone</h3>
              <p>{companyProfile.phone || "N/A"}</p>
            </div>
            <div className="info-group">
              <h3>Website</h3>
              <p>{companyProfile.website || "N/A"}</p>
            </div>
            <div className="info-group">
              <h3>Address Line 1</h3>
              <p>{companyProfile.address1 || "N/A"}</p>
            </div>
            <div className="info-group">
              <h3>Address Line 2</h3>
              <p>{companyProfile.address2 || "N/A"}</p>
            </div>
            <div className="info-group">
              <h3>City</h3>
              <p>{companyProfile.city || "N/A"}</p>
            </div>
            <div className="info-group">
              <h3>State</h3>
              <p>{companyProfile.state || "N/A"}</p>
            </div>
            <div className="info-group">
              <h3>ZIP Code</h3>
              <p>{companyProfile.zip || "N/A"}</p>
            </div>
            <div className="info-group">
              <h3>Country</h3>
              <p>{companyProfile.country || "N/A"}</p>
            </div>
            <div className="info-group">
              <h3>LinkedIn</h3>
              <p>{companyProfile.linkedin || "N/A"}</p>
            </div>
            <div className="info-group">
              <h3>Facebook</h3>
              <p>{companyProfile.facebook || "N/A"}</p>
            </div>
            <div className="info-group">
              <h3>Instagram</h3>
              <p>{companyProfile.insta || "N/A"}</p>
            </div>
            <div className="info-group">
              <h3>X (Twitter)</h3>
              <p>{companyProfile.x || "N/A"}</p>
            </div>
            <div className="info-group">
              <h3>YouTube</h3>
              <p>{companyProfile.youtube || "N/A"}</p>
            </div>
            <div className="info-group">
              <h3>Font Family</h3>
              <p>{companyProfile.fontfamily || "N/A"}</p>
            </div>
            <div className="info-group">
              <h3>Primary Color</h3>
              <p
                style={{
                  backgroundColor: companyProfile.color1 || "#ffffff",
                  borderRadius: "3px",
                  padding: "5px",
                }}
              >
                {companyProfile.color1 || "N/A"}
              </p>
            </div>
            <div className="info-group">
              <h3>Secondary Color</h3>
              <p
                style={{
                  backgroundColor: companyProfile.color2 || "#ffffff",
                  borderRadius: "3px",
                  padding: "5px",
                }}
              >
                {companyProfile.color2 || "N/A"}
              </p>
            </div>
            <div className="info-group">
              <h3>Tertiary Color</h3>
              <p
                style={{
                  backgroundColor: companyProfile.color3 || "#ffffff",
                  borderRadius: "3px",
                  padding: "5px",
                }}
              >
                {companyProfile.color3 || "N/A"}
              </p>
            </div>
          </div>
          <div className="admin-close-button-row">
            <img
              onClick={() => {
                setShowSectionTwoSelectedCompanyDetail(false);
                setCompanyListingWindow(true);
              }}
              width="48"
              height="48"
              src="https://img.icons8.com/fluency/48/delete-sign.png"
              alt="delete-sign"
              className="status-cross-symbol"
            />
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
