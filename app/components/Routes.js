import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import AllRobots from "./AllRobots";
import AllProjects from "./AllProjects";
import SingleRobot from "./SingleRobot";
import SingleProject from "./SingleProject";
import { NotFound } from "./NotFound";
import { SingleMessage } from "./SingleMessage";


const Routes = () => {

  const formDetails = {
    title: 'Add a Robot',
  }

  return (
    <Router>
      <div>
        <nav>
          {/* <Route
            path="/"
            render={(routeProps) => (
              <div>
                <Navbar {...routeProps} />
              </div>
            )}
          /> */}
          <Navbar />
        </nav>
        <main>
          <h1>Zwerbots</h1>
          <Switch>
            <Route
              exact
              path="/"
              render={(routeProps) => {
                const message = {
                  title: "Welcome!",
                  header: "To my Robot JPFP!",
                  content: [<a href="/robots">Robots</a>,<a href="/projects">Projects</a>],
                };
                return <SingleMessage {...routeProps} message={message} />;
              }}
            />
            {/* <Route
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
                  <div className="robot-welcome">
                    <p>Welcome to my Robot JPFP!</p>
                    <p style={{ textAlign: "center" }}>
                      <span>
                        <Link to="/robots">Robots</Link>
                      </span>{" "}
                      |{" "}
                      <span>
                        <Link to="/projects">Projects</Link>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          /> */}
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
              exact
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
              exact
              path="/projects/:projectId"
              render={(routeProps) => (
                <div>
                  <SingleProject {...routeProps} />
                </div>
              )}
            />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default Routes;
