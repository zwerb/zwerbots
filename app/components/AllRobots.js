import React from "react";
import { connect } from "react-redux";
import { fetchRobots } from "../redux/robots";
import SingleRobot from "./SingleRobot";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { RobotsList } from "./RobotsList";

export class AllRobots extends React.Component {
  async componentDidMount() {
    await this.props.getRobots();
  }

  render() {
    const { robots } = this.props || [];
    // const { match } = this.props || {};
    return (
      <div className="robots-section">
        <h4>Robots</h4>
        <RobotsList robots={robots || []} />
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
