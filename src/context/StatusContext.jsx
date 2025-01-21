import React, { createContext, useState, useContext } from "react"

const StatusContext = createContext()

export const StatusProvider = ({ children }) => {
  const [status, setStatus] = useState('')
  return (
    <StatusContext.Provider value={{ status, setStatus }}>
      {children}
    </StatusContext.Provider>
  );
};

export const useStatus = () => useContext(StatusContext);
