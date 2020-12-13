/* eslint-disable complexity */
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRobot, clearRobot } from "../redux/singleRobot";
import { SingleMessage } from "./SingleMessage";
import { Robot } from './Robot'

export class SingleRobot extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ranOnce: false };
  }

  async componentDidMount() {
    const { robot } = this.props;
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

    this.setState({ ...this.state, ranOnce: true });
  }

  componentWillUnmount() {
    if (this.props.match) {
      this.props.clearRobot();
    }
  }

  render() {
    const { robot } = this.props;
    const projects =
      robot && robot.projects
        ? robot.projects.map((project) => (
            <Link key={project.id} to={`/projects/${project.id}`}>
              {project.id}: {project.title}
            </Link>
          ))
        : [];
    const message =
      robot && projects && projects.length > 0
        ? {
            title: "Projects",
            header: `Assigned to ${robot.name}:`,
            content: projects,
          }
        : { title: "Projects", header: `None Found for: ${robot.name}` };

    const { ranOnce } = this.state;
    return (
      <div>
        <Robot robot={robot} ranOnce={ranOnce} />
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
    robot: state.robot,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getRobot: (robotId) => dispatch(fetchRobot(robotId)),
    clearRobot: () => dispatch(clearRobot()),
  };
};

export default connect(mapState, mapDispatch)(SingleRobot);
