import React from "react";
import { connect } from "react-redux";
import { fetchProjects } from "../redux/projects";
import { fetchDeleteProject } from "../redux/singleProject";
import { ProjectsList } from "./ProjectsList";
import CreateProject from "./CreateProject";

// !REPLACE - with user settings
const usersTimeZone = "America/New_York";

// Notice that we're exporting the AllProjects component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ranOnce: false };
    this.updateLocalList = this.updateLocalList.bind(this);
    this.removeFromLocalList = this.removeFromLocalList.bind(this);
  }

  async componentDidMount() {
    await this.props.getProjects();
    const { projects } = this.props.projects ? this.props : [];
    this.setState({
      projects: projects,
      ranOnce: true,
    });
  }

  updateLocalList(project) {
    this.setState({
      projects: [...this.state.projects, project],
    });
  }

  removeFromLocalList(projectId) {
    const newList = this.state.projects.filter(
      (project) => project.id != projectId
    );
    this.setState({
      ...this.props,
      projects: [...newList],
    });
  }

  render() {

    const { projects } = this.state.projects ? this.state : [];
    return (
      <div className="projects-section">
        <h4>Projects</h4>
        <div className="projects-content-container">
          <ProjectsList
            projects={projects}
            ranOnce={this.state.ranOnce}
            removeFromLocalList={this.removeFromLocalList}
            deleteProject={this.props.deleteProject}
          />
          <CreateProject updateLocalList={this.updateLocalList} />
        </div>
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
    deleteProject: (projectId) => dispatch(fetchDeleteProject(projectId)),
  };
};

export default connect(mapState, mapDispatch)(AllProjects);
