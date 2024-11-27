import {
  Box,
  Button,
  ButtonGroup,
  CardContent,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../utils/contexts/Auth.context";
import { AuthContextType } from "../../interfaces/user";
import PasswordForm from "./tabModals/PasswordForm";
import EmailForm from "./tabModals/EmailForm";
import { MODAL_TABS } from "../../utils/contants/dashboard";
import UserInfoForm from "./tabModals/UserInfoForm";

function AccountTab() {
  const [openModal, setOpenModal] = useState("");
  const { user } = useContext(AuthContext) as AuthContextType;

  const handleOpen = (modal: string) => setOpenModal(modal);

  const handleClose = () => setOpenModal("");

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
            </ButtonGroup>
          </Box>
        </Box>
      )}

      <PasswordForm open={openModal} onClose={handleClose} />
      <EmailForm open={openModal} onClose={handleClose} />
      <UserInfoForm open={openModal} onClose={handleClose} />
    </CardContent>
  );
}

export default AccountTab;
