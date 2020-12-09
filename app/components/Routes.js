import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Navbar";
import AllRobots from './AllRobots';

const Routes = () => {
  return (
    <Router>
      <div>
        <nav>
          <Navbar />
        </nav>
        <main>
          <h1>
            Welcome to StackBot Project Management: your robot employees are
            awaiting assignments!
          </h1>
          <Route exact path='/' render={()=>(<div><p>This seems like a nice place to get started with some Routes!</p></div>)} />
          <Route exact path='/robots' render={()=>(<div><AllRobots /></div>)} />
        </main>
      </div>
    </Router>
  );
};

export default Routes;
