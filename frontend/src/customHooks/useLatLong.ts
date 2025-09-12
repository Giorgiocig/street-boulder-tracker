import { useContext } from "react";
import { LatLongContext } from "../contexts";

export const useLatLong = () => {
  const context = useContext(LatLongContext);
  if (!context) {
    throw new Error("useLatLong deve essere usato dentro un LatLongProvider");
  }
  return context;
};
