import React, { createContext } from "react";

interface IHandlerContext {
  addFakeDataToCache: () => void;
}

const defaultState = {
  addFakeDataToCache: () => {},
};

const HandlerContext = createContext<IHandlerContext>(defaultState);

interface IHandlerProvider {
  children?: any;
}

const HandlerProvider: React.FC<IHandlerProvider> = ({ children }) => {
  const addFakeDataToCache = () => {
    console.log("Implementetion...");
  };

  return (
    <HandlerContext.Provider
      value={{
        addFakeDataToCache,
      }}
    >
      {children}
    </HandlerContext.Provider>
  );
};

export { HandlerContext, HandlerProvider };
