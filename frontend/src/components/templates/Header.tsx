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
import { Link, useNavigate } from "react-router-dom";
import { Img } from "./Img";
import styles from "../../styles/Header.module.css";

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

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{ padding: 1 }}>
          <Link to="">
            <Img
              src={logo}
              alt="logo"
              sx={{ display: { xs: "none", md: "flex" } }}
            />
          </Link>
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
              onClose={() => handleCloseNavMenu()}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {PAGES.map((page) => (
                <Link to={page.link} key={page.name} className={styles.link}>
                  <MenuItem onClick={() => handleCloseNavMenu()}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </Link>
              ))}

              {user && (
                <Link to={"dashboard"} className={styles.link}>
                  <MenuItem onClick={() => handleCloseNavMenu()}>
                    <Typography textAlign="center">{"Dashboard"}</Typography>
                  </MenuItem>
                </Link>
              )}
            </Menu>
          </Box>
          <Link to="">
            <Img
              src={logo}
              alt="logo"
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                height: "68px",
              }}
            />
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {PAGES.map((page) => (
              <Link to={page.link} key={page.name} className={styles.link}>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexGrow: { xs: 1, md: 0 },
              justifyContent: "right",
            }}
          >
            {user && (
              <>
                <Link to={"dashboard"} className={styles.link}>
                  <Button sx={{ my: 2, color: "white", display: "block" }}>
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="contained"
                  color="inherit"
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  Déconnexion
                </Button>
              </>
            )}

            {!user && (
              <Box display="flex" flexDirection="row"gap={1}> 
                <Link to="login" className={styles.link}>
                  <Button
                    variant="contained"
                    color="inherit"
                    sx={{ my: 2, color: "black", display: "block" }}
                  >
                    Connexion
                  </Button>
                </Link>
                <Link to="signup" className={styles.link}>
                  <Button
                    variant="contained"
                    color="inherit"
                    sx={{ my: 2, color: "black", display: "block" }}
                  >
                    Inscription
                  </Button>
                </Link>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
