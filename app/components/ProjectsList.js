import React from "react";
import { SingleProject } from "./SingleProject";
import { SingleMessage } from "./SingleMessage";

export const ProjectsList = (props) => {
  const { projects } = props.projects ? props : { projects: [] };
  const { ranOnce } = props;

  const { sortBy } = props.sortBy ? props : { sortBy: "updatedAt" };
  const { sortDesc } = props.sortDesc ? props : { sortDesc: true };

  // Sort the Robots List
  const sortedProjects = projects
    ? projects.sort((a, b) => {
        if (sortBy.includes("createdAt") || sortBy.includes("updatedAt")) {
          return sortDesc
            ? Number(Date.parse(b[sortBy])) - Number(Date.parse(a[sortBy]))
            : Number(Date.parse(a[sortBy])) - Number(Date.parse(b[sortBy]));
        } else {
          return sortDesc ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy];
        }
      })
    : [];

  const projectsDisplay = sortedProjects;

  return (
    <div className="all-projects">
      {!ranOnce ? (
        <SingleMessage
          message={{
            title: "Loading...",
            imageUrl: "/images/preloading.gif",
            header: "Fetching projects.",
          }}
        />
      ) : projectsDisplay && projectsDisplay.length > 0 ? (
        projectsDisplay.map((project) => {
          return (
            <SingleProject
              key={project.id}
              project={project}
              removeFromLocalList={
              props.removeFromLocalList ? props.removeFromLocalList : () => {}}
              deleteProject={props.deleteProject ? props.deleteProject : () => {}}
            />
          );
        })
      ) : (
        <p>No Projects!</p>
      )}
    </div>
  );
};
