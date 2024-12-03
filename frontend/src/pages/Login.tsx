import { useContext, useState } from "react";
import { AuthContext } from "../utils/contexts/Auth.context";
import { AuthContextType } from "../interfaces/user";
import { Link, useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import styles from "../styles/Login.module.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login() {
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserLogin((user) => ({ ...user, [name]: value }));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isLogged = await login(userLogin);

    if (isLogged) {
      navigate("/");
    } else {
      setError(true);
      setUserLogin((user) => ({ ...user, password: "" }));
    }
  };

  return (
    <Box sx={{ minWidth: { xs: "100%", md: 460 } }}>
      <Card
        className={styles.login}
        sx={{ backgroundColor: "rgba(33, 150, 243, 0.32)" }}
      >
        <CardContent
          className={styles.loginContent}
          sx={{ backgroundColor: "white", gap: { xs: 1, md: 3 } }}
        >
          <Typography variant="h4" component={"h1"} fontWeight={600}>
            Connexion
          </Typography>

          <Box
            component="form"
            display="flex"
            flexDirection="column"
            sx={{ gap: { xs: 1, md: 3 } }}
            onSubmit={handleSubmit}
          >
            <TextField
              label="Email"
              name="email"
              type="email"
              required
              onChange={handleChange}
              value={userLogin.email}
              fullWidth
              error={false}
            />
            <TextField
              label="Mot de passe"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              onChange={handleChange}
              value={userLogin.password}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button type="submit" variant="contained" color="primary">
              Se connecter
            </Button>

            {error && (
              <Alert severity="warning">
                La connexion a échouée. Email ou mot de passe incorrecte(s).
              </Alert>
            )}
          </Box>

          <div>
            <Typography>Vous n'avez pas encore un compte?</Typography>
            <Typography>
              <Link to="/signup">Inscrivez-vous ici.</Link>
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
