import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import type { IBoulder } from "../../utilities";
import CardActions from "@mui/material/CardActions";
import { Box, Button, IconButton, Stack } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDeleteBoulder } from "../../services";
import { useState } from "react";
import BoulderForm from "../layout/BoulderForm";
import FullScreenDialog from "./FullScreenDialog";

export default function BasicCard({
  boulder,
  setLatLng,
}: {
  boulder: IBoulder;
  setLatLng: (arg: number[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const deleteBoulderMutation = useDeleteBoulder();

  const handleClickLocation = () => {
    setLatLng([boulder.latitude, boulder.longitude]);
  };

  const handleClickDelete = async () => {
    if (typeof boulder.id === "number")
      await deleteBoulderMutation.mutateAsync(boulder.id);
    else {
      console.error("ID del boulder non valido:", boulder.id);
    }
  };

  const handleClicEdit = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Card>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CardContent>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            {boulder.description}
          </Typography>
          <Typography variant="h5" component="div">
            {boulder.name}
          </Typography>
          <Typography sx={{ color: "text.secondary", mt: 1, mb: 1.5 }}>
            {boulder.difficulty}
          </Typography>
        </CardContent>
        <Stack sx={{ gap: 2 }}>
          <IconButton aria-label="delete" onClick={handleClickDelete}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="edit" onClick={handleClicEdit}>
            <EditIcon />
          </IconButton>
        </Stack>
      </Box>
      <CardActions>
        <Button
          variant="outlined"
          endIcon={<MyLocationIcon />}
          size="large"
          onClick={handleClickLocation}
        >
          Localizza il boulder
        </Button>
      </CardActions>
      <FullScreenDialog setIsOpen={setIsOpen} isOpen={isOpen}>
        <BoulderForm boulder={boulder} />
      </FullScreenDialog>
      {isOpen && <BoulderForm boulder={boulder} />}
    </Card>
  );
}
