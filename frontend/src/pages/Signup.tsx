import React, { useState } from "react"
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { red } from "@mui/material/colors";
import "../styles/Signup.css"

import { Person } from "../interfaces/person";

import ENDPOINTS from "../utils/contants/endpoints";
import axios, { AxiosError, AxiosResponse } from "axios";

function Signup() {
  const [person, setPerson] = useState<Person>({ firstname: "", lastname: "", email: "", password: "" });
  const [confPwd, setConfPwd] = useState<string>("");
  const [error, setError] = useState({ email: false, server: false })
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPerson((person: Person) => ({ ...person, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError({ email: false, server: false })

    try {
      const response: AxiosResponse = await axios.post(ENDPOINTS.PERSON, person);
      const { status } = response;

      if (status === 201) {
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 500) {
          setError((error) => ({ ...error, server: true }))
        } else if (axiosError.response?.status === 400) {
          setError((error) => ({ ...error, email: true }))
        }
      }
    }
  }

  return (
    <Card
      className="signup"
      sx={{ minWidth: { xs: "100%", md: 720 }, backgroundColor: "rgba(33, 150, 243, 0.32)" }}
    >
      <CardContent
        className="signup-content"
        sx={{ backgroundColor: "white", gap: { xs: 1, md: 3 } }}
      >
        <Typography variant="h4" component={"h1"}>Inscription</Typography>

        <Box
          component="form"
          display="flex"
          flexDirection="column"
          sx={{ gap: { xs: 1, md: 3 } }}
          onSubmit={handleSubmit}
        >
          <Box
            display="flex"
            sx={{ flexDirection: { xs: "column", md: "row" }, gap: { xs: 1, md: 3 } }}
          >
            <Box
              display="flex"
              flexDirection="column" sx={{ gap: { xs: 1, md: 3 } }}
            >
              <Box
                display="flex"
                sx={{ flexDirection: { xs: "column", md: "row" }, gap: { xs: 1, md: 3 } }}
              >
                <TextField label="Nom" name="lastname" required onChange={handleChange} />
                <TextField label="Prénom" name="firstname" required onChange={handleChange} />
              </Box>
              <TextField
                label="Numéro EMA"
                name="EMANumber"
                inputMode="numeric"
                inputProps={{ pattern: "[0-9]{8}", title: "Exemple: 42123456" }}
                onChange={handleChange}
              />
              <TextField label="Téléphone" name="phone" onChange={handleChange} />
            </Box>

            <Box
              display="flex"
              flexDirection="column" sx={{ gap: { xs: 1, md: 3 } }}
            >
              <TextField
                label="Email"
                name="email"
                type="email"
                required
                onChange={handleChange}
                helperText={error.email ? "Cette adresse email est déjà utilisée." : ""}
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
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setConfPwd(event.target.value)}
                error={confPwd ? person.password !== confPwd : false}
              />
            </Box>
          </Box>

          <Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!person.firstname || !person.lastname || !person.email || !person.password || person.password !== confPwd}
            >S'inscrire</Button>
            {error.server && <Typography color={red}>Une erreur est survenue lors de l'envoi du formulaire.</Typography>}
          </Box>
        </Box>

        <div>
          <Typography>Vous avez déjà un compte?</Typography>
          <Typography><Link to="/login">Connectez-vous ici.</Link></Typography>
        </div>
      </CardContent>
    </Card >
  )
}

export default Signup