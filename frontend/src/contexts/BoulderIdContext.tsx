import { createContext, useState, type ReactNode } from "react";

type BoulderContextType = {
  boulderIdCtx: number | null;
  setBoulderIdCtx: (id: number) => void;
};

export const BoulderContextId = createContext<BoulderContextType | undefined>(
  undefined
);

export function BoulderIdProvider({ children }: { children: ReactNode }) {
  const [boulderIdCtx, setBoulderIdCtx] = useState<number | null>(null);

  return (
    <BoulderContextId.Provider value={{ boulderIdCtx, setBoulderIdCtx }}>
      {children}
    </BoulderContextId.Provider>
  );
}
