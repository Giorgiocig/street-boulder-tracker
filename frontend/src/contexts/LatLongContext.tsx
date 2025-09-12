import { createContext, useState, type ReactNode } from "react";

type LatLong = [number, number] | null;

type LatLongContextType = {
  latLongCtx: [number, number] | null;
  setLatLongCtx: (latLong: LatLong) => void;
};

export const LatLongContext = createContext<LatLongContextType | undefined>(
  undefined
);

export const LatLongProvider = ({ children }: { children: ReactNode }) => {
  const [latLongCtx, setLatLongCtx] = useState<LatLong>(null);

  return (
    <LatLongContext.Provider value={{ latLongCtx, setLatLongCtx }}>
      {children}
    </LatLongContext.Provider>
  );
};
