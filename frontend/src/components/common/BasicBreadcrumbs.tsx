import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useLocation } from "react-router";
import { Link as RouterLink } from "react-router-dom";

export default function BasicBreadcrumbs() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      <Breadcrumbs sx={{ my: "1rem" }}>
        {pathname === "/" ? (
          <Typography>Eventi</Typography>
        ) : (
          <Link component={RouterLink} to="/" underline="hover" color="inherit">
            Eventi
          </Link>
        )}
        {pathname !== "/" && <Typography>Boulders</Typography>}
      </Breadcrumbs>
    </>
  );
}
