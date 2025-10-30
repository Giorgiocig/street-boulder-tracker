import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetBoulderImages } from "../../services/BoulderImage/queries/queries";
import { useDeleteBoulderImage } from "../../services/BoulderImage";
import { useBoulderId } from "../../customHooks/useBoulderId";

export default function ImageDisplayer({
  boulderId,
}: {
  boulderId?: number | undefined;
}) {
  const { boulderIdCtx } = useBoulderId();
  const getBoulderImage = useGetBoulderImages(
    !boulderId ? Number(boulderIdCtx) : Number(boulderId)
  );
  const boulderImgsData = getBoulderImage.data;
  const deleteBoulderImage = useDeleteBoulderImage();

  const handleClickDelete = (public_id: string) => {
    // encoded because boulders/fdsu354g, and / is interpreted as part of the path that is not the case
    const encoded = encodeURIComponent(public_id);
    deleteBoulderImage.mutate(encoded);
  };

  if (!boulderImgsData || boulderImgsData.length === 0) {
    return (
      <Typography color="text.secondary" align="center">
        Nessuna immagine disponibile, Clicca su Upload immagine epr caricare un
        immagine
      </Typography>
    );
  }

  return (
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
  );
}
