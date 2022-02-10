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
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const UpperSidebar = () => (
  <Box sx={{ color: "#757575" }}>
    <MenuItem sx={{ height: "70px" }}>
      <ListItemIcon>
        <PersonIcon fontSize="large" />
      </ListItemIcon>
      <ListItemText sx={{ paddingLeft: 2 }}>
        <Typography variant="h6">Profile</Typography>
      </ListItemText>
    </MenuItem>
    <MenuItem sx={{ height: "70px" }}>
      <ListItemIcon>
        <BlurOnIcon fontSize="large" />
      </ListItemIcon>
      <ListItemText sx={{ paddingLeft: 2 }}>
        <Typography variant="h6">Veil</Typography>
      </ListItemText>
    </MenuItem>
  </Box>
);

const RecentActivities = () => (
  <>
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ height: "70px" }}>
        <Typography variant="h6" color="#757575">
          Recent Activity
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
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
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ height: "70px" }}>
        <Typography variant="h6" color="#757575">
          Confirm Requests
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
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
    <Paper>
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
    <Grid container>
      <Grid
        item
        sm={4}
        sx={{
          paddingX: 2,
          // border: "1px solid red",
          display: {
            xs: "none",
            sm: "block",
          },
        }}
      >
        <Sidebar />
      </Grid>
      <Grid item sm={8}>
        {children}
      </Grid>
    </Grid>
  );
};

export default SidebarLayout;
