import React from "react";

interface Project {
  id: number;
  name: string;
  description?: string;
}

interface Props {
  projects: Project[];
}

const ProjectListItems: React.FC<Props> = ({ projects }) => {
  if (projects.length === 0) {
    return <span>No projects available.</span>;
  }

  return (
    <>
      {projects.map((project) => (
        <div
          key={project.id}
          className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {project.name}
          </h5>
          {project.description && (
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {project.description}
            </p>
          )}
        </div>
      ))}
    </>
  );
};

export default ProjectListItems;
