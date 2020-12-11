/* eslint-disable complexity */
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProject, clearProject } from "../redux/singleProject";
import moment from "moment";
import { SingleMessage } from "./SingleMessage";

export class SingleProject extends React.Component {
  async componentDidMount() {
    const { project } = this.props;
    if (
      !project ||
      !project.id ||
      (this.props.match && project.id != this.props.match.params.projectId)
    ) {
      try {
        await this.props.getProject(this.props.match.params.projectId);
      } catch (err) {
        console.error(err);
      }
    }
  }

  componentWillUnmount() {
    if (this.props.match) {
      this.props.clearProject();
    }
  }

  render() {
    console.log('single project props',this.props?this.props:"")
    const { project } = this.props;

    const robots =
      project && project.robots
        ? project.robots.map((robot) => (
            <Link key={robot.id} to={`/robots/${robot.id}`}>
              {robot.id}: {robot.name}
            </Link>
          ))
        : [];
    const message =
      project && robots && robots.length > 0
        ? {
            title: "Robots",
            header: `Assigned to Project # ${project.id}:`,
            content: robots,
          }
        : {
            title: "Robots",
            header: `None Assigned to Project #: ${project.id}`,
          };

    return (
      <div>
        <div className="single-project">
          {project && project.id ? (
            <div>
              <div className="project-meta-data">
                <div className="project-id">{project.id}</div>
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
                      <span>&#x2611;</span>
                    ) : (
                      <span>&#x2610;</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="project-details">
                <div className="project-deadline">
                  <strong>Due:</strong>{" "}
                  {project.deadline
                    ? moment(project.deadline).fromNow()
                    : "No Deadline"}
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
        {this.props.match && this.props.match.params ? (
          <SingleMessage message={message} />
        ) : (
          ""
        )}
        {this.props.match && this.props.match.params ? (
          <div>
            <div style={{ textAlign: "center" }}>
              <h4>
                <Link to={`/projects`}>Back to Projects</Link>
              </h4>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    project: state.project,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProject: (projectId) => dispatch(fetchProject(projectId)),
    clearProject: () => dispatch(clearProject()),
  };
};

export default connect(mapState, mapDispatch)(SingleProject);
