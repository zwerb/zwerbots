import React, { Component } from "react";
import RobotForm from "./RobotForm";
import { fetchAddProject, clearProject } from "../redux/singleProject";
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
    this.setState({
      formDetails: {
        title: "Add a Project",
        hidden: true,
      },
    });
  }

  toggleHidden(){
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
      // const res = await axios.post("/api/robots",this.state);
      const response = await this.props.addProject(this.state.formState);
      if (response.status && response.status > 201) {
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
          formState: { ...newState },
          formDetails: {
            ...this.state.formDetails,
            success: [
              <span>
                {`Successfully created Project: `}
                <Link to={`/projects/${newProject.id}`}>{newProject.title}</Link>
              </span>,
            ],
          },
        });
        if (this.props.updateLocalList) {
          this.props.updateLocalList(newProject);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  render() {

    const { project } = this.props.project ? this.props : {
      project: {
        id: -1,
        title: "Fetch Images",
        description: "Not a hard task."
      },
    };
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
          onChange={
            this.onChange
              ? this.onChange
              : () => {
                }
          }
          onSubmit={
            this.onSubmit
              ? this.onSubmit
              : () => {
                }
          }
          toggleHidden={this.toggleHidden}
          formDetails={formDetails}
          state={this.state.formState ? this.state.formState : {}}
          formObject={project}
        />
      </div>
    );
  }
}

// !REPLACE - will need this for update robot
// const mapState = (state) => {
//   return {
//     robot: state.robot,
//   };
// };

const mapDispatch = (dispatch) => {
  return {
    addProject: (project) => dispatch(fetchAddProject(project)),
    clearProject: () => dispatch(clearProject()),
  };
};

export default connect(null, mapDispatch)(CreateProject);
