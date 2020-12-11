import React from "react";
import { SingleProject } from "./SingleProject";

export const ProjectsList = (props) => {
  const { projects } = props || [];

  return (
    <div className="all-projects">
      <h4>Projects</h4>
      {console.log('projects list props',props)}
      {projects && projects.length > 0 ? (
        projects.map((project) => {
          return <SingleProject key={project.id} project={project} />
        })
      ) : (
        <p>No Projects</p>
      )}
    </div>
  );
};
