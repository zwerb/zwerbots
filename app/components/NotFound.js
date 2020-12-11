import React from "react";
import { Link } from "react-router-dom";

export const NotFound = (props) => {
  const { match, history } = props || [];
  console.log("not found props:", props);

  const message = {
    title: "404 Not Found",
    content: [
      `The route you were looking for:`,
      `${history ? history : "undefined"}`,
      `was not found.`,
    ],
  };

  return (
    <div className="all-items">
      <SingleMessage match history message />
    </div>
  );
};
