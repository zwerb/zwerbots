import React from "react";
import { connect } from "react-redux";
import { fetchRobots } from "../redux/robots";

// !REMOVE - Development Placeholder
const robots = [
  { id: 1, name: "R2-D2", imageUrl: "/images/r2d2.png" },
  { id: 2, name: "WALL-E", imageUrl: "/images/walle.jpeg" },
];

// Notice that we're exporting the AllRobots component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllRobots extends React.Component {
  async componentDidMount() {
    this.props.getRobots();
  }
  render() {
    return (
      <div className="all-robots">
        {this.props.robots && this.props.robots.length > 0 ? (
          this.props.robots.map((robot) => (
            <div key={robot.id} className="single-robot">
              <div className="robot-bio-data">
                <div className="robot-avatar">
                  {" "}
                  <img className="avatar" src={robot.imageUrl} />
                </div>
                <div className="robot-name">{robot.name}</div>
              </div>
              <div className="robot-details">
                <div className="robot-fuelLevel">Fuel Level {robot.fuelLevel}</div>
                <div className="robot-fuelType">Fuel Type: {robot.fuelType}</div>
              </div>
            </div>
          ))
        ) : (
          <p>No Robots</p>
        )}
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
