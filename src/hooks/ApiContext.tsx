// ApiContext.tsx
import React, { createContext, useContext } from 'react';

interface ApiContextType {
  apiUrl: string;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: React.ReactNode; api: string }> = ({ children, api }) => {
  return (
    <ApiContext.Provider value={{ apiUrl: api }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
