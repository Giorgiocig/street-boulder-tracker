import ButtonImageUpload from "../common/ButtonImageUpload";
import ImageDisplayerStep from "../common/ImageDisplayerStep";
import { Box } from "@mui/material";

export default function UploadImageStep() {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box>
          <ImageDisplayerStep />
        </Box>
        <Box>
          <ButtonImageUpload />
        </Box>
      </Box>
    </>
  );
}
