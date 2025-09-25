import ButtonImageUpload from "../common/ButtonImageUpload";
import ImageDisplayerStep from "../common/ImageDisplayerStep";
import { Box } from "@mui/material";

export default function UploadImageStep() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <ImageDisplayerStep />
        <ButtonImageUpload />
      </Box>
    </>
  );
}
