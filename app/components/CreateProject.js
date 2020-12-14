import React, { Component } from "react";
import RobotForm from "./RobotForm";
import { fetchAddProject, clearProject, fetchUpdateProject } from "../redux/singleProject";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleHidden = this.toggleHidden.bind(this);
  }

  componentDidMount(event) {

    const { project } = this.props.project
      ? {
          project: {
            id: this.props.project.id,
            title: this.props.project.title,
            description: this.props.project.description,
            priority: this.props.project.priority,
          },
        }
      : {
          project: {
            id: -1,
            title: "Fetch Images",
            description: "Not a hard task.",
            priority: 5,
          },
        };

    const formObject = project;

    const formDetails = this.props.updateObject
      ? {
          title: "Update Project",
          hidden: true,
        }
      : {
          title: "Add a Project",
          hidden: true,
        };

    this.setState({
      project: project,
      formDetails: formDetails,
      formObject: formObject  
    });
  }

  toggleHidden() {
    this.setState({
      formDetails: {
        ...this.state.formDetails,
        hidden: !this.state.formDetails.hidden,
      },
    });
  }

  onChange(event) {
    this.setState({
      formState: {
        ...this.state.formState,
        [event.target.name]: event.target.value,
      },
    });
  }

  async onSubmit(event) {
    this.setState({
      formDetails: { ...this.state.formDetails, error: null, success: null },
    });
    try {
      event.preventDefault();

      const projectToCreateUpdate = this.props.updateObject
      ? {
          id: this.props.project.id,
          ...this.state.formState,
        }
      : {
          ...this.state.formState,
        };


      const response = this.props.updateObject
        ? await this.props.updateProject(projectToCreateUpdate)
        : await this.props.addProject(projectToCreateUpdate);

      
      if (response.status && response.status > 202) {
        this.setState({
          formDetails: { ...this.state.formDetails, error: response.data },
        });
      } else {
        const newState = Object.keys(this.state.formState).reduce(
          (newState, key) => {
            newState[key] = "";
            return newState;
          },
          {}
        );

        const newProject = response;

        this.setState({
          formState: { },
          formDetails: {
            ...this.state.formDetails,
            success: [
              <span>
 {`Successfully ${this.props.updateObject?'updated':'created'} Project: `}
                <Link to={`/projects/${newProject.id}`}>
                  {newProject.title}
                </Link>
              </span>,
            ],
          },
        });
        if (this.props.updateLocalList) {
          this.props.updateLocalList(newProject);
        }else{
          this.props.handleUpdate(newProject);
        }



      }
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { project } = this.state.formObject && this.state.formObject.id
      ? this.state
      : {
          project: {
            id: -1,
            title: "Fetch Images",
            description: "Not a hard task.",
          },
        };

    const formProject = this.state.formObject ? this.state.formObject : project;

    const { formDetails } = this.state.formDetails
      ? this.state
      : {
          formDetails: {
            title: "Add a Project",
          },
        };

    return (
      <div className="robot-form">
        <RobotForm
          onChange={this.onChange ? this.onChange : () => {}}
          onSubmit={this.onSubmit ? this.onSubmit : () => {}}
          toggleHidden={this.toggleHidden}
          formDetails={formDetails}
          state={this.state.formState ? this.state.formState : {}}
          formObject={formProject}
          updateObject={this.props.updateObject}
        />
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    addProject: (project) => dispatch(fetchAddProject(project)),
    clearProject: () => dispatch(clearProject()),
    updateProject: (project) => dispatch(fetchUpdateProject(project)),
  };
};

export default connect(null, mapDispatch)(CreateProject);
