import { useContext } from "react";
import { BoulderContextId } from "../contexts";

export function useBoulderId() {
  const context = useContext(BoulderContextId);
  if (!context) {
    throw new Error("useCurrentBoulder must be used within a BoulderProvider");
  }
  return context;
}
