import React from "react";
import { SingleRobot } from "./SingleRobot";

export const RobotsList = (props) => {
  const { robots } = props || [];

  return (
      <div className="all-robots">
        {console.log('props: ',props)}
        {robots && robots.length > 0 ? (
          robots.map((robot) => <SingleRobot key={robot.id} robot={robot} />)
        ) : (
          <p>No Robots</p>
        )}
      </div>
  );
};
