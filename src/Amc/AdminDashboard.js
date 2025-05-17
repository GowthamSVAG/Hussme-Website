import "../Amc/AdminDashboard.css";
import React, { use, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TaskListing } from "./TaskListing";
import { CompanyListing } from "./CompanyListing";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PendingTask } from "./PendingTask";
import { ReferBackTask } from "./ReferBackTask";
import { ApprovedTask } from "./ApprovedTask";
import { TotalTask } from "./TotalTask";
export function AdminDashboard() {
  const [taskStats, setTaskStats] = useState({
    total: 0,
    pending: 0,
    referBack: 0,
    approved: 0,
  });

  const [activeComponent, setActiveComponent] = useState(<TaskListing />);
  const [activeIndex, setActiveIndex] = useState(0); // Track the active sidebar index
  // Function to load components dynamically
  const loadComponent = (component, index) => {
    setActiveComponent(component);
    setActiveIndex(index);
  };

  const navigate = useNavigate();

  const fetchCompanyAllDetails = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You must be logged in to access this page.");
        navigate("/admin/login");
        return;
      }

      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/admin/all-companies",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const companies = response.data;
        let total = 0;
        let pending = 0;
        let referBack = 0;
        let approved = 0;

        companies.forEach((company) => {
          if (company.tasks && company.tasks.length > 0) {
            total += company.tasks.length;
            company.tasks.forEach((task) => {
              const status = task.currentStatus?.toLowerCase();
              if (status === "pending") pending++;
              else if (status === "roll back") referBack++;
              else if (status === "approved") approved++;
            });
          }
        });

        setTaskStats({ total, pending, referBack, approved });
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
    <>
      <div className="admin-header">
        <ToastContainer position="top-right" autoClose={500} />
        <div className="header-title">Hussme Admin Dashboard</div>{" "}
      </div>
      <div className="admin-page">
        <div className="admin-header-2">
          <ul>
            <li
              onClick={() => loadComponent(<TaskListing />, 0)}
              className={activeIndex === 0 ? "active-header-item" : ""}
            >
              Tasks
            </li>
            <li
              onClick={() => {
                loadComponent(<CompanyListing />, 1);
                fetchCompanyAllDetails();
              }}
              className={activeIndex === 1 ? "active-header-item" : ""}
            >
              Companies
            </li>

            <li  onClick={() => {
                loadComponent(<TotalTask />, 2);
                fetchCompanyAllDetails();
              }}
              className={activeIndex === 2 ? "active-header-item" : ""} >Total Tasks: {taskStats.total}</li>
            <li  onClick={() => {
                loadComponent(<PendingTask />, 3);
                fetchCompanyAllDetails();
              }}
              className={activeIndex === 3 ? "active-header-item" : ""}>Pending Tasks: {taskStats.pending}</li>
            <li  onClick={() => {
                loadComponent(<ReferBackTask/>, 4);
                fetchCompanyAllDetails();
              }}
              className={activeIndex === 4 ? "active-header-item" : ""}>Refer Back Tasks: {taskStats.referBack}</li>
            <li  onClick={() => {
                loadComponent(<ApprovedTask />,5);
                fetchCompanyAllDetails();
              }}
              className={activeIndex === 5 ? "active-header-item" : ""}>Approved Tasks: {taskStats.approved}</li>
          </ul>
        </div>
      </div>
      <div className="active-component">{activeComponent}</div>
    </>
  );
}
