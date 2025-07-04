import { Grid } from "@mui/material";
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
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 4 }}>
        <LeafletBouldersViewer boulders={boulders} latLng={latLng} />
      </Grid>
      <Grid size={{ xs: 12, md: 8 }} sx={{ marginTop: "2rem" }}>
        <BoulderCardViewer boulders={boulders} setLatLng={setLatLng} />
      </Grid>
    </Grid>
  );
}
