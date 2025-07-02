import { useEffect } from "react";
import { useMap } from "react-leaflet";

export function RecenterMap({ latLong }: { latLong: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.setView(latLong, 17);
  }, [latLong, map]);

  return null;
}
