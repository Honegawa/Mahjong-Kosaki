import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useContext, useState } from "react";
import ENDPOINTS from "../../../utils/contants/endpoints";
import { AuthContext } from "../../../utils/contexts/Auth.context";
import { AuthContextType } from "../../../interfaces/user";
import { findFormError } from "../../../utils/formHelper";

type PasswordFormProps = {
  open: string;
  onClose: () => void;
};

function PasswordForm(props: PasswordFormProps) {
  const { onClose, open } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({ password: "", server: "" });
  const { user } = useContext(AuthContext) as AuthContextType;

  const handleChangeNewPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    if (
      value.length > 0 &&
      password.confirmPassword.length > 0 &&
      value !== password.confirmPassword
    ) {
      setError({
        password: "Le champs ne correspond pas au nouveau mot de passe.",
        server: "",
      });
    } else {
      setError({
        password: "",
        server: "",
      });
    }

    setPassword((password) => ({ ...password, [name]: value }));
  };

  const handleChangeConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    if (value.length > 0 && value !== password.newPassword) {
      setError({
        password: "Le champs ne correspond pas au nouveau mot de passe.",
        server: "",
      });
    } else {
      setError({
        password: "",
        server: "",
      });
    }

    setPassword((password) => ({ ...password, [name]: value }));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClose = () => {
    setPassword({ confirmPassword: "", newPassword: "" });
    setError({ password: "", server: "" });
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) return;

    if (findFormError(error)) return;

    try {
      const formaData = {
        password: password.newPassword,
      };

      const response: AxiosResponse = await axios.put(
        `${ENDPOINTS.PERSON}/${user.id}`,
        formaData,
        { withCredentials: true }
      );
      const { status } = response;

      if (status === 200) {
        handleClose();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (
          axiosError.response?.status === 500 ||
          axiosError.response?.status === 400
        ) {
          setError({
            password: "",
            server:
              "Une erreur est survenue lors de la modification du mot de passe.",
          });
        }
      }
    }
  };

  return (
    <Dialog
      open={open === "password"}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        sx: { width: "400px" },
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Modification du mot de passe</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="newPassword"
          name="newPassword"
          label="Nouveau mot de passe"
          type={showPassword ? "text" : "password"}
          onChange={handleChangeNewPassword}
          fullWidth
          variant="outlined"
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
          required
          margin="dense"
          id="confirmPassword"
          name="confirmPassword"
          label="Confirmer nouveau mot de passe"
          type={showPassword ? "text" : "password"}
          onChange={handleChangeConfirmPassword}
          error={error.password.length > 0}
          helperText={error.password}
          fullWidth
          variant="outlined"
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

export default PasswordForm;
