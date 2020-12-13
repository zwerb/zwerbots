/* eslint-disable complexity */
import React from "react";
import { SingleRobot } from "./SingleRobot";
import { SingleMessage } from "./SingleMessage";

export const RobotsList = (props) => {
  
  // Gratuitous deconstructed type checking:
  const { robots } = props.robots ? props : { robots: [] };
  const { ranOnce } = props;

  const { sortBy } = props.sortBy ? props : { sortBy: "id" };
  const { sortDesc } = props.sortDesc ? props : { sortDesc: false };

  const { filterBy } = props.sortBy ? props : { sortBy: "id" };
  const { filterParam } = props.sortDesc ? props : { sortDesc: false };

  const robotsDisplay = robots
    ? robots.sort((a, b) =>
        sortDesc ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy]
      )
    : [];

  console.log("sortBy, sortDesc", sortBy, sortDesc);
  console.log(robotsDisplay.map((robot) => robot.id));
  // sort(
  //   (a, b) =>
  //     Number(Date.parse(b.createdAt)) - Number(Date.parse(a.createdAt))
  // ):[];

  return (
    <div className="all-robots">
      {console.log("props: ", props)}
      {!ranOnce ? (
        <SingleMessage
          message={{
            title: "Loading...",
            imageUrl: "/images/preloading.gif",
            header: "Fetching robots.",
          }}
        />
      ) : robots && robots.length > 0 ? (
        robotsDisplay.map((robot) => (
          <SingleRobot key={robot.id} robot={robot} />
        ))
      ) : (
        <p>No Robots!</p>
      )}
    </div>
  );
};
