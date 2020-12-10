import React from "react";
import { connect } from "react-redux";
import { fetchProjects } from "../redux/projects";
import moment from 'moment'

// !REPLACE - with user settings
const usersTimeZone = "America/New_York";

// Notice that we're exporting the AllProjects component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllProjects extends React.Component {
  async componentDidMount() {
    this.props.getProjects();
  }
  render() {
    // !REPLACE - uncomment
    const {projects} = this.props;
    return (
      <div className="all-projects">
        <h4>Projects</h4>
        {projects && projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="single-project">
              <div className="project-meta-data">
                <div className="project-id">{project.id}</div>
                <div className="project-title">{project.title}</div>
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
                <div className="project-deadline"><strong>Due:</strong> {project.deadline?moment(project.deadline).fromNow():'No Deadline'}</div>
                <div className="project-description">
                <strong>Description:</strong> {project.description}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No Projects</p>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    projects: state.projects,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProjects: () => dispatch(fetchProjects()),
  };
};

export default connect(mapState, mapDispatch)(AllProjects);
