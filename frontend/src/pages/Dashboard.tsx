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
import UserListTab from "../components/dashboardTabs/UserListTab";
import { Link } from "react-router-dom";
import TournamentTab from "../components/dashboardTabs/TournamentTab";

type DashboardProps = {
  tabIndex: number;
};

function Dashboard(props: DashboardProps) {
  const { tabIndex } = props;
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useContext(AuthContext) as AuthContextType;

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenMenu(newOpen);
  };

  const renderTab = () => {
    switch (tabIndex) {
      case 0:
        return <AccountTab />;
      case 3:
        return <UserListTab />;
      case 6:
        return <TournamentTab />;

      default:
        return <CardContent sx={{ height: "100%" }}>Erreur</CardContent>;
    }
  };

  const tabList = (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List component="nav" aria-label="main mailbox folders">
        {Object.entries(TABS.user).map(([userTabKey, userTabValue]) => (
          <Link
            key={userTabValue.name}
            className={styles.tabLink}
            to={`../${userTabKey.toLowerCase()}`}
          >
            <ListItemButton selected={tabIndex === userTabValue.index}>
              <ListItemIcon>{userTabValue.icon}</ListItemIcon>
              <ListItemText primary={userTabValue.name} />
            </ListItemButton>
          </Link>
        ))}
      </List>
      {user && user.role === "admin" && (
        <>
          <Divider />
          <List component="nav" aria-label="main mailbox folders">
            {Object.entries(TABS.admin).map(([adminTabKey, adminTabValue]) => (
              <Link
                key={adminTabValue.name}
                className={styles.tabLink}
                to={`../${adminTabKey.toLowerCase()}`}
              >
                <ListItemButton selected={tabIndex === adminTabValue.index}>
                  <ListItemIcon>{adminTabValue.icon}</ListItemIcon>
                  <ListItemText primary={adminTabValue.name} />
                </ListItemButton>
              </Link>
            ))}
          </List>
        </>
      )}
    </Box>
  );

  return (
    <Box
      display="flex"
      sx={{ flexDirection: { xs: "column", lg: "row" }, gap: { xs: 1, md: 4 } }}
      width="100%"
    >
      <Box>
        <Box sx={{ display: { xs: "flex", lg: "none" } }}>
          <Button onClick={toggleDrawer(true)} variant="contained">
            Ouvrir le menu
          </Button>
          <Drawer open={openMenu} onClose={toggleDrawer(false)}>
            {tabList}
          </Drawer>
        </Box>
        <Box sx={{ display: { xs: "none", lg: "flex" }, minWidth: "220px" }}>
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
