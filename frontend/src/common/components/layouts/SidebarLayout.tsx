import React from "react";
import {
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
  Avatar,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FingerprintIcon from "@mui/icons-material/Fingerprint";

const UpperSidebar = () => (
  <Box sx={{ color: "#757575" }}>
    <MenuItem sx={{ height: "70px" }}>
      <ListItemIcon>
        {/* <PersonIcon fontSize="large" /> */}
        <Avatar alt="John Ballesteros">JB</Avatar>
      </ListItemIcon>
      <ListItemText sx={{ paddingLeft: 2 }}>
        <Typography fontSize="inherit">John Ballesteros</Typography>
      </ListItemText>
    </MenuItem>
    <MenuItem sx={{ height: "70px" }}>
      <ListItemIcon>
        <FingerprintIcon fontSize="large" />
      </ListItemIcon>
      <ListItemText sx={{ paddingLeft: 2 }}>
        <Typography fontSize="inherit">Veil Profile</Typography>
      </ListItemText>
    </MenuItem>
  </Box>
);

const RecentActivities = () => (
  <>
    <Accordion elevation={4}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ height: "70px" }}>
        <Typography variant="h6" color="#757575">
          Recent Activity
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ maxHeight: "200px", overflow: "auto" }}>
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Typography>
        <Divider />
        <Typography>Asperiores ipsam excepturi eos!</Typography>
        <Divider />
        <Typography>
          Reiciendis autem facilis deserunt, nobis explicabo minus?
        </Typography>
      </AccordionDetails>
    </Accordion>
  </>
);

const ConfirmRequests = () => (
  <Box>
    <Accordion elevation={4}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ height: "70px" }}>
        <Typography variant="h6" color="#757575">
          Confirm Requests
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ maxHeight: "200px", overflow: "auto" }}>
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Typography>
        <Divider />
        <Typography>Asperiores ipsam excepturi eos!</Typography>
        <Divider />
        <Typography>
          Reiciendis autem facilis deserunt, nobis explicabo minus?
        </Typography>
      </AccordionDetails>
    </Accordion>
  </Box>
);

const Sidebar = () => (
  <>
    <Paper elevation={4}>
      <MenuList>
        <UpperSidebar />
      </MenuList>
    </Paper>
    <Box sx={{ my: 2 }}>
      <RecentActivities />
    </Box>
    <Box sx={{ my: 2 }}>
      <ConfirmRequests />
    </Box>
  </>
);

interface Props {
  children: React.ReactNode;
}

const SidebarLayout = ({ children }: Props) => {
  return (
    <>
      <Grid container>
        <Grid
          item
          sx={{
            width: "220px",
            // border: "1px solid red",
            display: {
              xs: "none",
              sm: "none",
              md: "block",
            },
            position: "fixed",
          }}
        >
          <Sidebar />
        </Grid>
        <Grid
          item
          md={4}
          lg={4}
          sx={{
            paddingX: 2,
            // border: "1px solid red",
            display: {
              xs: "none",
              sm: "none",
              md: "block",
            },
          }}
        />
        <Grid
          item
          md={8}
          lg={8}
          sx={{
            // border: "1px solid green",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            // width: "clamp(300px, 100%, 300px)",
            // width: "380px",
          }}
        >
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default SidebarLayout;
