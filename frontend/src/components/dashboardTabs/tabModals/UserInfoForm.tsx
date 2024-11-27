import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { AuthContextType, UserUpdate } from "../../../interfaces/user";
import ENDPOINTS from "../../../utils/contants/endpoints";
import { useContext, useState } from "react";
import { AuthContext } from "../../../utils/contexts/Auth.context";
import REGEX from "../../../utils/contants/regex";

type UserInfoFormProps = {
  open: string;
  onClose: () => void;
};

function UserInfoForm(props: UserInfoFormProps) {
  const { onClose, open } = props;
  const [infos, setInfos] = useState({
    firstname: "",
    lastname: "",
    EMANumber: "",
    phone: "",
  });
  const [error, setError] = useState({
    EMANumber: "",
    phone: "",
    server: "",
  });
  const { user, updateUser } = useContext(AuthContext) as AuthContextType;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInfos((infos) => ({ ...infos, [name]: value }));
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
      setError((error) => ({ ...error, EMANumber: "" }));
    }

    setInfos((infos) => ({ ...infos, [name]: value }));
  };

  const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (value.length > 0 && !REGEX.phone.test(value)) {
      setError((error) => ({
        ...error,
        phone: "Format incorrect. Exemple de format valide: 0123456789.",
      }));
    } else {
      setError((error) => ({ ...error, phone: "" }));
    }

    setInfos((infos) => ({ ...infos, [name]: value }));
  };

  const handleClose = () => {
    setInfos({ firstname: "", lastname: "", EMANumber: "", phone: "" });
    setError({ EMANumber: "", phone: "", server: "" });
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) return;

    const hadError = Object.values(error).find((e) => e.length > 0);
    if (hadError) return;

    try {
      const formaData: UserUpdate = {};

      if (infos.firstname) {
        formaData.firstname = infos.firstname;
      }
      if (infos.lastname) {
        formaData.lastname = infos.lastname;
      }
      if (infos.EMANumber) {
        formaData.EMANumber = infos.EMANumber;
      }
      if (infos.phone) {
        formaData.phone = infos.phone;
      }

      const response: AxiosResponse = await axios.put(
        `${ENDPOINTS.PERSON}/${user.id}`,
        formaData,
        { withCredentials: true }
      );
      const { data, status } = response;

      if (status === 200) {
        const { updatedPerson } = data;
        const newUser: UserUpdate = {
          firstname: updatedPerson.firstname,
          lastname: updatedPerson.lastname,
          EMANumber: updatedPerson.EMANumber,
          phone: updatedPerson.phone,
        };

        updateUser(newUser);

        handleClose();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (
          axiosError.response?.status === 500 ||
          axiosError.response?.status === 400
        ) {
          setError((error) => ({
            ...error,
            server:
              "Une erreur est survenue lors de la modification des informations",
          }));
        }
      }
    }
  };

  return (
    <Dialog
      open={open === "infos"}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        sx: { width: "400px" },
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Modification des informations</DialogTitle>
      <DialogContent>
        <Box
          display="flex"
          sx={{
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 0, md: 2 },
          }}
        >
          <TextField
            autoFocus
            required
            margin="dense"
            id="firstname"
            name="firstname"
            label="Prénom"
            type="text"
            onChange={handleChange}
            defaultValue={user ? user.firstname : ""}
            fullWidth
            variant="outlined"
          />
          <TextField
            required
            margin="dense"
            id="lastname"
            name="lastname"
            label="Nom"
            type="text"
            onChange={handleChange}
            defaultValue={user ? user.lastname : ""}
            fullWidth
            variant="outlined"
          />
        </Box>
        <TextField
          margin="dense"
          id="EMANumber"
          name="EMANumber"
          label="Numéro EMA"
          inputMode="numeric"
          onChange={handleChangeEMANumber}
          defaultValue={user ? user.EMANumber : ""}
          error={error.EMANumber.length > 0}
          helperText={error.EMANumber}
          fullWidth
          variant="outlined"
        />
        <TextField
          margin="dense"
          id="phone"
          name="phone"
          label="Téléphone"
          inputMode="numeric"
          onChange={handleChangePhone}
          defaultValue={user ? user.phone : ""}
          error={error.phone.length > 0}
          helperText={error.phone}
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

export default UserInfoForm;
