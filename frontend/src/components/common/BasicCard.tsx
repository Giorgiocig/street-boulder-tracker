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
import AlertDialog from "./AlertDialog";

export default function BasicCard({
  boulder,
  setLatLng,
}: {
  boulder: IBoulder;
  setLatLng: (arg: number[]) => void;
}) {
  const [isOpenFullScreenDialog, setIsOpenFullScreenDialog] = useState(false);
  const [isOpenAlertDialog, setIsOpenAlertDialog] = useState(false);
  const deleteBoulderMutation = useDeleteBoulder();

  const handleClickLocation = () => {
    setLatLng([boulder.latitude, boulder.longitude]);
  };

  const handleClickDelete = () => {
    setIsOpenAlertDialog(true);
  };

  const handleDelete = async () => {
    if (typeof boulder.id === "number")
      await deleteBoulderMutation.mutateAsync(boulder.id);
    else {
      console.error("ID del boulder non valido:", boulder.id);
    }
  };

  const handleClicEdit = () => {
    setIsOpenFullScreenDialog(!isOpenFullScreenDialog);
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
          <Typography gutterBottom sx={{ fontSize: 14 }} color="secondary">
            {boulder.description}
          </Typography>
          <Typography
            variant="h5"
            component="div"
            color="primary"
            fontWeight="bold"
          >
            {boulder.name}
          </Typography>
          <Typography sx={{ mt: 1, mb: 1.5 }} color="secondary">
            {boulder.difficulty}
          </Typography>
        </CardContent>
        <Stack sx={{ gap: 2 }}>
          <IconButton
            aria-label="delete"
            onClick={handleClickDelete}
            color="secondary"
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            onClick={handleClicEdit}
            color="secondary"
          >
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
      <FullScreenDialog
        setIsOpen={setIsOpenFullScreenDialog}
        isOpen={isOpenFullScreenDialog}
        titleText="Boulder Editor - Modifica Boulder"
      >
        <BoulderForm boulder={boulder} />
      </FullScreenDialog>
      {isOpenFullScreenDialog && <BoulderForm boulder={boulder} />}
      <AlertDialog
        open={isOpenAlertDialog}
        setOpen={setIsOpenAlertDialog}
        handleDelete={handleDelete}
        boulderName={boulder.name}
      />
    </Card>
  );
}
