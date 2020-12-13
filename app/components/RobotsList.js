import React from "react";
import { SingleRobot } from "./SingleRobot";
import { SingleMessage } from "./SingleMessage";

export const RobotsList = (props) => {
  const { robots } = props.robots ? props : [];
  const { ranOnce } = props;

  return (
    <div className="all-robots">
      {console.log("props: ", props)}
      {!ranOnce ? (
          <SingleMessage message={{title:"Loading...",imageUrl:"/images/preloading.gif",header:"Fetching robots."}} />
      ) : robots && robots.length > 0 ? (
        robots
          .sort(
            (a, b) =>
              Number(Date.parse(b.createdAt)) - Number(Date.parse(a.createdAt))
          )
          .map((robot) => <SingleRobot key={robot.id} robot={robot} />)
      ) : (
        <p>No Robots!</p>
      )}
    </div>
  );
};
