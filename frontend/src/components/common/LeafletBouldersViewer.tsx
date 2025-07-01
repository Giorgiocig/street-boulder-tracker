import { Box, Typography } from "@mui/material";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useGetBoulders } from "../../services";

import { getDivIcon } from "../../utilities/constants/helpers";
import { COLOR_MAP, type IBoulder } from "../../utilities";

export default function LeafletBouldersViewer() {
  const response = useGetBoulders();

  const boulders = response.data;

  const lastBoulder = boulders && boulders.slice(-1)[0];
  if (!lastBoulder) return <Typography>Caricamento mppa...</Typography>;

  return (
    <Box style={{ height: "400px", width: "100%", marginTop: "2rem" }}>
      <MapContainer
        center={[lastBoulder.latitude, lastBoulder.longitude]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
          attribution='Tiles &copy; <a href="https://www.esri.com/">Esri</a>'
          subdomains={["a", "b", "c", "d"]}
          maxZoom={19}
        />
        {boulders &&
          boulders.map((boulder: IBoulder, idx) => (
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
        {/* <RecenterMap latLong={latLong} /> */}
      </MapContainer>
    </Box>
  );
}
