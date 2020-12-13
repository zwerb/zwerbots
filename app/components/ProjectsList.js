import React from "react";
import { SingleProject } from "./SingleProject";
import { SingleMessage } from "./SingleMessage";

export const ProjectsList = (props) => {
  const { projects } = props.projects ? props : { projects: [] };
  const { ranOnce } = props;

  return (
    <div className="all-projects">
      {console.log("projects list props", props)}
      {!ranOnce ? (
        <SingleMessage
          message={{
            title: "Loading...",
            imageUrl: "/images/preloading.gif",
            header: "Fetching projects.",
          }}
        />
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
