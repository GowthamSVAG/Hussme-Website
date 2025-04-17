import React, { useState, useEffect, useRef } from "react";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../Components/Context/UserContext";
import "../Management/ContentManagement.css";
import { MdAddTask } from "react-icons/md";
import { VscTasklist } from "react-icons/vsc";
import nexticn from "../Components/Assets/svg/chevron-right-solid.svg";
import backicn from "../Components/Assets/svg/back-chevron-right-solid (1).svg";

export function ContentManagement() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const [companyProfile, setCompanyProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [NewTask, setNewTask] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showTaskStatus, setShowTaskStatus] = useState(true);
  const [buttonAction, setActiveButton] = useState(null);
  const scrollRef = useRef(null);
  const approvedScrollRef = useRef(null);

  const showNewTask = () => {
    if (NewTask == true) {
      setNewTask(false);
    } else {
      setNewTask(true);
    }
  };
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

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -350,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 350,
        behavior: "smooth",
      });
    }
  };
  const approvedScrollLeft = () => {
    if (approvedScrollRef.current) {
      approvedScrollRef.current.scrollBy({
        left: -350,
        behavior: "smooth",
      });
    }
  };

  const approvedScrollRight = () => {
    if (approvedScrollRef.current) {
      approvedScrollRef.current.scrollBy({
        left: 350,
        behavior: "smooth",
      });
    }
  };

  // If still loading, show a loading message
  if (loading) {
    return (
      <div className="loader-container">
        <span class="loader"></span>
      </div>
    );
  }

  const showFeedbackForm = () => {
    if (showFeedback == true) {
      setShowFeedback(false);
    } else {
      setShowFeedback(true);
    }
  };
  const taskStatus = () => {
    if (showTaskStatus == true) {
      setShowTaskStatus(false);
    } else {
      setShowTaskStatus(true);
    }
  };
  const disableButton = () => {
    if (buttonAction == "approve") {
      setActiveButton("diapprove");
    } else {
      setActiveButton("approve");
    }
  };

  return (
    <div className="content-management-page">
      {/* First Half */}
      <div className="task-row">
        <div className="task-title-and-new-task">
          <div className="task-title">Task Approval&Pending</div>
          <div className="new-task-button" onClick={showNewTask}>
            + Assign New Task
          </div>
          <div className="approved-list-container">
            <div className="appproved-list-btn">Launched List</div>
          </div>
        </div>

        <div className="task-boxes">
          {NewTask ? (
            <div className="assign-new-task">
              <div className="assign-new-task-row">
                <div className="new-task-form-title">
                  Add New Task <MdAddTask style={{ marginLeft: "8px" }} />
                </div>
                <img
                  onClick={() => showNewTask(false)}
                  width="48"
                  height="48"
                  src="https://img.icons8.com/fluency/48/delete-sign.png"
                  alt="delete-sign"
                  className="cross-symbol"
                />
              </div>

              <form className="new-task-form" action="">
                <div className="new-task-row">
                  <input
                    type="text"
                    className="new-task-title"
                    placeholder="Task Title "
                  />
                  <textarea
                    name=""
                    id=""
                    placeholder="Task Description"
                    className="new-task-des"
                  ></textarea>
                </div>

                <div className="new-task-row">
                  <div className="new-task-input-box">
                    <label for="new-task-date" className="new-task-date-label">
                      Target Posting Date:
                    </label>
                    <input
                      type="date"
                      name="new-task-date"
                      className="new-task-date"
                    />
                  </div>
                  <div className="new-task-input-box">
                    <label for="new-task-date" className="new-task-date-label">
                      Submission for Review:
                    </label>
                    <input type="date" className="new-task-date" />
                  </div>
                </div>
                <div className="new-task-row-submit">
                  <button type="submit" className="new-task-row-submit-btn">
                    Submit Task
                    <VscTasklist
                      style={{
                        marginLeft: "8px",
                        height: "30px",
                        width: "30px",
                      }}
                    />
                  </button>
                </div>
              </form>
            </div>
          ) : showTaskStatus ? (
            <div className="task-arrows">
              <img
                src={backicn}
                alt=""
                className="assign-task-btn back"
                onClick={scrollLeft}
              />
              <div className="task-row-container" ref={scrollRef}>
                <div className="box">
                  <div className="cart-task-box-wrapper">
                    <div className="cart-task-box">
                      <div className="top-id-card">
                        <div className="name-task">Task id:</div>
                        <div className="task-number">#1</div>
                      </div>
                      <div className="bottom-title-card">
                        <div className="task-box-title">Summer offer</div>
                        <button className="cart-task-btn" onClick={taskStatus}>
                          <span>View</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="box">
                  <div className="cart-task-box-wrapper">
                    <div className="cart-task-box">
                      <div className="top-id-card">
                        <div className="name-task">Task id:</div>
                        <div className="task-number">#1</div>
                      </div>
                      <div className="bottom-title-card">
                        <div className="task-box-title">Summer offer</div>
                        <button className="cart-task-btn" onClick={taskStatus}>
                          <span>View</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="box">
                  <div className="cart-task-box-wrapper">
                    <div className="cart-task-box">
                      <div className="top-id-card">
                        <div className="name-task">Task id:</div>
                        <div className="task-number">#1</div>
                      </div>
                      <div className="bottom-title-card">
                        <div className="task-box-title">Summer offer</div>
                        <button className="cart-task-btn" onClick={taskStatus}>
                          <span>View</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="box">
                  <div className="cart-task-box-wrapper">
                    <div className="cart-task-box">
                      <div className="top-id-card">
                        <div className="name-task">Task id:</div>
                        <div className="task-number">#1</div>
                      </div>
                      <div className="bottom-title-card">
                        <div className="task-box-title">Summer offer</div>
                        <button className="cart-task-btn" onClick={taskStatus}>
                          <span>View</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="box">
                  <div className="cart-task-box-wrapper">
                    <div className="cart-task-box">
                      <div className="top-id-card">
                        <div className="name-task">Task id:</div>
                        <div className="task-number">#1</div>
                      </div>
                      <div className="bottom-title-card">
                        <div className="task-box-title">Summer offer</div>
                        <button className="cart-task-btn" onClick={taskStatus}>
                          <span>View</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="box">
                  <div className="cart-task-box-wrapper">
                    <div className="cart-task-box">
                      <div className="top-id-card">
                        <div className="name-task">Task id:</div>
                        <div className="task-number">#1</div>
                      </div>
                      <div className="bottom-title-card">
                        <div className="task-box-title">Summer offer</div>
                        <button className="cart-task-btn" onClick={taskStatus}>
                          <span>View</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <img
                src={nexticn}
                alt=""
                className="assign-task-btn next"
                onClick={scrollRight}
              />
            </div>
          ) : (
            <div className="show-task-status-container">
              <div className="status-col status-col-1">
                <div className="status-task-id">
                  <div className="task-id for-gradient-font">Task ID</div>
                  <div className="task-id-number">#1</div>
                </div>
                <div className="status-task-title">
                  <div className="task-title-status for-gradient-font">
                    Task Title
                  </div>
                  <div className="task-title-name-status">Summer offer</div>
                </div>
                <div className="status-task-des">
                  <div className="task-des for-gradient-font">
                    Task Description
                  </div>
                  <div className="task-des-name">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quod, magnam.
                  </div>
                </div>
                <div className="status-task-dates">
                  <label className="for-gradient-font">Target Date</label>
                  <div className="status-target-date">
                    <input type="date" name="" id="" />
                  </div>
                  <label className="for-gradient-font">Deadline Date</label>
                  <div className="status-deadline-date">
                    <input type="date" name="" id="" />
                  </div>
                </div>
              </div>
              <div className="status-col status-col-2">
                <div className="status-title-preview for-gradient-font">
                  Task Preview
                </div>
                <div className="task-preview-img-container">
                  <img
                    src="https://i.ibb.co/MxsfPnN5/9198056-4116738.jpg"
                    className="task-preview-img"
                    alt=""
                  />
                </div>
              </div>
              <div className="status-col status-col-3">
                <div className="status-task-btns">
                  <div className="row-3-col-1-btn">
                    <img
                      onClick={() => taskStatus(false)}
                      width="48"
                      height="48"
                      src="https://img.icons8.com/fluency/48/delete-sign.png"
                      alt="delete-sign"
                      className="status-cross-symbol"
                    />
                  </div>
                  <div className="row-3-col-2-btn">
                    <button
                      // className="custom-button"
                      className={
                        buttonAction && buttonAction !== "approve"
                          ? "custom-button-disable "
                          : "custom-button"
                      }
                      onClick={() => taskStatus(false)}
                      disabled={buttonAction && buttonAction !== "approve"}
                    >
                      <span class="button-content">
                        <span class="button-text">Approve</span>
                        <span class="button-icon">✅</span>
                      </span>
                      <span class="button-background"></span>
                    </button>
                    <button
                      class="custom-button"
                      onClick={() => {
                        showFeedbackForm();
                        disableButton();
                      }}
                    >
                      <span class="button-content">
                        <span class="button-text">Refer Back</span>
                        <span class="button-icon">🔄️</span>
                      </span>
                      <span class="button-background-2"></span>
                    </button>
                  </div>
                  {showFeedback && (
                    <div className="status-feedback-form">
                      <textarea
                        className="feedback-textarea"
                        placeholder="Leave your feedback"
                      ></textarea>
                      <button
                        className="submit-feedback-btn"
                        onClick={() => setShowFeedback(false)}
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Second Half */}
      <div className="task-approved-row">
        <div className="approve-title"> Approved & Yet to launch 🚀</div>
        <div className="task-arrows">
          <img
            src={backicn}
            alt=""
            className="assign-task-btn back"
            onClick={approvedScrollLeft}
          />
          <div className="task-approved-row-container" ref={approvedScrollRef}>
            <div className="yet-task-box-wrapper">
              <div className="yet-task-box">
                <div className="inner-triangle-container">
                  <div className="yet-task-id">
                    <div className="yet-id">#1</div>
                    <div className="yet-title">Task id</div>
                  </div>
                  {/* <button className="yet-preview-btn">
                    Preview
                  </button> */}
                 
<button className="yet-preview-btn">Preview</button>

                  <div className="yet-task-title">Summer offer</div>
                </div>
              </div>
            </div>
          </div>
          <img
            src={nexticn}
            alt=""
            className="assign-task-btn next"
            onClick={approvedScrollRight}
          />
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="management-content">
                <h1>Content Management</h1>
                {companyProfile && (
                    <div className="company-details">
                        <h2>Your Company Details</h2>
                        <p><strong>Industry:</strong> {companyProfile.industry}</p>
                        <p><strong>Email:</strong> {companyProfile.email}</p>
                        <p><strong>Phone:</strong> {companyProfile.phone}</p>
                        {companyProfile.website && (
                            <p><strong>Website:</strong> {companyProfile.website}</p>
                        )}
                        {companyProfile.address && (
                            <p><strong>Address:</strong> {companyProfile.address}, {companyProfile.city}, {companyProfile.state}, {companyProfile.zip}, {companyProfile.country}</p>
                        )}
                    </div>
                )}
            </div> */
}
