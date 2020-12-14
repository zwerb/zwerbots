/* eslint-disable complexity */
import React, { Component } from "react";
import RobotForm from "./RobotForm";
import { fetchAddRobot, clearRobot, fetchUpdateRobot } from "../redux/singleRobot";
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

      const formDetails = this.props.updateObject
        ? {
            title: "Update Robot",
            hidden: true,
          }
        : {
            title: "Add a Robot",
            hidden: true,
          };

      this.setState({
        ...this.state,
        formDetails,
        formObjectRules: {
          ...this.state.formObjectRules,
          imageUrl: {
            select: robotImagesList
              ? [...robotImagesList]
              : [...defaultImagesList],
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

      const updatedImageUrl = this.state.formState.imageUrl ?  "/images/robots/" + this.state.formState.imageUrl : undefined;

      const RobotToCreate = this.props.updateObject
        ? {
            id: this.props.robot.id,
            ...this.state.formState,
            imageUrl: updatedImageUrl ? updatedImageUrl : this.props.robot.imageUrl
          }
        : {
            ...this.state.formState,
            imageUrl: "/images/robots/" + this.state.formState.imageUrl,
          };

      const response = this.props.updateObject
        ? await this.props.updateRobot(RobotToCreate)
        : await this.props.addRobot(RobotToCreate);

      if (response.status && response.status > 202) {
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
          formState: { },
          formDetails: {
            ...this.state.formDetails,
            success: [
              <span>
                {`Successfully ${this.props.updateObject?'updated':'created'} Robot: `}
                <Link to={`/robots/${newRobot.id}`}>{newRobot.name}</Link>
              </span>,
            ],
          },
        });
        if (this.props.updateLocalList) {
          this.props.updateLocalList(newRobot);
        }else{
          this.props.handleUpdate(newRobot);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const robot = this.props.robot
      ? {
          id: this.props.robot.id,
          name: this.props.robot.name,
          imageUrl: this.props.robot.imageUrl,
          fuelType: this.props.robot.fuelType,
          fuelLevel: this.props.robot.fuelLevel,
        }
      : {
          id: -1,
          name: "Slimothy",
          imageUrl: "/images/robots/default.png",
          fuelType: "gas",
          fuelLevel: 88.5,
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
          formObject={robot}
          formObjectRules={this.state.formObjectRules}
          updateObject={this.props.updateObject}
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
    updateRobot: (robot) => dispatch(fetchUpdateRobot(robot)),
  };
};

export default connect(null, mapDispatch)(CreateRobot);
