import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DeletedTournament,
  UpdatedTournament,
  Tournament,
} from "../../interfaces/tournament";

type TournamentInitialeState = {
  data: Tournament[];
  loading: boolean | null;
  error: boolean;
  tabIndex: number;
};

const initialState: TournamentInitialeState = {
  data: [],
  loading: null,
  error: false,
  tabIndex: 0,
};

export const TournamentSlice = createSlice({
  name: "Tournaments",
  initialState: initialState,
  reducers: {
    FETCH_START: (draft: TournamentInitialeState) => {
      draft.loading = true;
    },
    FETCH_SUCCESS: (
      draft: TournamentInitialeState,
      action: PayloadAction<Tournament[]>
    ) => {
      draft.loading = false;
      draft.data = action.payload;
    },
    FETCH_FAILURE: (draft: TournamentInitialeState) => {
      draft.loading = false;
      draft.error = true;
    },
    POST_START: (draft: TournamentInitialeState) => {
      draft.loading = true;
    },
    POST_SUCCESS: (
      draft: TournamentInitialeState,
      action: PayloadAction<Tournament>
    ) => {
      draft.loading = false;
      draft.data.push(action.payload);
    },
    POST_FAILURE: (draft: TournamentInitialeState) => {
      draft.loading = false;
      draft.error = true;
    },
    UPDATE_START: (store: TournamentInitialeState) => {
      store.loading = true;
    },
    UPDATE_SUCCESS: (
      store: TournamentInitialeState,
      actions: PayloadAction<UpdatedTournament>
    ) => {
      const newTournament = actions.payload.update;
      const users = actions.payload.data;
      const newTournaments: Tournament[] = [];

      users.map((user: Tournament) => {
        if (user.id === newTournament.id) {
          newTournaments.push(newTournament);
        } else {
          newTournaments.push(user);
        }
      });

      store.loading = false;
      store.data = newTournaments;
    },
    UPDATE_FAILURE: (store: TournamentInitialeState) => {
      store.loading = false;
      store.error = true;
    },
    DELETE_START: (draft: TournamentInitialeState) => {
      draft.loading = true;
    },
    DELETE_SUCCESS: (
      draft: TournamentInitialeState,
      actions: PayloadAction<DeletedTournament>
    ) => {
      draft.loading = false;
      draft.data = actions.payload.data.filter(
        (user: Tournament) => user.id !== actions.payload.id
      );
    },
    DELETE_FAILURE: (draft: TournamentInitialeState) => {
      draft.loading = false;
      draft.error = true;
    },
    TAB_UPDATE: (
      draft: TournamentInitialeState,
      actions: PayloadAction<number>
    ) => {
      draft.tabIndex = actions.payload;
    },
  },
});

export const {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  POST_START,
  POST_SUCCESS,
  POST_FAILURE,
  UPDATE_START,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
  DELETE_START,
  DELETE_SUCCESS,
  DELETE_FAILURE,
  TAB_UPDATE
} = TournamentSlice.actions;

export default TournamentSlice.reducer;
