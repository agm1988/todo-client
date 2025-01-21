import React, { createContext, useState, useContext } from "react"

const QueryContext = createContext()

export const QueryProvider = ({ children }) => {
  const [query, setQuery] = useState('')
  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      {children}
    </QueryContext.Provider>
  );
};

export const useQuery = () => useContext(QueryContext);
