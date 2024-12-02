import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { MODAL_TABS } from "../../../utils/contants/dashboard";
import {
  AuthContextType,
  UpdatedUser,
  USER_ROLE,
  UserDataTable,
  RootState as RootStateUser,
} from "../../../interfaces/user";
import cloneDeep from "lodash/cloneDeep";
import { useContext, useEffect, useState } from "react";
import REGEX from "../../../utils/contants/regex";
import {
  PhoneIphone,
  MailOutline,
  InfoOutlined,
} from "@mui/icons-material";
import { DatePicker, DateValidationError } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { findFormError } from "../../../utils/helpers/form.helper";
import axios, { AxiosError, AxiosResponse } from "axios";
import ENDPOINTS from "../../../utils/contants/endpoints";
import { AuthContext } from "../../../utils/contexts/Auth.context";
import { useDispatch, useSelector } from "react-redux";
import * as ACTIONS_USER from "../../../redux/reducers/user";
import { allUsers } from "../../../services/selectors/user.selectors";

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
    subscription: "",
    server: "",
  });
  const [date, setDate] = useState<Dayjs | null>(
    selectedPerson && selectedPerson.subscription
      ? dayjs(selectedPerson.subscription)
      : null
  );
  const { user, updateUser } = useContext(AuthContext) as AuthContextType;
  const dispatch = useDispatch();
  const userStore: UserDataTable[] = useSelector((state: RootStateUser) =>
    allUsers(state)
  );

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

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
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
    setDate(value);

    if (value && value.isValid()) {
      setPerson((person) => ({
        ...person,
        subscription: value.toISOString(),
      }));
    } else if (!value) {
      setPerson((person) => ({
        ...person,
        subscription: null,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (findFormError(error)) return;

    try {
      const formData: UserDataTable = { ...person };

      if (!person.EMANumber) {
        formData.EMANumber = null;
      }
      if (!person.phone) {
        formData.phone = null;
      }

      let response: AxiosResponse;

      if (selectedPerson && selectedPerson.id) {
        // Update
        dispatch(ACTIONS_USER.UPDATE_START());

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
        dispatch(ACTIONS_USER.POST_START());

        response = await axios.post(`${ENDPOINTS.PERSON}/create`, formData, {
          withCredentials: true,
        });
      }

      const { data, status } = response;

      if (status === 200) {
        const newUser: UserDataTable = data.updatedPerson;
        const updatedUser: UpdatedUser = {
          data: userStore,
          update: newUser,
        };

        // Update context if admin updates himself from user list
        if (user && user.id === person.id) {
          updateUser(newUser);
        }

        dispatch(ACTIONS_USER.UPDATE_SUCCESS(updatedUser));
        onClose();
      } else if (status === 201) {
        const { newPerson } = data;

        const newUser: UserDataTable = { ...newPerson };

        dispatch(ACTIONS_USER.POST_SUCCESS(newUser));
        onClose();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status !== 400) {
          setError((error) => ({
            ...error,
            server: `Une erreur est survenue lors de la ${
              user ? "modification" : "création"
            } de la personne.`,
          }));
        } else {
          setError((error) => ({
            ...error,
            email: "Cette adresse email est déjà utilisé.",
          }));
        }
      }

      dispatch(ACTIONS_USER.POST_FAILURE());
    }
  };

  const handleErrorDate = (newError: DateValidationError) => {
    switch (newError) {
      case "invalidDate":
        setError((error) => ({ ...error, subscription: "Date invalide." }));
        break;

      default:
        setError((error) => ({ ...error, subscription: "" }));
        break;
    }
  };

  return (
    <Dialog
      open={open === MODAL_TABS.createPerson || open === MODAL_TABS.editPerson}
      onClose={onClose}
      PaperProps={{
        component: "form",
        sx: { width: "440px" },
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
            value={date}
            onChange={handleChangeSubscription}
            onError={(newError) => handleErrorDate(newError)}
            sx={{ width: "100%", marginTop: 1 }}
            slotProps={{
              field: { clearable: true },
              textField: {
                helperText: error.subscription,
              },
            }}
          />
          <FormControl required margin="dense" fullWidth>
            <InputLabel id="roleLabel">Role</InputLabel>
            <Select
              labelId="roleLabel"
              id="role"
              name="role"
              label="Rôle"
              onChange={handleSelectChange}
              value={person.role}
              variant="outlined"
            >
              {Object.values(USER_ROLE).map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
