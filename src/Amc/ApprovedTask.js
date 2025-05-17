import "../Amc/ApprovedTask.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ApprovedTask() {
  const [approvedCompanies, setApprovedCompanies] = useState([]); // companies with tasks
  const [selectedApprovedTask, setSelectedApprovedTask] = useState(null); // single task
  const [showSelectedTaskWindow, setShowSelectedTaskWindow] = useState(false);
  const [showApprovedTaskGrid, setShowApprovedTaskGrid] = useState(true);

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
        toast.success("Approved Task fetched successfully", {
          autoClose: 500,
        });

        const approvedTask = response.data;
        const filteredTask = approvedTask.filter(
          (item) => item.tasks && item.tasks.length > 0
        );

        const priority = { Pending: 1, "Roll Back": 2, Approved: 3 };

        filteredTask.forEach((company) => {
          company.tasks.sort(
            (a, b) => priority[a.currentStatus] - priority[b.currentStatus]
          );
        });

        if (filteredTask.length > 0) {
          setApprovedCompanies(filteredTask);
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
        return "status-approved";
      case "Pending":
        return "status-pending";
      case "Roll Back":
        return "status-rollback";
      default:
        return "";
    }
  };

  const formatDateForDisplay = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // yyyy-mm-dd format
  };

  return (
    <>
      <ToastContainer />
      <div className="admin-approved-task-container">
        {showApprovedTaskGrid && (
          <div className="cmpy-task-row-container-navigation">
            <div className="cmpy-task-row-container">
              {approvedCompanies.map((company) =>
                company.tasks.map((task) => (
                  <div
                    className="cmpy-task-row-box"
                    onClick={() => {
                      setSelectedApprovedTask(task);
                      setShowSelectedTaskWindow(true);
                      setShowApprovedTaskGrid(false);
                    }}
                    key={task._id}
                  >
                    <div className="cmpy-id-status">
                      <div className="cmpy-task-id">
                        <h5>TaskId: </h5>
                        <p>#{task.taskId}</p>
                      </div>
                      <div
                        className={`status-card-text ${getStatusClass(
                          task.currentStatus
                        )}`}
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
                        {new Date(task.submissionForReview).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="cmpy-task-review-date">
                      <h5>Target Date: </h5>
                      <p>
                        {new Date(task.targetPostingDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="cmpy-task-view-btn-container">
                      <div className="cmpy-task-view-btn">View</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {showSelectedTaskWindow && selectedApprovedTask && (
          <div className="admin-show-task-status-container">
            <div className="close-button-row">
              <img
                onClick={() => {
                  setShowSelectedTaskWindow(false);
                  setShowApprovedTaskGrid(true);
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
                        #{selectedApprovedTask.taskId}
                      </div>
                    </div>
                    <div className="status-task-title">
                      <div className="task-title-status">Task Title</div>
                      <div className="task-title-name-status task-h">
                        {selectedApprovedTask.title}
                      </div>
                    </div>
                    <div className="status-task-title">
                      <div className="task-title-status">Tagline or Slogan</div>
                      <div className="task-title-name-status task-h">
                        {selectedApprovedTask.tagline}
                      </div>
                    </div>
                    <div className="status-task-title">
                      <div className="task-title-status">Purpose/Objective</div>
                      <div className="task-title-name-status">
                        {selectedApprovedTask.taskpurpose}
                      </div>
                    </div>
                    <div className="status-task-title">
                      <div className="task-title-status">Main Headline</div>
                      <div className="task-title-name-status task-h">
                        {selectedApprovedTask.headline}
                      </div>
                    </div>
                    <div className="status-task-title">
                      <div className="task-title-status">
                        Key Offer or Message
                      </div>
                      <div className="task-title-name-status">
                        {selectedApprovedTask.offerormessage}
                      </div>
                    </div>
                    <div className="status-task-title">
                      <div className="task-title-status">
                        Call to Action (CTA)
                      </div>
                      <div className="task-title-name-status">
                        {selectedApprovedTask.calltoaction}
                      </div>
                    </div>
                    <div className="status-task-title">
                      <div className="task-title-status">
                        Branding Guidelines
                      </div>
                      <div className="task-title-name-status">
                        {selectedApprovedTask.guidlines}
                      </div>
                    </div>
                    <div className="status-task-title">
                      <div className="task-title-status">
                        Additional Information
                      </div>
                      <div className="task-title-name-status">
                        {selectedApprovedTask.additionalinfo}
                      </div>
                    </div>
                    <div className="status-task-des">
                      <div className="task-title-status">Task Description</div>
                      <div className="task-title-name-status">
                        {selectedApprovedTask.description}
                      </div>
                    </div>
                    <div className="status-task-dates">
                      <label className="task-title-status">Target Date</label>
                      <div className="status-target-date">
                        <input
                          type="date"
                          name="targetPostingDate"
                          value={formatDateForDisplay(
                            selectedApprovedTask.targetPostingDate
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
                            selectedApprovedTask.submissionForReview
                          )}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="status-col-2">
                  <div className="task-preview-container">
                    <div className="status-title-preview">
                      Approved Task Image
                    </div>
                    <div className="task-preview-img-container">
                      <img
                        src={selectedApprovedTask.doneTaskImage}
                        className="yet-task-preview-img"
                        alt="Task Has No Preview"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
