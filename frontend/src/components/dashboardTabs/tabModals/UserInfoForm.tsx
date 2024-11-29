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
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../utils/contexts/Auth.context";
import REGEX from "../../../utils/contants/regex";
import { findFormError } from "../../../utils/formHelper";
import cloneDeep from "lodash/cloneDeep";
import { MODAL_TABS } from "../../../utils/contants/dashboard";

type UserInfoFormProps = {
  open: string;
  onClose: () => void;
};

function UserInfoForm(props: UserInfoFormProps) {
  const { onClose, open } = props;
  const { user, updateUser } = useContext(AuthContext) as AuthContextType;
  const [infos, setInfos] = useState<UserUpdate>({
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

  useEffect(() => {
    const userClone = cloneDeep(user);

    if (userClone && open === MODAL_TABS.userInfos) {
      setInfos({
        firstname: userClone.firstname,
        lastname: userClone.lastname,
        EMANumber: userClone.EMANumber ?? "",
        phone: userClone.phone ?? "",
      });
    }
  }, [open, user]);

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

    if (findFormError(error)) return;

    try {
      const formData: UserUpdate = { ...infos };

      if (!infos.EMANumber) {
        formData.EMANumber = null;
      }
      if (!infos.phone) {
        formData.phone = null;
      }

      const response: AxiosResponse = await axios.put(
        `${ENDPOINTS.PERSON}/${user.id}`,
        formData,
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
              "Une erreur est survenue lors de la modification des informations.",
          }));
        }
      }
    }
  };

  return (
    <Dialog
      open={open === MODAL_TABS.userInfos}
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
            value={infos.firstname}
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
            value={infos.lastname}
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
          value={infos.EMANumber}
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
          value={infos.phone}
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
