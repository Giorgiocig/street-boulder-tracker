import { Box, Typography } from "@mui/material";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { getDivIcon } from "../../utilities/helpers";
import { COLOR_MAP, DEFAULT_LAT_LONG, type IBoulder } from "../../utilities";
import { RecenterMap } from "./RecenterMap";
import { useLatLong } from "../../customHooks/useLatLong";

export default function LeafletBouldersViewer({
  boulders,
  latLng,
}: {
  boulders: IBoulder[] | undefined;
  latLng: [latitude: number, longitude: number] | null;
}) {
  const { latLongCtx } = useLatLong();
  const lastBoulder = boulders && boulders.slice(-1)[0];
  let coordinateForCentering: [number, number] = lastBoulder
    ? [lastBoulder.latitude, lastBoulder.longitude]
    : latLongCtx ?? DEFAULT_LAT_LONG; // fallback

  return (
    <Box style={{ height: "450px", width: "100%", marginTop: "2rem" }}>
      <MapContainer
        key={coordinateForCentering?.join(",")}
        center={coordinateForCentering}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
          attribution='Tiles &copy; <a href="https://www.esri.com/">Esri</a>'
          subdomains={["a", "b", "c", "d"]}
          maxZoom={19}
        />
        {boulders &&
          boulders.map((boulder: IBoulder, idx: number) => (
            <Marker
              position={[boulder.latitude, boulder.longitude]}
              key={idx}
              icon={getDivIcon(COLOR_MAP[boulder.difficulty])}
            >
              <Popup>
                <Box>
                  <Typography> {boulder.name}</Typography>
                  <Typography> {boulder.description}</Typography>
                </Box>
              </Popup>
            </Marker>
          ))}
        {latLng && <RecenterMap latLong={latLng} />}
      </MapContainer>
    </Box>
  );
}
