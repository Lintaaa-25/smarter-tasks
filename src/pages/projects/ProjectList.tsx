import React, { useEffect } from 'react';
import { fetchProjects } from '../../context/projects/actions';
import { useProjectsDispatch, useProjectsState } from '../../context/projects/context';
import ProjectListItems from './ProjectListItems';

const ProjectList: React.FC = () => {
  const dispatch = useProjectsDispatch();
  const { projects, isLoading, isError, errorMessage } = useProjectsState();

  useEffect(() => {
    fetchProjects(dispatch);
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div className="text-red-600">Error: {errorMessage}</div>;

  return (
    <div className="grid gap-4 grid-cols-4 mt-5">
      <ProjectListItems projects={projects} />
    </div>
  );
};

export default ProjectList;
