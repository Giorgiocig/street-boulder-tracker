import L from "leaflet";
import { COLOR_MAP } from "../constants/constants";

export const getMarkerIcon = (difficulty: "facile" | "medio" | "difficile") => {
  return new L.Icon({
    iconUrl: `/leafletIcons/marker-icon-${COLOR_MAP[difficulty]}.svg`,
    shadowUrl: "/icons/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

export const getDivIcon = (color: "green" | "red" | "orange") =>
  L.divIcon({
    className: "custom-div-icon",
    html: `
      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 0C5.6 0 0 7 0 15.6c0 10.4 12.5 25.4 12.5 25.4s12.5-15 12.5-25.4C25 7 19.4 0 12.5 0z" fill="${color}"/>
        <circle cx="12.5" cy="15.6" r="5" fill="white"/>
      </svg>
    `,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
