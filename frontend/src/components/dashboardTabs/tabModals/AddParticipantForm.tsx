import { useDispatch } from "react-redux";
import {
  Tournament,
  TournamentParticipant,
  UpdatedTournament,
} from "../../../interfaces/tournament";
import {
  UserDataTable,
} from "../../../interfaces/user";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import cloneDeep from "lodash/cloneDeep";
import { MODAL_TABS } from "../../../utils/contants/dashboard";
import { getUserFromId } from "../../../utils/helpers/user.helper";
import axios, { AxiosResponse } from "axios";
import ENDPOINTS from "../../../utils/contants/endpoints";
import * as ACTIONS_TOURNAMENT from "../../../redux/reducers/tournament";
import { ParticipantForm } from "../../../interfaces/participant";

type AddParticipantFormProps = {
  open: string;
  onClose: () => void;
  selectedTournament?: Tournament;
  tournamentStore: Tournament[];
  userStore: UserDataTable[];
};

function AddParticipantForm(props: AddParticipantFormProps) {
  const { open, onClose, selectedTournament, tournamentStore, userStore } =
    props;
  const [nonParticipants, setNonParticipants] = useState<UserDataTable[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [selectedPerson, setSelectedPerson] = useState<UserDataTable | null>(
    null
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedTournament) {
      const participantIds = selectedTournament.people.map(
        (participant) => participant.id
      );
      const filteredUsers = userStore.filter(
        (person) => !participantIds.includes(person.id)
      );
      setNonParticipants(filteredUsers);
    }
  }, [userStore]);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    setSelectedValue(value);
    if (value && value !== "0") {
      const person = getUserFromId(Number(value), userStore);
      setSelectedPerson(person);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedPerson || !selectedTournament || !selectedTournament.id)
      return;
    const { id, firstname, lastname, email, EMANumber } = selectedPerson;

    if (!id || !email || EMANumber === undefined) return;

    dispatch(ACTIONS_TOURNAMENT.UPDATE_START());
    try {
      const participant: ParticipantForm = {
        PersonId: id,
        TournamentId: selectedTournament.id,
      };
      const response: AxiosResponse = await axios.post(
        ENDPOINTS.PARTICIPANT,
        participant,
        { withCredentials: true }
      );

      const { status } = response;

      if (status === 201) {
        const addedParticipant: TournamentParticipant = {
          id,
          firstname,
          lastname,
          email,
          EMANumber,
        };

        const tournamentClone = cloneDeep(selectedTournament);
        tournamentClone.people.push(addedParticipant);

        const updatedTournament: UpdatedTournament = {
          data: tournamentStore,
          update: tournamentClone,
        };

        dispatch(ACTIONS_TOURNAMENT.UPDATE_SUCCESS(updatedTournament));
        onClose();
      }
    } catch (error) {
      dispatch(ACTIONS_TOURNAMENT.UPDATE_FAILURE());
    }
  };

  return (
    <Dialog
      open={open === MODAL_TABS.addParticipant}
      onClose={onClose}
      PaperProps={{
        component: "form",
        sx: { width: "440px" },
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Ajouter un participant</DialogTitle>
      <DialogContent>
        <FormControl required margin="dense" fullWidth>
          <InputLabel id="nonParticipantsLabel">Non participants</InputLabel>
          <Select
            labelId="nonParticipantsLabel"
            id="nonParticipants"
            name="nonParticipants"
            label="Non participants"
            onChange={handleSelectChange}
            value={selectedValue}
            variant="outlined"
          >
            {nonParticipants.map((person) => (
              <MenuItem key={`non-${person.id}`} value={`${person.id ?? 0}`}>
                {`${person.firstname} ${person.lastname}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Annuler
        </Button>
        <Button type="submit" variant="contained">
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddParticipantForm;
