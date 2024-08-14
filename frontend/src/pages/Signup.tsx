import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Signup.module.css";

import { User } from "../interfaces/user";

import ENDPOINTS from "../utils/contants/endpoints";
import axios, { AxiosError, AxiosResponse } from "axios";
import REGEX from "../utils/contants/regex";

function Signup() {
  const [user, setUser] = useState<User>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [confPwd, setConfPwd] = useState<string>("");
  const [error, setError] = useState({ email: false, server: false });
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((user: User) => ({ ...user, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError({ email: false, server: false });

    try {
      const response: AxiosResponse = await axios.post(ENDPOINTS.PERSON, user);
      const { status } = response;

      if (status === 201) {
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 500) {
          setError((error) => ({ ...error, server: true }));
        } else if (axiosError.response?.status === 400) {
          setError((error) => ({ ...error, email: true }));
        }
      }
    }
  };

  return (
    <Box sx={{ minWidth: { xs: "100%", md: 720 } }}>
      <Card
        className={styles.signup}
        sx={{ backgroundColor: "rgba(33, 150, 243, 0.32)" }}
      >
        <CardContent
          className={styles.signupContent}
          sx={{ backgroundColor: "white", gap: { xs: 1, md: 3 } }}
        >
          <Typography variant="h4" component={"h1"}>
            Inscription
          </Typography>

          <Box
            component="form"
            display="flex"
            flexDirection="column"
            sx={{ gap: { xs: 1, md: 3 } }}
            onSubmit={handleSubmit}
          >
            <Box
              display="flex"
              sx={{
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 1, md: 3 },
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                sx={{ gap: { xs: 1, md: 3 } }}
              >
                <Box
                  display="flex"
                  sx={{
                    flexDirection: { xs: "column", md: "row" },
                    gap: { xs: 1, md: 3 },
                  }}
                >
                  <TextField
                    label="Nom"
                    name="lastname"
                    required
                    onChange={handleChange}
                  />
                  <TextField
                    label="Prénom"
                    name="firstname"
                    required
                    onChange={handleChange}
                  />
                </Box>
                <TextField
                  label="Numéro EMA"
                  name="EMANumber"
                  inputMode="numeric"
                  inputProps={{
                    pattern: REGEX.EMA,
                    title: "Exemple: 42123456",
                  }}
                  onChange={handleChange}
                />
                <TextField
                  label="Téléphone"
                  name="phone"
                  onChange={handleChange}
                />
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                sx={{ gap: { xs: 1, md: 3 } }}
              >
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  required
                  onChange={handleChange}
                  helperText={
                    error.email ? "Cette adresse email est déjà utilisée." : ""
                  }
                  error={error.email}
                />
                <TextField
                  label="Mot de passe"
                  name="password"
                  type="password"
                  inputProps={{ minLength: 8 }}
                  required
                  onChange={handleChange}
                />
                <TextField
                  label="Confirmer mot de passe"
                  name="confirmPassword"
                  type="password"
                  required
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setConfPwd(event.target.value)
                  }
                  error={confPwd ? user.password !== confPwd : false}
                />
              </Box>
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={
                !user.firstname ||
                !user.lastname ||
                !user.email ||
                !user.password ||
                user.password !== confPwd
              }
            >
              S'inscrire
            </Button>

            {error.server && (
              <Alert severity="warning">
                Une erreur est survenue lors de l'envoi du formulaire.
              </Alert>
            )}
          </Box>

          <div>
            <Typography>Vous avez déjà un compte?</Typography>
            <Typography>
              <Link to="/login">Connectez-vous ici.</Link>
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Signup;
