import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { RecenterMap } from "./RecenterMap";
import type { ILeafletMapViewerProps } from "../../utilities/interfaces";
import { Box } from "@mui/material";

export default function LeafletMapViewer({
  latLong,
  setValue,
  name,
}: ILeafletMapViewerProps) {
  if (!latLong) {
    latLong = [41.9028, 12.4964];
  }

  const onDragEnd = (event: any) => {
    const marker = event.target;
    const latLng = marker.getLatLng();
    setValue("latitude", latLng.lat);
    setValue("longitude", latLng.lng);
  };

  return (
    <Box style={{ height: "400px", width: "100%", marginTop: "2rem" }}>
      <MapContainer
        center={latLong}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
          attribution='Tiles &copy; <a href="https://www.esri.com/">Esri</a>'
          subdomains={["a", "b", "c", "d"]}
          maxZoom={19}
        />
        <Marker
          position={latLong}
          draggable={true}
          eventHandlers={{ dragend: onDragEnd }}
        >
          <Popup>{name}</Popup>
        </Marker>
        <RecenterMap latLong={latLong} />
      </MapContainer>
    </Box>
  );
}
