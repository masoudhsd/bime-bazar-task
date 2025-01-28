"use client";

import React, {
  createContext,
  useReducer,
  useContext,
  PropsWithChildren,
} from "react";
import useFormReducer from "@/app/insurance-details/hooks/useFormReducer";
import { Action, HomePageFormState } from "@/constants/types";

interface GlobalContextType {
  state: HomePageFormState;
  dispatch: React.Dispatch<Action>;
}

const GlobalStateContext = createContext<GlobalContextType | undefined>(
  undefined
);

// 2) Build a provider
export function InsuranceDetailsContext({ children }: PropsWithChildren) {
  const { initialState, inputReducer } = useFormReducer();
  const [state, dispatch] = useReducer(inputReducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error(
      "useGlobalState must be used within a InsuranceDetailsContext"
    );
  }
  return context;
}
