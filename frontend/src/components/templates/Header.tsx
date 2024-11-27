import { useContext, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { Img } from "./Img";

import logo from "../../assets/logo.svg";
import { PAGES } from "../../utils/contants/navbarLinks";

import { AuthContext } from "../../utils/contexts/Auth.context";
import { AuthContextType } from "../../interfaces/user";

function Header() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const { user, logout } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (link: string) => {
    setAnchorElNav(null);
    if (link) {
      navigate(link);
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{ padding: 1 }}>
          <Img
            src={logo}
            alt="logo"
            sx={{ display: { xs: "none", md: "flex" } }}
            onClick={() => navigate("/")}
          />
          <Box
            sx={{
              flexGrow: { xs: 0, md: 1 },
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={() => handleCloseNavMenu("")}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {PAGES.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => handleCloseNavMenu(page.link)}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={() => handleCloseNavMenu("dashboard")}>
                <Typography textAlign="center">{"Dashboard"}</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Img
            src={logo}
            alt="logo"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              height: "68px",
            }}
            onClick={() => navigate("/")}
          />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {PAGES.map((page) => (
              <Button
                key={page.name}
                onClick={() => handleCloseNavMenu(page.link)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex" }}>
            {user && (
              <>
                <Button
                  onClick={() => navigate("dashboard")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Dashboard
                </Button>
                <Button
                  onClick={() => logout()}
                  variant="contained"
                  color="inherit"
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  Déconnexion
                </Button>
              </>
            )}

            {!user && (
              <Button
                onClick={() => navigate("/login")}
                variant="contained"
                color="inherit"
                sx={{ my: 2, color: "black", display: "block" }}
              >
                Connexion
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
