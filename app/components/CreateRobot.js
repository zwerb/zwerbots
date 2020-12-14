import React, { Component } from "react";
import RobotForm from "./RobotForm";
import { fetchAddRobot, clearRobot } from "../redux/singleRobot";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

export class CreateRobot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ranOnce: false,
      formObjectRules: {
        imageUrl: {
          select: [],
        },
        fuelType: {
          select: [],
        },
      },
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleHidden = this.toggleHidden.bind(this);
  }

  async componentDidMount(event) {
    try {
      const response = await axios.get("/api/robots/images");
      const robotImagesList = response.data;

      const defaultImagesList = [
        "/images/robots/Robot_Avatars_10.png",
        "/images/robots/Robot_Avatars_20.png",
        "/images/robots/Robot_Avatars_30.png",
        "/images/robots/Robot_Avatars_40.png",
        "/images/robots/Robot_Avatars_50.png",
      ];

      this.setState({
        ...this.state,
        formDetails: {
          title: "Add a Robot",
          hidden: true,
        },
        formObjectRules: {
          ...this.state.formObjectRules,
          imageUrl: {
            select: robotImagesList ? [...robotImagesList] : [...defaultImagesList],
          },
          fuelType: {
            select: ["gas", "electric", "diesel"],
          },
        },
      });
    } catch (err) {
      console.error(err);
    }
    this.setState({ ...this.state, ranOnce: true });
  }

  toggleHidden() {
    this.setState({
      ...this.state,
      formDetails: {
        ...this.state.formDetails,
        hidden: !this.state.formDetails.hidden,
      },
    });
  }

  onChange(event) {
    this.setState({
      ...this.state,
      formState: {
        ...this.state.formState,
        [event.target.name]: event.target.value,
      },
    });
  }

  async onSubmit(event) {
    this.setState({
      ...this.state,
      formDetails: { ...this.state.formDetails, error: null, success: null },
    });
    try {
      event.preventDefault();
      console.log("Just submitted:", this.state.formState);
      const RobotToCreate = {...this.state.formState, imageUrl: ('/images/robots/'+this.state.formState.imageUrl
      )}
      const response = await this.props.addRobot(RobotToCreate);
      if (response.status && response.status > 201) {
        console.log("Need to put a user-indicator here", response);
        this.setState({
          formDetails: {
            ...this.state,
            ...this.state.formDetails,
            error: response.data,
          },
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
          ...this.state,
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
    const { robot } = this.props.robot
      ? this.props
      : {
          robot: {
            id: -1,
            name: "Slimothy",
            imageUrl: "/images/robots/default.png",
            fuelType: "gas",
            fuelLevel: 88.5,
          },
        };
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
          formObject={robot}
          formObjectRules={this.state.formObjectRules}
        />
      </div>
    );
  }
}

// // !REPLACE - will need this for update robot
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
