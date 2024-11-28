import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useContext, useState } from "react";
import ENDPOINTS from "../../../utils/contants/endpoints";
import { AuthContext } from "../../../utils/contexts/Auth.context";
import { AuthContextType, UserUpdate } from "../../../interfaces/user";
import REGEX from "../../../utils/contants/regex";
import { findFormError } from "../../../utils/formHelper";

type EmailFormProps = {
  open: string;
  onClose: () => void;
};

function EmailForm(props: EmailFormProps) {
  const { onClose, open } = props;
  const [email, setEmail] = useState({
    oldEmail: "",
    newEmail: "",
    confirmEmail: "",
  });
  const [error, setError] = useState({
    old: "",
    new: "",
    confirm: "",
    server: "",
  });
  const { user, updateUser } = useContext(AuthContext) as AuthContextType;

  const handleChangeOldEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (!user) return;

    if (value.length > 0 && !REGEX.email.test(value)) {
      setError((error) => ({
        ...error,
        old: "Adresse email invalide.",
      }));
    } else if (value.length > 0 && value !== user.email) {
      setError((error) => ({
        ...error,
        old: "Cette adresse email ne correspond pas à votre adresse email actuelle.",
      }));
    } else {
      setError((error) => ({
        ...error,
        old: "",
      }));
    }

    setEmail((email) => ({ ...email, [name]: value }));
  };

  const handleChangeNewEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (!user) return;

    if (value.length > 0 && !REGEX.email.test(value)) {
      setError((error) => ({
        ...error,
        new: "Adresse email invalide.",
      }));
    } else if (value.length > 0 && value === user.email) {
      setError((error) => ({
        ...error,
        new: "Cet adresse email est identique à votre adresse email actuelle.",
      }));
    } else {
      setError((error) => ({
        ...error,
        new: "",
      }));
    }

    if (value.length > 0 && value !== email.confirmEmail) {
      setError((error) => ({
        ...error,
        confirm:
          "Le champs ne correspond pas à la nouvelle adresse email saisie.",
      }));
    } else {
      setError((error) => ({
        ...error,
        confirm: "",
      }));
    }

    setEmail((email) => ({ ...email, [name]: value }));
  };

  const handleChangeConfirmEmail = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    if (!user) return;

    if (
      email.newEmail.length > 0 &&
      value.length > 0 &&
      email.newEmail !== value
    ) {
      setError((error) => ({
        ...error,
        confirm:
          "Le champs ne correspond pas à la nouvelle adresse email saisie.",
      }));
    } else {
      setError((error) => ({
        ...error,
        confirm: "",
      }));
    }

    setEmail((email) => ({ ...email, [name]: value }));
  };

  const handleClose = () => {
    setEmail({ oldEmail: "", newEmail: "", confirmEmail: "" });
    setError({ old: "", new: "", confirm: "", server: "" });
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) return;

    if (findFormError(error)) return;

    try {
      const formaData: UserUpdate = {
        email: email.newEmail,
      };

      const response: AxiosResponse = await axios.put(
        `${ENDPOINTS.PERSON}/${user.id}`,
        formaData,
        { withCredentials: true }
      );
      const { data, status } = response;

      if (status === 200) {
        const { updatedPerson } = data;
        const newUser: UserUpdate = {
          email: updatedPerson.email,
        };

        updateUser(newUser);

        handleClose();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 500) {
          setError({
            old: "",
            new: "",
            confirm: "",
            server:
              "Une erreur est survenue lors de la modification de l'adresse email.",
          });
        } else if (axiosError.response?.status === 400) {
          setError({
            old: "",
            new: "Cette adresse email est déjà utilisé.",
            confirm: "",
            server: "",
          });
        }
      }
    }
  };

  return (
    <Dialog
      open={open === "email"}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        sx: { width: "400px" },
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Modification de l'adresse email</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="oldEmail"
          name="oldEmail"
          label="Ancienne adresse email"
          type="email"
          onChange={handleChangeOldEmail}
          error={error.old.length > 0}
          helperText={error.old}
          fullWidth
          variant="outlined"
        />
        <TextField
          required
          margin="dense"
          id="newEmail"
          name="newEmail"
          label="Nouvelle adresse email"
          type="email"
          onChange={handleChangeNewEmail}
          error={error.new.length > 0}
          helperText={error.new}
          fullWidth
          variant="outlined"
        />
        <TextField
          required
          margin="dense"
          id="confirmEmail"
          name="confirmEmail"
          label="Confirmer nouvelle adresse email"
          type="email"
          onChange={handleChangeConfirmEmail}
          error={error.confirm.length > 0}
          helperText={error.confirm}
          fullWidth
          variant="outlined"
        />
        <DialogContentText color="red">{error.server}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="inherit">
          Annuler
        </Button>
        <Button type="submit" variant="contained">
          Modifier
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EmailForm;
