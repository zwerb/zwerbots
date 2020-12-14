/* eslint-disable complexity */
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRobot, clearRobot, fetchDeleteRobot } from "../redux/singleRobot";
import { SingleMessage } from "./SingleMessage";
import { Robot } from "./Robot";

export class SingleRobot extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ranOnce: false };
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    const robot = this.props.robot
      ? this.props.robot
      : this.props.storeRobot
      ? this.props.storeRobot
      : {};

    if (
      !robot ||
      !robot.id ||
      (this.props.match && robot.id != this.props.match.params.robotId)
    ) {
      try {
        await this.props.getRobot(this.props.match.params.robotId);
      } catch (err) {
        console.error(err);
      }
    }
    this.setState({ ...this.state, robot: robot, ranOnce: true });
  }

  async handleDelete(robotId) {
    try {
      console.log("trying to delete:", robotId);
      const deleted = await this.props.deleteRobot(robotId);
      console.log("deleted response:", deleted);
      console.log("do we have a removeFromLocalList:", this.props);
      this.props.removeFromLocalList(robotId);

    } catch (err) {
      console.error(err);
    }
  }

  componentWillUnmount() {
    if (this.props.match) {
      this.props.clearRobot();
    }
  }

  render() {
    const robot =
      this.props.robot && this.props.robot.id
        ? this.props.robot
        : this.props.storeRobot && this.props.storeRobot.id
        ? this.props.storeRobot
        : {};

    const projects =
      robot && robot.projects
        ? robot.projects.map((project) => (
            <Link key={project.id} to={`/projects/${project.id}`}>
              {project.id}: {project.title}
            </Link>
          ))
        : [];

    const message =
      robot && robot.id && robot.name && projects && projects.length > 0
        ? {
            title: "Projects",
            header: `Assigned to ${robot.name}:`,
            content: projects,
            imageUrl: "/images/graphics/projects.png",
          }
        : {
            title: "Projects",
            header: `No Projects for: ${robot.name}`,
            imageUrl: "/images/graphics/projects.png",
          };

    const { ranOnce } = this.state;

    return (
      <div>
        <Robot
          deleteRobot={this.handleDelete}
          robot={robot}
          ranOnce={ranOnce}
          removeFromLocalList={
            this.props.removeFromLocalList
              ? this.props.removeFromLocalList
              : () => {}
          }
        />
        {this.props.match && this.props.match.params ? (
          <SingleMessage message={message} />
        ) : (
          ""
        )}
        {this.props.match && this.props.match.params ? (
          <div>
            <div style={{ textAlign: "center" }}>
              <h4>
                <Link to={`/robots`}>Back to Robots</Link>
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
    storeRobot: state.robot,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getRobot: (robotId) => dispatch(fetchRobot(robotId)),
    clearRobot: () => dispatch(clearRobot()),
    deleteRobot: (robotId) => dispatch(fetchDeleteRobot(robotId)),
  };
};

export default connect(mapState, mapDispatch)(SingleRobot);
