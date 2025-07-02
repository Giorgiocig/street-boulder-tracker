import { Box } from "@mui/material";
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
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
      {boulders?.map((boulder, idx) => (
        <BasicCard boulder={boulder} setLatLng={setLatLng} key={idx} />
      ))}
    </Box>
  );
}
