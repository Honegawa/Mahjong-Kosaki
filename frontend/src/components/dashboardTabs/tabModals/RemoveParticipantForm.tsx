import { useState } from "react";
import { Tournament, UpdatedTournament } from "../../../interfaces/tournament";
import { UserDataTable } from "../../../interfaces/user";
import { useDispatch } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
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
import { getUserFromId } from "../../../utils/helpers/user.helper";
import { MODAL_TABS } from "../../../utils/contants/dashboard";
import * as ACTIONS_TOURNAMENT from "../../../redux/reducers/tournament";
import axios, { AxiosResponse } from "axios";
import ENDPOINTS from "../../../utils/contants/endpoints";

type RemoveParticipantFormProps = {
  open: string;
  onClose: () => void;
  selectedTournament?: Tournament;
  tournamentStore: Tournament[];
  userStore: UserDataTable[];
};

function RemoveParticipantForm(props: RemoveParticipantFormProps) {
  const { open, onClose, selectedTournament, tournamentStore, userStore } =
    props;
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [selectedPerson, setSelectedPerson] = useState<UserDataTable | null>(
    null
  );

  const dispatch = useDispatch();

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

    if (
      !selectedPerson ||
      !selectedPerson.id ||
      !selectedTournament ||
      !selectedTournament.id
    )
      return;

    dispatch(ACTIONS_TOURNAMENT.UPDATE_START());
    try {
      const response: AxiosResponse = await axios.delete(
        `${ENDPOINTS.PARTICIPANT}/tournament/${selectedTournament.id}/person/${selectedPerson.id}`,
        { withCredentials: true }
      );

      const { status } = response;

      if (status === 200) {
        const tournamentClone = cloneDeep(selectedTournament);
        const filteredParticipant = tournamentClone.people.filter(
          (person) => person.id !== selectedPerson.id
        );
        tournamentClone.people = filteredParticipant;

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
      open={open === MODAL_TABS.removeParticipant}
      onClose={onClose}
      PaperProps={{
        component: "form",
        sx: { width: "440px" },
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Retirer un participant</DialogTitle>
      <DialogContent>
        <FormControl required margin="dense" fullWidth>
          <InputLabel id="participantsLabel">Participants</InputLabel>
          <Select
            labelId="participantsLabel"
            id="participants"
            name="participants"
            label="Participants"
            onChange={handleSelectChange}
            value={selectedValue}
            variant="outlined"
          >
            {selectedTournament ? (
              selectedTournament.people.map((person) => (
                <MenuItem key={`non-${person.id}`} value={`${person.id ?? 0}`}>
                  {`${person.firstname} ${person.lastname}`}
                </MenuItem>
              ))
            ) : (
              <></>
            )}
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

export default RemoveParticipantForm;
