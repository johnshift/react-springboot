import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";

const Nav = () => {
  return (
    <AppBar color="default">
      <Container maxWidth="md">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h4"
            noWrap
            component="div"
            color="primary"
            sx={{ fontWeight: 700 }}
          >
            <Link href="/" passHref>
              <MuiLink underline="none" color="inherit">
                veils
              </MuiLink>
            </Link>
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;
