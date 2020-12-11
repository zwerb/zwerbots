import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Navbar";
import AllRobots from "./AllRobots";
import AllProjects from "./AllProjects";
import SingleRobot from "./SingleRobot";
import SingleProject from "./SingleProject";

const Routes = () => {
  return (
    <Router>
      <div>
        <nav>
          <Route
            path="/"
            render={(routeProps) => (
              <div>
                <Navbar {...routeProps} />
              </div>
            )}
          />
        </nav>
        <main>
          <h1>Zwerbots</h1>
          <Route
            exact
            path="/"
            render={() => (
              <div className="single-robot">
                <div className="robot-bio-data">
                  <div className="robot-avatar">
                    <img
                      className="avatar"
                      src="images/robots/Robot_Avatars_50.png"
                    />
                  </div>
                  <div className="robot-name">Hello!</div>
                </div>
                <div className="robot-details">
                  <div className="robot-welcome">Welcome to my Robot JPFP!</div>
                </div>
              </div>
            )}
          />
          <Route
            exact
            path="/robots"
            render={(routeProps) => (
              <div>
                <AllRobots {...routeProps} />
              </div>
            )}
          />
          <Route
            path="/robots/:robotId"
            render={(routeProps) => (
              <div>
                <SingleRobot {...routeProps} />
              </div>
            )}
          />
          <Route
            exact
            path="/projects"
            render={(routeProps) => (
              <div>
                <AllProjects {...routeProps} />
              </div>
            )}
          />
          <Route
            path="/projects/:projectId"
            render={(routeProps) => (
              <div>
                <SingleProject {...routeProps} />
              </div>
            )}
          />
        </main>
      </div>
    </Router>
  );
};

export default Routes;
