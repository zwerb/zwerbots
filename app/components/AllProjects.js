import React from "react";
import { connect } from "react-redux";
import { fetchProjects } from "../redux/projects";
import { ProjectsList } from "./ProjectsList";

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
    console.log('projects props',this.props)
    const { projects } = this.props || [];
    return (
      <div className="projects-section">
        <ProjectsList projects={projects} />
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
