import React from "react";
import { SingleMessage } from "./SingleMessage";
import { Link } from "react-router-dom";

export const Robot = (props) => {
  const { robot } = props.robot ? props : {};
  const { ranOnce } = props;

  return (
    <div>
      {!ranOnce ? (
        <SingleMessage
          message={{
            title: "Loading...",
            imageUrl: "images/preloading.gif",
            header: "Fetching Robot.",
          }}
        />
      ) : robot && robot.id ? (
        <div className="single-robot">
          <div>
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
              <div className="robot-fuelLevel">
                Fuel Level {robot.fuelLevel}
              </div>
              <div className="robot-fuelType">Fuel Type: {robot.fuelType}</div>
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
