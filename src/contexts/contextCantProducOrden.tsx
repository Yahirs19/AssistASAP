"use client"

import React, { createContext, useState, useContext, ReactNode } from "react";

interface CantidadContextType {
    cant: number;
    setCantidad: React.Dispatch<React.SetStateAction<number>>;
  }

const CantidadProductosContext = createContext<CantidadContextType | undefined>(undefined);

export const CantidadProvider: React.FC<{children: ReactNode}> = ({
    children
}) => {
    const [cant, setCantidad] = useState<number>(0);

    return (
        <CantidadProductosContext.Provider value={{cant, setCantidad}}>
            {children}
        </CantidadProductosContext.Provider> 

    )
}


export const useCantidad = (): CantidadContextType => {
    const context = useContext(CantidadProductosContext);
    if (!context) {
      throw new Error("useCantidad must be used within a Provider");
    }
    return context;
  };