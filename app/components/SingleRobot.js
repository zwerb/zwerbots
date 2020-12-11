import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRobot, clearRobot } from "../redux/singleRobot";

export class SingleRobot extends React.Component {
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
  }

  componentWillUnmount() {
    if (this.props.match) {
      this.props.clearRobot();
    }
  }

  render() {
    const { robot } = this.props;
    return (
      <div>
        {console.log("Single robot props", this.props)}
        <div className="single-robot">
          {robot && robot.id ? (
            <div>
              <div className="robot-bio-data">
                <div className="robot-avatar">
                  {" "}
                  <img className="avatar" src={robot.imageUrl} />
                </div>
                <div className="robot-name">
                  <Link to={`/robots/${robot.id}`}>{robot.name}</Link>{" "}
                </div>
              </div>
              <div className="robot-details">
                <div className="robot-fuelLevel">
                  Fuel Level {robot.fuelLevel}
                </div>
                <div className="robot-fuelType">
                  Fuel Type: {robot.fuelType}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h4>Robot Not Found</h4>
            </div>
          )}
        </div>
        {this.props.match && this.props.match.params ? (
          <div>
            <div style={{ textAlign: "center" }}>
              <h4>
                <Link to={`/robots`}>Back to Robots</Link>
              </h4>
            </div>
            {robot.projects
              ? <div style={{ textAlign: "left" }}>
              <h4>
                Projects
              </h4>
          
              {robot.projects.map((project) => (
                  <p key={project.id}><Link to={`/projects/${project.id}`}>{project.title}</Link></p>
                ))} </div>
              : ""}
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
