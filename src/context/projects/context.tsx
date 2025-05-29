import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState, ProjectsState, ProjectsActions } from "./reducer";

const ProjectsStateContext = createContext<ProjectsState | undefined>(undefined);
type ProjectsDispatch = React.Dispatch<ProjectsActions>;
const ProjectsDispatchContext = createContext<ProjectsDispatch | undefined>(undefined);

export const ProjectsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProjectsStateContext.Provider value={state}>
      <ProjectsDispatchContext.Provider value={dispatch}>
        {children}
      </ProjectsDispatchContext.Provider>
    </ProjectsStateContext.Provider>
  );
};

export const useProjectsState = (): ProjectsState => {
  const context = useContext(ProjectsStateContext);
  if (context === undefined) {
    throw new Error("useProjectsState must be used within a ProjectsProvider");
  }
  return context;
};

export const useProjectsDispatch = (): ProjectsDispatch => {
  const context = useContext(ProjectsDispatchContext);
  if (context === undefined) {
    throw new Error("useProjectsDispatch must be used within a ProjectsProvider");
  }
  return context;
};
