import { Box } from "@mui/material";
import { useGetBoulders } from "../../services";
import BoulderCardViewer from "../common/BoulderCardViewer";
import LeafletBouldersViewer from "../common/LeafletBouldersViewer";

export default function BouldersViewer() {
  const response = useGetBoulders();

  const boulders = response.data;
  return (
    <Box sx={{ display: "flex" }}>
      <LeafletBouldersViewer boulders={boulders} />
      <BoulderCardViewer boulders={boulders} />
    </Box>
  );
}
