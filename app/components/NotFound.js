import React from "react";
import { Link } from "react-router-dom";
import { SingleMessage } from "./SingleMessage";

export const NotFound = (props) => {
  const { match, history } = props;

  const triedPath = location ? location.pathname : "unknown";
  const previousPath =
    history && history.location ? history.location.pathname : "unknown";

  const message = {
    title: "404 Not Found",
    content: [
      `The route you were looking for:`,
      triedPath,
      `was not found.`,
      <Link to={previousPath}>Back to Previous</Link>,
      <Link to="/">Back to Home</Link>,
    ],
  };

  return (
    <div className="all-items">
      <SingleMessage match history message={message} />
    </div>
  );
};
