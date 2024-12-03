import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Snackbar,
  SnackbarCloseReason,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { Contact } from "../interfaces/contact";
import axios, { AxiosResponse } from "axios";
import ENDPOINTS from "../utils/contants/endpoints";

import styles from "../styles/Contact.module.css";

function ContactForm() {
  const [contact, setContact] = useState<Contact>({
    firstname: "",
    lastname: "",
    email: "",
    object: "",
    content: "",
  });
  const [error, setError] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setContact((contact: Contact) => ({ ...contact, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(false);
    setIsSent(false);

    try {
      const response: AxiosResponse = await axios.post(
        ENDPOINTS.CONTACT,
        contact
      );
      const { status } = response;

      if (status === 201) {
        setIsSent(true);
        setContact({
          firstname: "",
          lastname: "",
          email: "",
          object: "",
          content: "",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(true);
      }
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSent(false);
  };

  return (
    <Box sx={{ minWidth: { xs: "100%", md: 720 } }}>
      <Card
        className={styles.contact}
        sx={{
          backgroundColor: "rgba(33, 150, 243, 0.32)",
        }}
      >
        <CardContent
          className={styles.contactContent}
          sx={{ backgroundColor: "white", gap: { xs: 1, md: 3 } }}
        >
          <Typography variant="h4" component={"h1"} fontWeight={600}>
            Contact
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
                flexDirection: "column",
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
                    value={contact.lastname}
                  />
                  <TextField
                    label="Prénom"
                    name="firstname"
                    required
                    onChange={handleChange}
                    value={contact.firstname}
                  />
                </Box>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  required
                  onChange={handleChange}
                  value={contact.email}
                />
                <TextField
                  label="Objet"
                  name="object"
                  required
                  onChange={handleChange}
                  value={contact.object}
                />
                <TextField
                  label="Message"
                  name="content"
                  required
                  onChange={handleChange}
                  value={contact.content}
                  multiline
                  minRows={5}
                  maxRows={5}
                />
              </Box>
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={
                !contact.firstname ||
                !contact.lastname ||
                !contact.email ||
                !contact.object ||
                !contact.content
              }
              endIcon={<SendIcon />}
            >
              Envoyer
            </Button>

            {error && (
              <Alert severity="warning">
                Une erreur est survenue lors de l'envoi du formulaire.
              </Alert>
            )}
          </Box>
        </CardContent>
      </Card>
      
      <Snackbar
        open={isSent}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Votre message vient d'être envoyé."
        anchorOrigin={{vertical: "bottom", horizontal: "right"}}
      />
    </Box>
  );
}

export default ContactForm;
