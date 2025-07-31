import { Grid, Typography } from "@mui/material";
import type { IBoulder } from "../../utilities";
import BasicCard from "./BasicCard";

export default function BoulderCardViewer({
  boulders,
  setLatLng,
}: {
  boulders: IBoulder[] | undefined;
  setLatLng: any;
}) {
  return (
    <>
      <Typography variant="h5" pb={2}>
        Boulders creati: {boulders?.length}
      </Typography>
      <Grid container spacing={2}>
        {boulders?.map((boulder, idx) => (
          <Grid size={4} key={idx}>
            <BasicCard boulder={boulder} setLatLng={setLatLng} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
