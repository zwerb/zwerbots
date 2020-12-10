import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Navbar";
import AllRobots from "./AllRobots";
import AllProjects from "./AllProjects";

const Routes = () => {
  return (
    <Router>
      <div>
        <nav>
          <Navbar />
        </nav>
        <main>
          <h1>
           Zwerbots
          </h1>
          <Route
            exact
            path="/"
            render={() => (
              <div className="single-robot">
                <div className="robot-bio-data">
                  <div className="robot-avatar">
                    <img className="avatar" src="images/robots/Robot_Avatars_50.png" />
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
            render={() => (
              <div>
                <AllRobots />
              </div>
            )}
          />
          <Route
            exact
            path="/projects"
            render={() => (
              <div>
                <AllProjects />
              </div>
            )}
          />
        </main>
      </div>
    </Router>
  );
};

export default Routes;
