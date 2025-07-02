import { Box } from "@mui/material";
import { useGetBoulders } from "../../services";
import BoulderCardViewer from "../common/BoulderCardViewer";
import LeafletBouldersViewer from "../common/LeafletBouldersViewer";
import { useState } from "react";

export default function BouldersViewer() {
  const [latLng, setLatLng] = useState<
    [latitude: number, longitude: number] | null
  >(null);

  const response = useGetBoulders();
  const boulders = response.data;

  return (
    <Box sx={{ display: "flex", gap: 4 }}>
      <LeafletBouldersViewer boulders={boulders} latLng={latLng} />
      <BoulderCardViewer boulders={boulders} setLatLng={setLatLng} />
    </Box>
  );
}
