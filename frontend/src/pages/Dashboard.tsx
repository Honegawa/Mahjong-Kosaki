import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import styles from "../styles/Dashboard.module.css";
import { useContext, useState } from "react";
import { TABS } from "../utils/contants/dashboard";
import { AuthContextType } from "../interfaces/user";
import { AuthContext } from "../utils/contexts/Auth.context";
import AccountTab from "../components/dashboardTabs/AccountTab";

function Dashboard() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useContext(AuthContext) as AuthContextType;

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenMenu(newOpen);
  };

  const renderTab = () => {
    switch (selectedIndex) {
      case 0:
        return <AccountTab />;

      default:
        return <CardContent sx={{ height: "100%" }}>Erreur</CardContent>;
    }
  };

  const tabList = (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List component="nav" aria-label="main mailbox folders">
        {Object.values(TABS.user).map((userTab) => (
          <ListItemButton
            key={userTab.name}
            selected={selectedIndex === userTab.index}
            onClick={(event) => handleListItemClick(event, userTab.index)}
          >
            <ListItemIcon>{userTab.icon}</ListItemIcon>
            <ListItemText primary={userTab.name} />
          </ListItemButton>
        ))}
      </List>
      {user && user.role === "admin" && (
        <>
          <Divider />
          <List component="nav" aria-label="main mailbox folders">
            {Object.values(TABS.admin).map((adminTab) => (
              <ListItemButton
                key={adminTab.name}
                selected={selectedIndex === adminTab.index}
                onClick={(event) => handleListItemClick(event, adminTab.index)}
              >
                <ListItemIcon>{adminTab.icon}</ListItemIcon>
                <ListItemText primary={adminTab.name} />
              </ListItemButton>
            ))}
          </List>
        </>
      )}
    </Box>
  );

  return (
    <Box
      display="flex"
      sx={{ flexDirection: { xs: "column", md: "row" }, gap: { xs: 1, md: 4 } }}
      width={"100%"}
    >
      <Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <Button onClick={toggleDrawer(true)} variant="contained">
            Ouvrir le menu
          </Button>
          <Drawer open={openMenu} onClose={toggleDrawer(false)}>
            {tabList}
          </Drawer>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" }, minWidth: "220px" }}>
          {user && tabList}
        </Box>
      </Box>

      <Box className={styles.dashboard}>
        <Card sx={{ minHeight: "100%" }}>{renderTab()}</Card>
      </Box>
    </Box>
  );
}

export default Dashboard;
