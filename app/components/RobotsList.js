/* eslint-disable complexity */
import React from "react";
import SingleRobot from "./SingleRobot";
import { SingleMessage } from "./SingleMessage";

export const RobotsList = (props) => {
  // Gratuitous deconstructed type checking:
  const { robots } = props.robots ? props : { robots: [] };

  const { ranOnce } = props;

  const { sortBy } = props.sortBy ? props : { sortBy: "updatedAt" };
  const { sortDesc } = props.sortDesc ? props : { sortDesc: true };

  // TODO: Some intricate filtering that needs to be pulled out as am import
  const { filterFields } = props.filterFields
    ? props
    : { filterFields: ["id"] };
  // should be only ==, includes, <, >, !=
  const { filterOperators } = props.filterOperators
    ? props
    : { filterOperators: ["lessThan"] };
  // What should the filter match or be greater than, e.g.?
  const { filterOperands } = props.filterOperands
    ? props
    : { filterOperands: ["default"] };

  const equals = (a, b) => {
    return a == b;
  };

  const lessThan = (a, b) => {
    return a < b;
  };

  const operators = { equals, lessThan };

  // run all of the filters you have
  const runFilters = () => {
    let tmpRobots = robots;
    filterFields.forEach((field, filterIndex) => {
      tmpRobots = tmpRobots.filter((robot) => {
        return operators[filterOperators[filterIndex]](
          robot[filterFields[filterIndex]],
          filterOperands[filterIndex]
        );
      });
    });
    return tmpRobots;
  };
  // Filter the Robots List
  const filteredRobots =
    robots && filterOperands[0] && filterOperands[0] != "default"
      ? runFilters()
      : robots;

  // Sort the Robots List
  const sortedRobots = filteredRobots
    ? filteredRobots.sort((a, b) => {
        if (sortBy.includes("createdAt") || sortBy.includes("updatedAt")) {
          return sortDesc
            ? Number(Date.parse(b[sortBy])) - Number(Date.parse(a[sortBy]))
            : Number(Date.parse(a[sortBy])) - Number(Date.parse(b[sortBy]));
        } else {
          return sortDesc ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy];
        }
      })
    : filteredRobots;

  const robotsDisplay = sortedRobots;

  return (
    <div className="all-robots">
      {!ranOnce ? (
        <SingleMessage
          message={{
            title: "Loading...",
            imageUrl: "/images/preloading.gif",
            header: "Fetching robots.",
          }}
        />
      ) : robotsDisplay.length > 0 ? (
        robotsDisplay.map((robot) => {
          return (
          <SingleRobot
            key={robot.id}
            robot={robot}
            removeFromLocalList={
              props.removeFromLocalList ? props.removeFromLocalList : () => {}
            }
          />
        )
          }
        )
      ) : (
        <p>No Robots!</p>
      )}
    </div>
  );
};
