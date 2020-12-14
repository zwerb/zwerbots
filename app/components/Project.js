/* eslint-disable complexity */
import React from "react";
import { SingleMessage } from "./SingleMessage";
import { Link } from "react-router-dom";
import moment from "moment";

export const Project = (props) => {
  const { project } = props.project ? props : {};
  const { ranOnce } = props;
  const { deleteProject } = props.deleteProject
    ? props
    : { deleteProject: () => {} };  
  return (
    <div className="single-project-clear">
      {!ranOnce ? (
        <SingleMessage
          message={{
            title: "Loading...",
            imageUrl: "/images/preloading.gif",
            header: "Fetching Project.",
          }}
        />
      ) : project && project.id ? (
        <div className="single-project">
          <div className="project-settings-data">
            {props.match ? (
              ""
            ) : (
              <span>
                {!props.match ? (
                  <button
                    type="button"
                    onClick={() => {
                      deleteProject(project.id);
                    }}
                    className="project-delete-button"
                  >
                    X
                  </button>
                ) : (
                  ""
                )}
              </span>
            )}
          </div>
          <div className="project-meta-data">
            <div className="project-id">ID: {project.id}</div>
            <div className="project-title">
              <Link to={`/projects/${project.id}`}>{project.title}</Link>
            </div>
            <div
              className={
                project.completed
                  ? "project-status completed"
                  : "project-status in-progress"
              }
            >
              <div className="status-text">
                {project.completed ? (
                  <span
                    onClick={() => {
                      props.toggleCompleted();
                    }}
                    className="complete-button"
                  >
                    &#x2611;
                  </span>
                ) : (
                  <span
                    onClick={() => {
                      props.toggleCompleted();
                    }}
                  >
                    &#x2610;
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="project-details">
            <div className="project-deadline">
              <span><strong>Due:</strong>{" "}
              {project.deadline
                ? moment(project.deadline).fromNow()
              : "No Deadline"}</span><span><strong>Priority:</strong> {project.priority}</span>
            </div>
            <div className="project-description">
              <strong>Description:</strong> {project.description}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h4>Project Not Found</h4>
        </div>
      )}
    </div>
  );
};
