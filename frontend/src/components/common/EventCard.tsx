import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import type { IEventCard } from "../../utilities";

export default function EventCard({
  name,
  description,
  date,
  city,
}: IEventCard) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          {name}
        </Typography>
        <Typography variant="body2">{city}</Typography>
        <Typography variant="h5" component="div"></Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          {description}
        </Typography>
        <Typography variant="body2">{date}</Typography>
      </CardContent>
      {/*   <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
