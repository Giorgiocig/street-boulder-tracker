import ButtonImageUpload from "../common/ButtonImageUpload";
import ImageDisplayer from "../common/ImageDisplayer";
import { Box } from "@mui/material";

export default function UploadImageStep() {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box>
          <ImageDisplayer />
        </Box>
        <Box>
          <ButtonImageUpload />
        </Box>
      </Box>
    </>
  );
}
