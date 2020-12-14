import React from "react";
import { connect } from "react-redux";
import { fetchRobots } from "../redux/robots";
import SingleRobot from "./SingleRobot";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { RobotsList } from "./RobotsList";
import CreateRobot from "./CreateRobot";
import robotsSeed from "../../robots-seed";

export class AllRobots extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ranOnce: false };
    this.updateLocalList = this.updateLocalList.bind(this);
    this.removeFromLocalList = this.removeFromLocalList.bind(this);
  }

  async componentDidMount() {
    await this.props.getRobots();
    const { robots } = this.props.robots ? this.props : [];
    this.setState({
      robots: robots,
      ranOnce: true,
    });
  }

  updateLocalList(robot) {
    this.setState({
      ...this.state,
      robots: [...this.state.robots, robot],
    });
  }

  removeFromLocalList(robotId) {
    const newList = this.state.robots.filter((robot) => robot.id != robotId);
    this.setState({
      ...this.state,
      robots: [...newList],
    });
  }

  render() {
    const { robots } = this.state.robots ? this.state : [];
    return (
      <div className="robots-section">
        <h4>Robots</h4>

        <div className="robots-content-container">
          <RobotsList
            robots={robots ? robots : []}
            ranOnce={this.state.ranOnce}
            removeFromLocalList={this.removeFromLocalList}
          />
          <CreateRobot updateLocalList={this.updateLocalList} />
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    robots: state.robots,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getRobots: () => dispatch(fetchRobots()),
  };
};

export default connect(mapState, mapDispatch)(AllRobots);
