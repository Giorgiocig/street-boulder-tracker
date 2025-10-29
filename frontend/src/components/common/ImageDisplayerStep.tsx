import { useGetBoulderImages } from "../../services/BoulderImage/queries/queries";
import { useBoulderId } from "../../customHooks/useBoulderId";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteBoulderImage } from "../../services/BoulderImage";
import PositionedSnackbar from "./Snackbar";

export default function ImageDisplayerStep() {
  const { boulderIdCtx } = useBoulderId();
  const getBoulderImage = useGetBoulderImages(Number(boulderIdCtx));
  const deleteBoulderImage = useDeleteBoulderImage();
  const boulderImgsData = getBoulderImage.data;

  const handleClickDelete = (public_id: string) => {
    // encoded because boulders/fdsu354g, and / is interpreted as part of the path that is not the case
    const encoded = encodeURIComponent(public_id);
    deleteBoulderImage.mutate(encoded);
  };

  if (!boulderImgsData) return;
  return (
    <>
      <ImageList sx={{ width: "100%", height: 500 }} cols={8} rowHeight={250}>
        {boulderImgsData.map((item) => (
          <ImageListItem key={item.url}>
            <img srcSet={`${item.url}`} src={`${item.url}`} loading="lazy" />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="outlined"
                size="large"
                aria-label="delete btn"
                startIcon={<DeleteIcon />}
                onClick={() => handleClickDelete(item.public_id)}
              >
                Sopprimi
              </Button>
            </Box>
          </ImageListItem>
        ))}
      </ImageList>
      <PositionedSnackbar />
    </>
  );
}
