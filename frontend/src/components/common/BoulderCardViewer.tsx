import { Box } from "@mui/material";
import type { IBoulder } from "../../utilities";
import BasicCard from "./BasicCard";

export default function BoulderCardViewer({
  boulders,
}: {
  boulders: IBoulder[] | undefined;
}) {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
      {boulders?.map((boulder) => (
        <BasicCard boulder={boulder} />
      ))}
    </Box>
  );
}
