import React from "react";
import { SingleRobot } from "./SingleRobot";

export const RobotsList = (props) => {
  const { robots } = props || [];

  return (
      <div className="all-robots">
        {console.log('props: ',props)}
        {robots && robots.length > 0 ? (
          robots.sort((a,b)=>(Number(Date.parse(b.createdAt))-Number(Date.parse(a.createdAt)))).map((robot) => <SingleRobot key={robot.id} robot={robot} />)
        ) : (
          <p>No Robots</p>
        )}
      </div>
  );
};
