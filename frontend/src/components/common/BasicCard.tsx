import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import type { IBoulder } from "../../utilities";
import CardActions from "@mui/material/CardActions";
import { Button } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";

export default function BasicCard({ boulder }: { boulder: IBoulder }) {
  const handleClickLocation = () => {
    console.log("localize");
  };
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          {boulder.description}
        </Typography>
        <Typography variant="h5" component="div">
          {boulder.name}
        </Typography>
        <Typography sx={{ color: "text.secondary", mt: 1, mb: 1.5 }}>
          {boulder.difficulty}
        </Typography>
      </CardContent>
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
    </Card>
  );
}
