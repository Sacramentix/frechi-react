import { createContext, useMemo, useState } from "react";
import { reset, onNumberClick, onSymbolClick, submitResult, deleteEquation, removeFrom, n, solveEquation, setShowSolution } from "./actions";
import { series, resultToFind, hasWin, equations, calculteds, numbers, solution, showSolution } from "./state";

export const contextState = {
    series,
    resultToFind,
    hasWin,
    equations,
    calculteds,
    numbers,
    solution,
    showSolution
}

export type ContextStateType = typeof contextState;

export const contextActions = {
    reset,
    onNumberClick,
    onSymbolClick,
    submitResult,
    deleteEquation,
    removeFrom,
    n,
    solveEquation,
    setShowSolution
}

export type AppContextType = typeof contextState & {
    setStore: React.Dispatch<React.SetStateAction<typeof contextState>>
    actions: typeof contextActions 
}

export const AppContext = createContext<AppContextType | null>(null);

export const { Provider, Consumer } = AppContext;

export const GlobalProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [store, setStore] = useState(contextState);
  const [ actions, setActions ] = useState(contextActions);
  return <AppContext.Provider value={{...store, setStore, actions}}>{children}</AppContext.Provider>;
};
