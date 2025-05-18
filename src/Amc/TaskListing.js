import "../Amc/TaskListing.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import nexticn from "../Components/Assets/svg/chevron-right-solid.svg";
import backicn from "../Components/Assets/svg/back-chevron-right-solid (1).svg";
import viewicn from "../Components/Assets/Our Levers/eye.png";
export function TaskListing() {
  const [companiesWithTasks, setCompaniesWithTasks] = useState([]);
  const scrollRefs = useRef({});
  const [showCompaniseTasks, setShowCompaniseTasks] = useState(true);
  const [showSelectedTaskWindow, setShowSelectedTaskWindow] = useState(false);
  const [showSelectedCompanyDetail, setShowSelectedCompanyDetail] =
    useState(false);
  const [selectedRolledBackTask, setSelectedRolledBackTask] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showTaskpreview, setShowTaskpreview] = useState(null);
  const [companyProfile, setCompanyProfile] = useState(null);

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
        console.log("Successfull fetch All Task Section-1");

        const companies = response.data;
        const filteredCompanies = companies.filter(
          (item) => item.tasks && item.tasks.length > 0
        );

        const priority = { Pending: 1, "Roll Back": 2, Approved: 3 };

        filteredCompanies.forEach((company) => {
          company.tasks.sort(
            (a, b) => priority[a.currentStatus] - priority[b.currentStatus]
          );
        });

        if (filteredCompanies.length > 0) {
          setCompaniesWithTasks(filteredCompanies);
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

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return {
          backgroundColor: "#5eb35eb7",
        };
      case "Pending":
        return {
          backgroundColor: "rgba(255, 145, 0, 0.69)",
        };
      case "Roll Back":
        return {
          backgroundColor: "rgba(245, 65, 0, 0.69)",
        };
      default:
        return {};
    }
  };

  const scrollLeft = (companyId) => {
    const ref = scrollRefs.current[companyId];
    if (ref) {
      ref.scrollBy({ left: -260, behavior: "smooth" });
    }
  };

  const scrollRight = (companyId) => {
    const ref = scrollRefs.current[companyId];
    if (ref) {
      ref.scrollBy({ left: 260, behavior: "smooth" });
    }
  };

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="task-listing-container-page">
      {showCompaniseTasks && (
        <div className="task-listing-container">
          {companiesWithTasks.length > 0 ? (
            companiesWithTasks.map((companyData, index) => {
              const companyId = companyData.company._id;

              if (!scrollRefs.current[companyId]) {
                scrollRefs.current[companyId] = React.createRef();
              }

              return (
                <div className="cmpy-task-lister" key={companyId}>
                  <div className="cmpy-detail-row">
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
                          setCompanyProfile(companyData.company); // You need to define this in state
                          setShowCompaniseTasks(false);
                          setShowSelectedCompanyDetail(true);
                        }}
                      >
                        View <img className="eye-icn" src={viewicn} alt="" />
                      </li>
                    </ul>
                  </div>
                  <div className="cmpy-task-row-container-navigation">
                    <img
                      src={backicn}
                      alt="Scroll Left"
                      className="assign-task-btn back"
                      onClick={() => scrollLeft(companyId)}
                    />
                    <div
                      className="cmpy-task-row-container"
                      ref={(el) => (scrollRefs.current[companyId] = el)}
                    >
                      {companyData.tasks.map((task) => (
                        <div
                          className="cmpy-task-row-box"
                          onClick={() => {
                            setSelectedRolledBackTask(task);
                            setShowCompaniseTasks(false);
                            setShowSelectedTaskWindow(true);
                            setPreviewUrl(null); // Reset preview image
                            setSelectedFile(null); // Reset selected file
                          }}
                          key={task._id}
                        >
                          <div className="cmpy-id-status">
                            <div className="cmpy-task-id">
                              <h5>TaskId: </h5>
                              <p>#{task.taskId}</p>
                            </div>
                            <div
                              className="status-card-text"
                              style={getStatusClass(task.currentStatus)}
                            >
                              {task.currentStatus}
                            </div>
                          </div>
                          <div className="cmpy-task-title">
                            <h5>Title: </h5>
                            <p className="overflow-control">{task.title}</p>
                          </div>
                          <div className="cmpy-task-review-date">
                            <h5>Review Date: </h5>
                            <p>
                              {new Date(
                                task.submissionForReview
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="cmpy-task-review-date">
                            <h5>Target Date: </h5>
                            <p>
                              {new Date(
                                task.targetPostingDate
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="cmpy-task-view-btn-container">
                            <div
                              className="cmpy-task-view-btn"
                              onClick={() => {
                                setSelectedRolledBackTask(task);
                                setShowCompaniseTasks(false);
                                setShowSelectedTaskWindow(true);
                                setPreviewUrl(null); // Reset preview image
                                setSelectedFile(null); // Reset selected file
                              }}
                            >
                              View
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <img
                      src={nexticn}
                      alt="Scroll Right"
                      className="assign-task-btn next"
                      onClick={() => scrollRight(companyId)}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <p style={{ textAlign: "center" }}>Loading or No tasks found...</p>
          )}
        </div>
      )}

      {showSelectedTaskWindow && selectedRolledBackTask && (
        <div className="admin-show-task-status-container">
          <div className="close-button-row">
            <img
              onClick={() => {
                setShowSelectedTaskWindow(false);
                setShowCompaniseTasks(true);
                setSelectedRolledBackTask(null);
              }}
              width="48"
              height="48"
              src="https://img.icons8.com/fluency/48/delete-sign.png"
              alt="delete-sign"
              className="status-cross-symbol"
            />
          </div>

          <div className="status-top-floor">
            <div className="status-top-floor-row-1">
              <div className="status-col-1">
                <div className="status-row rm-padding">
                  <div className="status-task-id">
                    <div className="task-id">Task ID</div>
                    <div className="task-id-number">
                      #{selectedRolledBackTask.taskId}
                    </div>
                  </div>
                  <div className="status-task-title">
                    <div className="task-title-status">Task Title</div>
                    <div className="task-title-name-status task-h">
                      {selectedRolledBackTask.title}
                    </div>
                  </div>
                  <div className="status-task-title">
                    <div className="task-title-status">Tagline or Slogan</div>
                    <div className="task-title-name-status task-h">
                      {selectedRolledBackTask.tagline}
                    </div>
                  </div>
                  <div className="status-task-title">
                    <div className="task-title-status">Purpose/Objective</div>
                    <div className="task-title-name-status">
                      {selectedRolledBackTask.taskpurpose}
                    </div>
                  </div>
                  <div className="status-task-title">
                    <div className="task-title-status">Main Headline</div>
                    <div className="task-title-name-status task-h">
                      {selectedRolledBackTask.headline}
                    </div>
                  </div>
                  <div className="status-task-title">
                    <div className="task-title-status">
                      Key Offer or Message
                    </div>
                    <div className="task-title-name-status">
                      {selectedRolledBackTask.offerormessage}
                    </div>
                  </div>
                  <div className="status-task-title">
                    <div className="task-title-status">
                      Call to Action (CTA)
                    </div>
                    <div className="task-title-name-status">
                      {selectedRolledBackTask.calltoaction}
                    </div>
                  </div>
                  <div className="status-task-title">
                    <div className="task-title-status">Branding Guidelines</div>
                    <div className="task-title-name-status">
                      {selectedRolledBackTask.guidlines}
                    </div>
                  </div>
                  <div className="status-task-title">
                    <div className="task-title-status">
                      Additional Information
                    </div>
                    <div className="task-title-name-status">
                      {selectedRolledBackTask.additionalinfo}
                    </div>
                  </div>
                  <div className="status-task-des">
                    <div className="task-title-status">Task Description</div>
                    <div className="task-title-name-status">
                      {selectedRolledBackTask.description}
                    </div>
                  </div>
                  <div className="status-task-dates">
                    <label className="task-title-status">Target Date</label>
                    <div className="status-target-date">
                      <input
                        type="date"
                        name="targetPostingDate"
                        value={formatDateForDisplay(
                          selectedRolledBackTask.targetPostingDate
                        )}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="status-task-dates">
                    <label className="task-title-status">Deadline Date</label>
                    <div className="status-deadline-date">
                      <input
                        type="date"
                        name="submissionForReview"
                        value={formatDateForDisplay(
                          selectedRolledBackTask.submissionForReview
                        )}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
              {selectedRolledBackTask.rollbackFeedback.length > 0 && (
                <div className="admin-past-rollback">
                  <h3>Rollback Feedback</h3>
                  <ul>
                    {selectedRolledBackTask.rollbackFeedback.map(
                      (feedback, index) => (
                        <li key={index}>
                          <p className="feed-index">{index + 1}.</p>
                          <p>{feedback.feedback}</p>
                        </li>
                      )
                    )}
                  </ul>
                  <div className="task-preview-img-container">
                    <img
                      src={selectedRolledBackTask.doneTaskImage}
                      className="yet-task-preview-img admin-img-btm"
                      alt="Task Preview"
                    />
                  </div>
                </div>
              )}

              <div className="status-col-2">
                <div className="admin-upload-image">
                  <label htmlFor="referenceimage">Upload Task Image:</label>
                  <input
                    type="file"
                    name="adminuploadtaskimage"
                    className="img-input admin-input"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setSelectedFile(file);
                      if (file) {
                        const preview = URL.createObjectURL(file);
                        setPreviewUrl(preview);
                      }
                    }}
                  />
                  <button
                    className="button-uploade"
                    disabled={!selectedFile || isUploading}
                    onClick={async () => {
                      if (!selectedRolledBackTask || !selectedFile) return;

                      const formData = new FormData();
                      formData.append("image", selectedFile);

                      try {
                        setIsUploading(true);
                        const token = localStorage.getItem("token");

                        const response = await axios.post(
                          `${process.env.REACT_APP_API_URL}/admin/upload-task-image/${selectedRolledBackTask._id}`,
                          formData,
                          {
                            headers: {
                              "Content-Type": "multipart/form-data",
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        );

                        if (response.status === 200) {
                          toast.success("Task image uploaded successfully", {
                            autoClose: 500,
                          });
                          setShowTaskpreview(true);
                          setSelectedRolledBackTask((prev) => ({
                            ...prev,
                            referenceImage: response.data.task.image,
                          }));
                          setSelectedFile(null);
                        } else {
                          setShowTaskpreview(false);
                          toast.error("Image upload failed");
                        }
                      } catch (err) {
                        toast.error("Error uploading image: " + err.message);
                      } finally {
                        setIsUploading(false);
                      }
                    }}
                  >
                    <svg
                      className="w-6 h-6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                    <span className="text">
                      {isUploading ? "Uploading..." : "Upload"}
                    </span>
                  </button>
                </div>
                {showTaskpreview && (
                  <div className="task-preview-container">
                    <div className="status-title-preview">Task Preview</div>
                    <div className="task-preview-img-container">
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          className="yet-task-preview-img"
                          alt="Task Preview"
                        />
                      ) : (
                        <div className="yet-task-preview-img-placeholder">
                          No image selected
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {showSelectedCompanyDetail && (
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
                setShowCompaniseTasks(true);
                setShowSelectedTaskWindow(false);
                setShowSelectedCompanyDetail(false);
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
