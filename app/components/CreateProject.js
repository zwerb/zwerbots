import React, { Component } from "react";
import RobotForm from "./RobotForm";
import { fetchAddRobot, clearRobot } from "../redux/singleRobot";
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
        title: "Add a Robot",
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
      console.log("Just submitted:", this.state.formState);
      // const res = await axios.post("/api/robots",this.state);
      const response = await this.props.addRobot(this.state.formState);
      if (response.status && response.status > 201) {
        console.log("Need to put a user-indicator here", response);
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

        const newRobot = response;

        this.setState({
          formState: { ...newState },
          formDetails: {
            ...this.state.formDetails,
            success: [
              <span>
                {`Successfully created Robot: `}
                <Link to={`/robots/${newRobot.id}`}>{newRobot.name}</Link>
              </span>,
            ],
          },
        });
        if (this.props.updateLocalList) {
          this.props.updateLocalList(newRobot);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { robot } = this.props.robot ? this.props : {};
    const { formDetails } = this.state.formDetails
      ? this.state
      : {
          formDetails: {
            title: "Add a Robot",
          },
        };
    return (
      <div className="robot-form">
        {console.log("createrobot props:", this.props)}
        {console.log("createrobot state:", this.state)}
        <RobotForm
          onChange={
            this.onChange
              ? this.onChange
              : () => {
                  console.log("onChange");
                }
          }
          onSubmit={
            this.onSubmit
              ? this.onSubmit
              : () => {
                  console.log("onSubmit");
                }
          }
          toggleHidden={this.toggleHidden}
          formDetails={formDetails}
          state={this.state.formState ? this.state.formState : {}}
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

// const mapDispatch = (dispatch) => {
//   return {
//     addProject: (project) => dispatch(fetchAddProject(project)),
//     clearProject: () => dispatch(clearProject()),
//   };
// };

export default connect(null, mapDispatch)(CreateProject);
