import React, { Component } from "react";
import RobotForm from "./RobotForm";
import { fetchAddRobot, clearRobot } from "../redux/singleRobot";
import { connect } from "react-redux";

export class CreateRobot extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(event) {
    this.setState({
      formDetails: {
        title: "Add a Robot",
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
      formDetails: { ...this.state.formDetails, error: null },
    });
    try {
      event.preventDefault();
      console.log("Just submitted:", this.state.formState);
      // const res = await axios.post("/api/robots",this.state);
      const response = await this.props.addRobot(this.state.formState);
      if (response) {
        console.log("Need to put a user-indicator here", response);
        this.setState({
          formDetails: { ...this.state.formDetails, error: response },
        });
      } else {
        const newState = Object.keys(this.state.formState).reduce(
          (newState, key) => {
            newState[key] = "";
            return newState;
          },
          {}
        );
        this.setState({ formState: { ...newState } });
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
      <div className="all-robots">
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

const mapDispatch = (dispatch) => {
  return {
    addRobot: (robot) => dispatch(fetchAddRobot(robot)),
    clearRobot: () => dispatch(clearRobot()),
  };
};

export default connect(null, mapDispatch)(CreateRobot);
