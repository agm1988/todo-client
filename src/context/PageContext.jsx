import React, { createContext, useState, useContext } from "react"

const PageContext = createContext()

export const PageProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  return (
    <PageContext.Provider value={{ page, setPage }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePage = () => useContext(PageContext);
