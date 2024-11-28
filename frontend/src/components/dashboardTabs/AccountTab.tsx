import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  CardContent,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../utils/contexts/Auth.context";
import { AuthContextType } from "../../interfaces/user";
import PasswordForm from "./tabModals/PasswordForm";
import EmailForm from "./tabModals/EmailForm";
import { MODAL_TABS } from "../../utils/contants/dashboard";
import UserInfoForm from "./tabModals/UserInfoForm";
import DeleteDialog from "../DeleteDialog";
import axios, { AxiosError, AxiosResponse } from "axios";
import ENDPOINTS from "../../utils/contants/endpoints";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

function AccountTab() {
  const [openModal, setOpenModal] = useState("");
  const [error, setError] = useState("");
  const { user, logout } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();

  const handleOpen = (modal: string) => setOpenModal(modal);

  const handleClose = () => setOpenModal("");

  const handleDelete = async () => {
    if (!user) return;

    try {
      const response: AxiosResponse = await axios.delete(
        `${ENDPOINTS.PERSON}/${user.id}`,
        { withCredentials: true }
      );
      const { status } = response;

      if (status === 200) {
        handleClose();
        logout();
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (
          axiosError.response?.status === 500 ||
          axiosError.response?.status === 403 ||
          axiosError.response?.status === 404
        ) {
          setError("Une erreur est survenue lors de la suppression du compte");
        }
      }
      handleClose();
    }
  };

  return (
    <CardContent>
      {user && (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          gap={2}
        >
          <Box display="flex" flexDirection="column" gap={2}>
            <Box
              display="flex"
              sx={{ flexDirection: { xs: "column", md: "row" } }}
              width={"100%"}
              gap={2}
            >
              <Box display="flex" flexDirection="column" minWidth={"50%"}>
                <Typography align="left" variant="h6" component="h3">
                  Prénom
                </Typography>
                <Typography align="left">{user.firstname}</Typography>
              </Box>
              <Box display="flex" flexDirection="column">
                <Typography align="left" variant="h6" component="h3">
                  Nom
                </Typography>
                <Typography align="left">{user.lastname}</Typography>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography align="left" variant="h6" component="h3">
                Email
              </Typography>
              <Typography align="left">{user.email}</Typography>
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography align="left" variant="h6" component="h3">
                Téléphone
              </Typography>
              <Typography align="left">
                {user.phone ?? "Non renseigné"}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography align="left" variant="h6" component="h3">
                N° EMA
              </Typography>
              <Typography align="left">
                {user.EMANumber ?? "Non renseigné"}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{ display: { xs: "none", md: "flex" } }}
            alignSelf="flex-end"
          >
            <ButtonGroup variant="contained" orientation="horizontal">
              <Button onClick={() => handleOpen(MODAL_TABS.password)}>
                Modifier le mot de passe
              </Button>
              <Button onClick={() => handleOpen(MODAL_TABS.email)}>
                Modifier l'email
              </Button>
              <Button onClick={() => handleOpen(MODAL_TABS.userInfos)}>
                Modifier les informations
              </Button>
              <Button onClick={() => handleOpen(MODAL_TABS.delete)}>
                Supprimer le compte
              </Button>
            </ButtonGroup>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }} alignSelf="center">
            <ButtonGroup variant="contained" orientation="vertical">
              <Button onClick={() => handleOpen(MODAL_TABS.password)}>
                Modifier le mot de passe
              </Button>
              <Button onClick={() => handleOpen(MODAL_TABS.email)}>
                Modifier l'email
              </Button>
              <Button onClick={() => handleOpen(MODAL_TABS.userInfos)}>
                Modifier les informations
              </Button>
              <Button onClick={() => handleOpen(MODAL_TABS.delete)}>
                Supprimer le compte
              </Button>
            </ButtonGroup>
          </Box>

          {error ? (
            <Collapse in={error.length > 0}>
              <Alert
                action={
                  <IconButton
                    color="inherit"
                    size="small"
                    onClick={() => setError("")}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                severity="warning"
              >
                {error}
              </Alert>
            </Collapse>
          ) : (
            <></>
          )}
        </Box>
      )}

      <PasswordForm open={openModal} onClose={handleClose} />
      <EmailForm open={openModal} onClose={handleClose} />
      <UserInfoForm open={openModal} onClose={handleClose} />
      <DeleteDialog
        open={openModal}
        onClose={handleClose}
        onConfirm={handleDelete}
      />
    </CardContent>
  );
}

export default AccountTab;
