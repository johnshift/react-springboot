import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Link as MuiLink,
  Box,
  IconButton,
  Menu,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Switch,
  Divider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

import Link from "next/link";
import SearchBar from "../../../features/search/SearchBar";
import useNav from "./useNav";

import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

const Nav = () => {
  const {
    anchorEl,
    handleOpenMenu,
    handleCloseMenu,
    isLoggedIn,
    logout,
    showLoginForm,
  } = useNav();

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

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ paddingX: "10px", display: { xs: "none", sm: "flex" } }}>
              <SearchBar />
            </Box>
            <IconButton onClick={handleOpenMenu}>
              <MenuIcon fontSize="large" />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              sx={{
                mt: "-5px",
              }}
            >
              {isLoggedIn ? (
                <MenuItem onClick={logout}>
                  <IconButton
                    size="small"
                    aria-label="go to profile"
                    color="inherit"
                    sx={{ mr: 1 }}
                  >
                    <LogoutIcon />
                  </IconButton>
                  Logout
                </MenuItem>
              ) : (
                <MenuItem onClick={showLoginForm}>
                  <IconButton
                    size="small"
                    aria-label="go to profile"
                    color="inherit"
                    sx={{ mr: 1 }}
                  >
                    <LoginIcon />
                  </IconButton>
                  Login
                </MenuItem>
              )}

              <Divider />

              <MenuItem>
                <FormGroup>
                  <FormControlLabel control={<Switch />} label="Dark Mode" />
                </FormGroup>
              </MenuItem>

              <MenuItem sx={{ display: { xs: "block", sm: "none" } }}>
                <IconButton
                  size="small"
                  aria-label="search"
                  color="inherit"
                  sx={{ mr: 1 }}
                >
                  <SearchIcon />
                </IconButton>
                Search
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;
