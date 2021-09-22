import React, { createContext, useContext, useState } from 'react';

export const MainContext = createContext();
export const SecondContext = createContext();

function Provider({children}) {
  const contextValue = {
    state,
  }
  return (
    <MainContext.Provider value={ contextValue }>
      {children}
    </MainContext.Provider>
  )
}

export default Provider;
