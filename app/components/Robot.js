import React from "react";
import { SingleMessage } from "./SingleMessage";
import { Link } from "react-router-dom";


export const Robot = (props) => {
  const { robot } = props.robot ? props : { robot: {} };
  const { ranOnce } = props;

  const { deleteRobot } = props.deleteRobot ? props : { deleteRobot: () => {} };

  return (
    <div className="single-robot-clear">
      {!ranOnce ? (
        <SingleMessage
          message={{
            title: "Loading...",
            imageUrl: "/images/preloading.gif",
            header: "Fetching Robot.",
          }}
        />
      ) : robot && robot.id ? (
          <div className="single-robot">
            <div>
              <div className="robot-settings-data">
                {props.match ? (
                  ""
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      deleteRobot(robot.id);
                    }}
                    className="robot-delete-button"
                  >
                    X
                  </button>
                )}
              </div>
              <div className="robot-bio-data">
                <div className="robot-avatar">
                  {" "}
                  <img className="avatar" src={robot.imageUrl} />
                </div>
                <div className="robot-name">
                  <Link to={`/robots/${robot.id}`}>{robot.name}</Link>{" "}
                </div>
              </div>
              <div className="robot-details">

              <div className="robot-detail">
                  <strong>ID:</strong> {robot.id}
                </div>
                <div className="robot-detail">
                <div className="robot-fuelLevel">
                <strong>Fuel Level:</strong> {robot.fuelLevel}
                </div>
                <div className="robot-fuelType">
                <strong>Fuel Type:</strong> {robot.fuelType}
                </div>
                </div>
              </div>
            </div>
          </div>

      ) : (
        <div>
          <h4>Robot Not Found</h4>
        </div>
      )}
    </div>
  );
};
