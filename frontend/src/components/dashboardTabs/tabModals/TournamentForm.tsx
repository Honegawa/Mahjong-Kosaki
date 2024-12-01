import { useEffect, useState } from "react";
import {
  Tournament,
  RootState as RootStateTournament,
  UpdatedTournament,
} from "../../../interfaces/tournament";
import cloneDeep from "lodash/cloneDeep";
import { useDispatch, useSelector } from "react-redux";
import { allTournaments } from "../../../services/selectors/tournament.selector";
import * as ACTIONS_TOURNAMENT from "../../../redux/reducers/tournament";
import { MODAL_TABS } from "../../../utils/contants/dashboard";
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
import { findFormError } from "../../../utils/formHelper";
import axios, { AxiosError, AxiosResponse } from "axios";
import ENDPOINTS from "../../../utils/contants/endpoints";
import { DateTimePicker } from "@mui/x-date-pickers";
import { DateTimeValidationError } from "@mui/x-date-pickers/models";
import dayjs, { Dayjs } from "dayjs";
import { Euro, Place } from "@mui/icons-material";
import { TOURNAMENT_CAPACITIES } from "../../../utils/contants/tournament";

type TournamentFormProps = {
  open: string;
  onClose: () => void;
  selectedTournament?: Tournament;
};

type DatePickers = {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  registerLimitDate: Dayjs | null;
};

function TournamentForm(props: TournamentFormProps) {
  const { open, selectedTournament, onClose } = props;
  const [tournament, setTournament] = useState<Tournament>({
    id: null,
    name: "",
    description: "",
    setup: "",
    startDate: dayjs().toISOString(),
    endDate: dayjs().toISOString(),
    registerLimitDate: dayjs().subtract(1, "day").toISOString(),
    entryFee: "10.00",
    playerLimit: 8,
    location: "",
  });
  const [date, setDate] = useState<DatePickers>({
    startDate:
      selectedTournament && selectedTournament.startDate
        ? dayjs(selectedTournament.startDate)
        : dayjs(),
    endDate:
      selectedTournament && selectedTournament.endDate
        ? dayjs(selectedTournament.endDate)
        : dayjs(),
    registerLimitDate:
      selectedTournament && selectedTournament.registerLimitDate
        ? dayjs(selectedTournament.registerLimitDate)
        : dayjs().subtract(1, "day"),
  });
  const [error, setError] = useState({
    registerLimitDate: "",
    startDate: "",
    endDate: "",
    server: "",
  });

  const dispatch = useDispatch();
  const tournamentStore: Tournament[] = useSelector(
    (state: RootStateTournament) => allTournaments(state)
  );

  useEffect(() => {
    const tournamentClone = cloneDeep(selectedTournament);

    if (open === MODAL_TABS.editTournament && tournamentClone) {
      setTournament(tournamentClone);
    }
  }, [open, selectedTournament]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTournament((tournament) => ({ ...tournament, [name]: value }));
  };

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    const { name, value } = event.target;
    setTournament((tournament) => ({ ...tournament, [name]: value }));
  };

  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTournament((tournament) => ({
      ...tournament,
      [name]: Number(value).toFixed(2) ?? "0.00",
    }));
  };

  const handleChangeStartDate = (value: Dayjs | null) => {
    setDate((date) => ({ ...date, startDate: value }));

    if (value && value.isValid()) {
      setTournament((tournament) => ({
        ...tournament,
        startDate: value.set("second", 0).toISOString(),
      }));
    } else if (!value) {
      setTournament((tournament) => ({
        ...tournament,
        startDate: "",
      }));
    }
  };
  const handleChangeEndDate = (value: Dayjs | null) => {
    setDate((date) => ({ ...date, endDate: value }));

    if (value && value.isValid()) {
      setTournament((tournament) => ({
        ...tournament,
        endDate: value.set("second", 0).toISOString(),
      }));
    } else if (!value) {
      setTournament((tournament) => ({
        ...tournament,
        endDate: "",
      }));
    }
  };
  const handleChangeLimitDate = (value: Dayjs | null) => {
    setDate((date) => ({ ...date, registerLimitDate: value }));

    if (value && value.isValid()) {
      setTournament((tournament) => ({
        ...tournament,
        registerLimitDate: value.set("second", 0).toISOString(),
      }));
    } else if (!value) {
      setTournament((tournament) => ({
        ...tournament,
        registerLimitDate: "",
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (findFormError(error)) return;

    try {
      let response: AxiosResponse;

      if (selectedTournament && selectedTournament.id) {
        // Update
        dispatch(ACTIONS_TOURNAMENT.UPDATE_START());

        response = await axios.put(
          `${ENDPOINTS.TOURNAMENT}/${selectedTournament.id}`,
          tournament,
          {
            withCredentials: true,
          }
        );
      } else {
        // Create
        dispatch(ACTIONS_TOURNAMENT.POST_START());

        response = await axios.post(ENDPOINTS.TOURNAMENT, tournament, {
          withCredentials: true,
        });
      }

      const { data, status } = response;

      if (status === 200) {
        const newTournament: Tournament = data.updatedTournament;
        const updatedTournament: UpdatedTournament = {
          data: tournamentStore,
          update: newTournament,
        };

        dispatch(ACTIONS_TOURNAMENT.UPDATE_SUCCESS(updatedTournament));
        onClose();
      } else if (status === 201) {
        const newTournament: Tournament = data.newTournament;

        dispatch(ACTIONS_TOURNAMENT.POST_SUCCESS(newTournament));
        onClose();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status) {
          setError((error) => ({
            ...error,
            server: `Une erreur est survenue lors de la ${
              tournament ? "modification" : "création"
            } du tournoi.`,
          }));
        }
      }

      dispatch(ACTIONS_TOURNAMENT.POST_FAILURE());
    }
  };

  const handleErrorDate = (
    newError: DateTimeValidationError,
    field: string
  ) => {
    switch (newError) {
      case "minDate":
        setError((error) => ({
          ...error,
          [field]:
            field === "startDate"
              ? "La date ne peut pas être antérieure à aujourd'hui."
              : "La date ne peut pas être antérieure à la date de début.",
        }));
        break;
      case "minTime":
        setError((error) => ({
          ...error,
          [field]: "La date ne peut pas être antérieure à la date de début.",
        }));
        break;
      case "maxDate":
      case "maxTime":
        setError((error) => ({
          ...error,
          [field]: "La date doit être antérieure à la date de début.",
        }));
        break;
      case "invalidDate":
        setError((error) => ({ ...error, [field]: "Date invalide." }));
        break;

      default:
        setError((error) => ({ ...error, [field]: "" }));
        break;
    }
  };

  return (
    <Dialog
      open={
        open === MODAL_TABS.createTournament ||
        open === MODAL_TABS.editTournament
      }
      onClose={onClose}
      PaperProps={{
        component: "form",
        sx: { width: "440px" },
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>
        {!selectedTournament ? "Création" : "Modification"} du tournoi
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          type="text"
          label="Nom"
          value={tournament.name}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          required
          margin="dense"
          id="description"
          name="description"
          type="text"
          label="Description"
          value={tournament.description}
          onChange={handleChange}
          multiline
          minRows={3}
          fullWidth
        />

        <TextField
          required
          margin="dense"
          id="setup"
          name="setup"
          type="text"
          label="Organisation"
          value={tournament.setup}
          onChange={handleChange}
          multiline
          minRows={3}
          fullWidth
        />

        <TextField
          required
          margin="dense"
          id="location"
          name="location"
          label="Lieu"
          onChange={handleChange}
          value={tournament.location}
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Place />
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
            required
            margin="dense"
            id="entryFee"
            name="entryFee"
            label="Frais d'entrée"
            type="number"
            onChange={handleChangePrice}
            value={tournament.entryFee ?? ""}
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Euro />
                </InputAdornment>
              ),
            }}
            inputProps={{
              min: 0,
              max: 30,
              step: 0.25,
            }}
          />
          <FormControl required margin="dense" fullWidth>
            <InputLabel id="playerLimitLabel">Capacité</InputLabel>
            <Select
              labelId="playerLimitLabel"
              id="playerLimit"
              name="playerLimit"
              label="Capacité"
              onChange={handleSelectChange}
              value={tournament.playerLimit}
              variant="outlined"
            >
              {TOURNAMENT_CAPACITIES.map((cap) => (
                <MenuItem key={`${cap}-capacity`} value={cap}>
                  {cap}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box
          display="flex"
          sx={{
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 0, md: 2 },
          }}
        >
          <DateTimePicker
            name="startDate"
            label="Date de début"
            value={date.startDate}
            onChange={handleChangeStartDate}
            onError={(newError) => handleErrorDate(newError, "startDate")}
            minDate={tournament.id ? undefined : dayjs()}
            sx={{ width: "100%", marginTop: 1 }}
            slotProps={{
              textField: {
                helperText: error.startDate,
                required: true,
              },
            }}
          />
          <DateTimePicker
            name="endDate"
            label="Date de fin"
            value={date.endDate}
            onChange={handleChangeEndDate}
            onError={(newError) => handleErrorDate(newError, "endDate")}
            minDateTime={
              tournament.startDate ? dayjs(tournament.startDate) : dayjs()
            }
            sx={{ width: "100%", marginTop: 1 }}
            slotProps={{
              textField: {
                helperText: error.endDate,
                required: true,
              },
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
          <DateTimePicker
            name="registerLimitDate"
            label="Date limite"
            value={date.registerLimitDate}
            onChange={handleChangeLimitDate}
            onError={(newError) =>
              handleErrorDate(newError, "registerLimitDate")
            }
            maxDateTime={
              tournament.startDate
                ? dayjs(tournament.startDate).subtract(1, "minute")
                : undefined
            }
            sx={{ width: "100%", marginTop: 1 }}
            slotProps={{
              textField: {
                helperText: error.registerLimitDate,
                required: true,
              },
            }}
          />
          <Box width="100%" />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Annuler
        </Button>
        <Button type="submit" variant="contained">
          {!selectedTournament ? "Créer" : "Modifier"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TournamentForm;
