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
  return (
    <Router>
      <div>
        <nav>
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
                  content: [
                    <a href="/robots">Robots</a>,
                    <a href="/projects">Projects</a>,
                  ],
                };
                return <SingleMessage {...routeProps} message={message} />;
              }}
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
