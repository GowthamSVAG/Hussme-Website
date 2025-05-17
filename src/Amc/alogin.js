import "../Amc/alogin.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Alogin() {
  const [email, setAdminEmail] = useState("");
  const [password, setAdminPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminToken, setAdminToken] = useState("");

  const navigate = useNavigate();

  const handleAdminLoginSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setIsAdmin(true); // Set login flag
        setAdminToken(result.Token); // Store token in state
        localStorage.setItem("token", result.token); // Save token in localStorage
        toast.success("Login Successful!");
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 500);
      } else {
        if (result.response && result.response.status === 401) {
          toast.error("Session expired. Please log in again.");
          localStorage.removeItem("token");
          navigate("/admin/login");
        }
        toast.error(
          result.message || "Admin Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred during Admin login. Please try again.");
    }
  };

  return (
    <>
      <div className="alogin-container">
        <ToastContainer position="top-right" autoClose={500} />
        <form className="alogin-form" onSubmit={handleAdminLoginSubmit}>
          <div className="alogin-header">Admin Login</div>

          <div className="alogin-input-box">
            <label htmlFor="alogin-email">Email</label>
            <input
              type="email"
              name="aemail"
              id="alogin-email"
              onChange={(e) => setAdminEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div className="alogin-input-box">
            <label htmlFor="alogin-pwd">Password</label>
            <input
              type="password"
              name="apwd"
              id="alogin-pwd"
              onChange={(e) => setAdminPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <button type="submit" className="cssbuttons-io-button">
            Login
            <div className="icon-1">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </button>
        </form>
      </div>
    </>
  );
}
