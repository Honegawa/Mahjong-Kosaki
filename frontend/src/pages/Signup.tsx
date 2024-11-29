import React, { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Signup.module.css";

import { User, UserUpdate } from "../interfaces/user";

import ENDPOINTS from "../utils/contants/endpoints";
import axios, { AxiosError, AxiosResponse } from "axios";
import REGEX from "../utils/contants/regex";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { findFormError } from "../utils/formHelper";

function Signup() {
  const [user, setUser] = useState<User>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [confPwd, setConfPwd] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({
    EMANumber: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    server: "",
  });
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((user: User) => ({ ...user, [name]: value }));
  };

  const handleChangeEMANumber = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    if (value.length > 0 && !REGEX.EMA.test(value)) {
      setError((error) => ({
        ...error,
        EMANumber: "Format incorrect. Exemple de format valide: 42123456.",
      }));
    } else {
      setError((error) => ({
        ...error,
        EMANumber: "",
      }));
    }

    setUser((user: User) => ({ ...user, [name]: value }));
  };

  const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (value.length > 0 && !REGEX.phone.test(value)) {
      setError((error) => ({
        ...error,
        phone: "Format incorrect. Exemple de format valide: 0123456789.",
      }));
    } else {
      setError((error) => ({
        ...error,
        phone: "",
      }));
    }

    setUser((user: User) => ({ ...user, [name]: value }));
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (value.length > 0 && !REGEX.email.test(value)) {
      setError((error) => ({
        ...error,
        email: "Adresse email invalide.",
      }));
    } else {
      setError((error) => ({
        ...error,
        email: "",
      }));
    }

    setUser((user: User) => ({ ...user, [name]: value }));
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (value.length > 0 && !REGEX.password.test(value)) {
      setError((error) => ({
        ...error,
        password:
          "Le mot de passe doit contenir 8 caractères dont au moins 1 majuscule, 1 minuscule et un caractère spécial.",
      }));
    } else {
      setError((error) => ({
        ...error,
        password: "",
      }));
    }

    if (value.length > 0 && confPwd.length > 0 && value !== confPwd) {
      setError((error) => ({
        ...error,
        confirmPassword: "Le champs ne correspond pas au mot de passe.",
      }));
    } else {
      setError((error) => ({
        ...error,
        confirmPassword: "",
      }));
    }

    setUser((user: User) => ({ ...user, [name]: value }));
  };

  const handleChangeConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;

    if (
      value.length > 0 &&
      user.password.length > 0 &&
      value !== user.password
    ) {
      setError((error) => ({
        ...error,
        confirmPassword: "Le champs ne correspond pas au mot de passe.",
      }));
    } else {
      setError((error) => ({
        ...error,
        confirmPassword: "",
      }));
    }

    setConfPwd(value);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (findFormError(error)) return;

    try {
      const formData: UserUpdate = { ...user };

      if (!user.EMANumber) {
        delete formData.EMANumber;
      }
      if (!user.phone) {
        delete formData.phone;
      }

      const response: AxiosResponse = await axios.post(
        ENDPOINTS.PERSON,
        formData
      );
      const { status } = response;

      if (status === 201) {
        navigate("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 500) {
          setError((error) => ({
            ...error,
            server: "Une erreur est survenue lors de l'envoi du formulaire.",
          }));
        } else if (axiosError.response?.status === 400) {
          setError((error) => ({
            ...error,
            email: "Cette adresse email est déjà utilisée.",
          }));
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
                flexDirection: { xs: "column" },
                gap: { xs: 1, md: 3 },
              }}
              width="100%"
            >
              <Box
                display="flex"
                sx={{
                  flexDirection: { xs: "column", md: "row" },
                  gap: { xs: 1, md: 3 },
                }}
              >
                <TextField
                  margin="dense"
                  label="Nom"
                  name="lastname"
                  required
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  label="Prénom"
                  name="firstname"
                  required
                  onChange={handleChange}
                  fullWidth
                />
              </Box>
              <TextField
                margin="dense"
                label="Numéro EMA"
                name="EMANumber"
                inputMode="numeric"
                onChange={handleChangeEMANumber}
                error={error.EMANumber.length > 0}
                helperText={error.EMANumber}
                sx={{ height: { xs: "auto", md: "56px" } }}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Téléphone"
                name="phone"
                onChange={handleChangePhone}
                error={error.phone.length > 0}
                helperText={error.phone}
                sx={{ height: { xs: "auto", md: "56px" } }}
                fullWidth
              />

              <TextField
                margin="dense"
                label="Email"
                name="email"
                type="email"
                required
                onChange={handleChangeEmail}
                error={error.email.length > 0}
                helperText={error.email}
                sx={{ height: { xs: "auto", md: "56px" } }}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Mot de passe"
                name="password"
                type={showPassword ? "text" : "password"}
                inputProps={{ minLength: 8 }}
                required
                onChange={handleChangePassword}
                error={error.password.length > 0}
                helperText={error.password}
                sx={{ height: { xs: "auto", md: "56px" } }}
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
              <TextField
                margin="dense"
                label="Confirmer mot de passe"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                required
                onChange={handleChangeConfirmPassword}
                error={error.confirmPassword.length > 0}
                helperText={error.confirmPassword}
                sx={{ height: { xs: "auto", md: "56px" } }}
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

            {error.server ? (
              <Alert severity="warning">{error.server}</Alert>
            ) : (
              <></>
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
