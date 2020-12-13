import React from "react";
import { SingleProject } from "./SingleProject";

export const ProjectsList = (props) => {
  const { projects } = props.projects ? props : [];
  const { ranOnce } = props;

  return (
    <div className="all-projects">
      {console.log("projects list props", props)}
      {!ranOnce ? (
        <p>
          {" "}
          <img src="images/preloading.gif" />
          <br /> Loading Projects...
        </p>
      ) : projects && projects.length > 0 ? (
        projects.map((project) => {
          return <SingleProject key={project.id} project={project} />;
        })
      ) : (
        <p>No Projects!</p>
      )}
    </div>
  );
};
