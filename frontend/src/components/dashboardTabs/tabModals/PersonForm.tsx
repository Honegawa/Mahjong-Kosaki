import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { MODAL_TABS } from "../../../utils/contants/dashboard";
import {
  AuthContextType,
  USER_ROLE,
  UserDataTable,
  UserUpdate,
} from "../../../interfaces/user";
import cloneDeep from "lodash/cloneDeep";
import { useContext, useEffect, useState } from "react";
import REGEX from "../../../utils/contants/regex";
import {
  PhoneIphone,
  MailOutline,
  InfoOutlined,
  Work,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { findFormError } from "../../../utils/formHelper";
import axios, { AxiosError, AxiosResponse } from "axios";
import ENDPOINTS from "../../../utils/contants/endpoints";
import { AuthContext } from "../../../utils/contexts/Auth.context";

type PersonFormProps = {
  open: string;
  onClose: () => void;
  selectedPerson?: UserDataTable;
};

function PersonForm(props: PersonFormProps) {
  const { open, selectedPerson, onClose } = props;
  const [person, setPerson] = useState<UserDataTable>({
    id: null,
    firstname: "",
    lastname: "",
    email: "",
    role: USER_ROLE.USER,
    EMANumber: null,
    phone: null,
    subscription: null,
  });
  const [error, setError] = useState({
    email: "",
    EMANumber: "",
    phone: "",
    server: "",
  });
  const { user, updateUser } = useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    const userClone = cloneDeep(selectedPerson);

    if (open === MODAL_TABS.editPerson && userClone) {
      setPerson(userClone);
    }
  }, [open, selectedPerson]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPerson((person) => ({ ...person, [name]: value }));
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

    setPerson((person) => ({ ...person, [name]: value }));
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

    setPerson((person) => ({ ...person, [name]: value }));
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

    setPerson((person) => ({ ...person, [name]: value }));
  };

  const handleChangeSubscription = (value: Dayjs | null) => {
    if (value) {
      setPerson((person) => ({
        ...person,
        subscription: value.toISOString(),
      }));
    } else {
      setPerson((person) => ({
        ...person,
        subscription: null,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClose();
    console.log("submit personForm", person, user);

    if (findFormError(error)) return;

    try {
      const formData: UserDataTable = { ...person };

      console.log("preformatted", formData);

      if (!person.EMANumber) {
        formData.EMANumber = null;
      }
      if (!person.phone) {
        formData.phone = null;
      }

      let response: AxiosResponse;

      if (selectedPerson && selectedPerson.id) {
        // Update

        // Prevent existing email error
        if (person.email === selectedPerson.email) {
          delete formData.email;
        }

        response = await axios.put(
          `${ENDPOINTS.PERSON}/${selectedPerson.id}`,
          formData,
          {
            withCredentials: true,
          }
        );
      } else {
        // Create
        response = await axios.post(`${ENDPOINTS.PERSON}/create`, formData, {
          withCredentials: true,
        });
      }

      const { data, status } = response;

      if (status === 200) {
        // Update context if admin updates himself from user list
        if (user && user.id === person.id) {
          const { updatedPerson } = data;
          const newUser: UserUpdate = {
            firstname: updatedPerson.firstname,
            lastname: updatedPerson.lastname,
            email: updatedPerson.email,
            EMANumber: updatedPerson.EMANumber,
            phone: updatedPerson.phone,
            subscription: updatedPerson.subscription,
          };

          updateUser(newUser);
        }
        onClose();
      } else if (status === 201) {
        console.log("created");
        onClose();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status) {
          setError((error) => ({
            ...error,
            server: `Une erreur est survenue lors de la ${
              user ? "modification" : "création"
            } de la personne.`,
          }));
        }
      }
    }
  };

  console.log("personform----\n", "user:\n", user, "\npersone:\n", person);

  return (
    <Dialog
      open={open === MODAL_TABS.createPerson || open === MODAL_TABS.editPerson}
      onClose={onClose}
      PaperProps={{
        component: "form",
        sx: { width: "400px" },
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>
        {!selectedPerson ? "Création" : "Modification"} de personne
      </DialogTitle>
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
            value={person.firstname}
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
            value={person.lastname}
            fullWidth
            variant="outlined"
          />
        </Box>

        <TextField
          margin="dense"
          label="Email"
          name="email"
          type="email"
          required
          value={person.email}
          onChange={handleChangeEmail}
          error={error.email.length > 0}
          helperText={error.email}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutline />
              </InputAdornment>
            ),
          }}
        />

        <Box
          display="flex"
          sx={{
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 0, md: 2 },
          }}
        >
          <TextField
            margin="dense"
            id="phone"
            name="phone"
            label="Téléphone"
            inputMode="numeric"
            onChange={handleChangePhone}
            value={person.phone ?? ""}
            error={error.phone.length > 0}
            helperText={error.phone}
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIphone />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="dense"
            id="EMANumber"
            name="EMANumber"
            label="Numéro EMA"
            inputMode="numeric"
            onChange={handleChangeEMANumber}
            value={person.EMANumber ?? ""}
            error={error.EMANumber.length > 0}
            helperText={error.EMANumber}
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <InfoOutlined />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box
          display="flex"
          sx={{
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 0, md: 2 },
          }}
        >
          <DatePicker
            name="subscription"
            label="Adhésion"
            value={person.subscription ? dayjs(person.subscription) : null}
            onChange={handleChangeSubscription}
            sx={{ width: "100%", marginTop: 1 }}
            slotProps={{
              field: { clearable: true },
            }}
          />
          <TextField
            margin="dense"
            id="role"
            name="role"
            label="Rôle"
            select
            value={person.role}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Work />
                </InputAdornment>
              ),
            }}
          >
            {Object.values(USER_ROLE).map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Annuler
        </Button>
        <Button type="submit" variant="contained">
          {!selectedPerson ? "Créer" : "Modifier"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PersonForm;
