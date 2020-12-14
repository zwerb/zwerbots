/* eslint-disable complexity */
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchProject,
  clearProject,
  fetchUnassignRobot,
  fetchUpdateProject,
} from "../redux/singleProject";
import { SingleMessage } from "./SingleMessage";
import { Project } from "./Project";
import CreateProject from "./CreateProject";

export class SingleProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ranOnce: false };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleUnassign = this.handleUnassign.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
  }

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
    this.setState({
      ...this.state,
      ranOnce: true,
      project: this.props.project,
    });
  }

  componentWillUnmount() {
    if (this.props.match) {
      this.props.clearProject();
    }
  }

  async handleDelete(projectId) {
    try {
      const deleted = await this.props.deleteProject(projectId);
      this.props.removeFromLocalList(projectId);
    } catch (err) {
      console.error(err);
    }
  }

  async toggleCompleted() {
    try {
      const project = this.state.project;
      const projectToUpdate = { id: project.id, completed: !project.completed };
      const updated = await this.props.updateProject(projectToUpdate);
      this.setState({
        ...this.state,
        project: {
          ...this.state.project,
          completed: !project.completed,
        },
      });
    } catch (err) {
      console.error(err);
    }
  }

  async handleUpdate(project) {
    try {
      this.setState({
        ...this.state,
        project: {
          ...this.state.project,
          ...project,
          robots: this.state.project.robots,
        },
      });
    } catch (err) {
      console.error(err);
    }
  }

  async handleUnassign(projectId, robotId) {
    try {
      this.props.unassignRobot(projectId, robotId);
      const newRobots = this.state.project.robots.filter(
        (robot) => robot.id != robotId
      );
      this.setState({
        ...this.state,
        project: { ...this.state.project, robots: newRobots },
      });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { project } =
      this.state.project && this.state.project.id
        ? this.state
        : this.props.project && this.props.project.id
        ? this.props
        : {};

    const robots =
      project && project.robots
        ? project.robots.map((robot) => (
            <span key={robot.id}>
              <button
                onClick={() => this.handleUnassign(project.id, robot.id)}
                className="unassign-button"
                type="button"
              >
                X
              </button>
              <Link to={`/robots/${robot.id}`}>
                {robot.id}: {robot.name}
              </Link>
            </span>
          ))
        : [];
    const message =
      project && project.id && robots && robots.length > 0
        ? {
            title: "Robots",
            header: `Assigned to Project # ${project.id}:`,
            content: robots,
            imageUrl: "/images/graphics/robots.png",
          }
        : robots && robots.length > 0
        ? {
            title: "Robots",
            header: `None Assigned to Project #: ${project.id}`,
            imageUrl: "/images/graphics/projects.png",
          }
        : {
            title: "Robots",
            header: `None Assigned.`,
            imageUrl: "/images/graphics/projects.png",
          };

    const { ranOnce } = this.state;
    return (
      <div className="single-project-section">
        <Project
          deleteProject={this.handleDelete}
          project={project}
          ranOnce={ranOnce}
          toggleCompleted={this.props.match ? this.toggleCompleted : () => {}}
          match={this.props.match}
        />
        {this.props.match &&
        this.props.match.params &&
        project &&
        project.id ? (
          <SingleMessage message={message} />
        ) : (
          ""
        )}

        {this.props.match && this.state.ranOnce && project && project.id ? (
          <CreateProject
            project={project}
            handleUpdate={this.handleUpdate}
            projectId={project.id}
            updateObject={true}
          />
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
    updateProject: (project) => dispatch(fetchUpdateProject(project)),
    clearProject: () => dispatch(clearProject()),
    unassignRobot: (projectId, robotId) =>
      dispatch(fetchUnassignRobot(projectId, robotId)),
  };
};

export default connect(mapState, mapDispatch)(SingleProject);
