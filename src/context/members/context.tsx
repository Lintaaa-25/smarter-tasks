import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState, MembersState, MembersActions } from "./reducer";

const MembersStateContext = createContext<MembersState | undefined>(undefined);
type MembersDispatch = React.Dispatch<MembersActions>;
const MembersDispatchContext = createContext<MembersDispatch | undefined>(undefined);

export const MembersProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MembersStateContext.Provider value={state}>
      <MembersDispatchContext.Provider value={dispatch}>
        {children}
      </MembersDispatchContext.Provider>
    </MembersStateContext.Provider>
  );
};

export const useMembersState = (): MembersState => {
  const context = useContext(MembersStateContext);
  if (context === undefined) {
    throw new Error("useMembersState must be used within a MembersProvider");
  }
  return context;
};

export const useMembersDispatch = (): MembersDispatch => {
  const context = useContext(MembersDispatchContext);
  if (context === undefined) {
    throw new Error("useMembersDispatch must be used within a MembersProvider");
  }
  return context;
};
