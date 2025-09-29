import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useBoulderId } from "../../customHooks/useBoulderId";
import { useAddBoulderImage } from "../../services/BoulderImage";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function ButtonImageUpload() {
  const { boulderIdCtx, setBoulderIdCtx } = useBoulderId();
  const uploadImageMutation = useAddBoulderImage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || boulderIdCtx === null) return;
    uploadImageMutation.mutate({
      data: file,
      boulderId: boulderIdCtx,
    });
  };

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      sx={{
        p: {
          xs: "2rem 2rem 2rem 2rem",
          md: "1rem 1rem 1rem 1rem",
        },
      }}
    >
      Upload Immagine
      <VisuallyHiddenInput type="file" onChange={handleChange} />
    </Button>
  );
}
