import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDataTable } from "../../interfaces/user";

type UserInitialeState = {
  data: UserDataTable[];
  loading: boolean | null;
  error: boolean;
};

const initialState: UserInitialeState = {
  data: [],
  loading: null,
  error: false,
};

export const UserSlice = createSlice({
  name: "Users",
  initialState: initialState,
  reducers: {
    FETCH_START: (draft: UserInitialeState) => {
      draft.loading = true;
    },
    FETCH_SUCCESS: (
      draft: UserInitialeState,
      action: PayloadAction<UserDataTable[]>
    ) => {
      draft.loading = false;
      draft.data = action.payload;
    },
    FETCH_FAILURE: (draft: UserInitialeState) => {
      draft.loading = false;
      draft.error = true;
    },
    POST_START: (draft: UserInitialeState) => {
      draft.loading = true;
    },
    POST_SUCCESS: (
      draft: UserInitialeState,
      action: PayloadAction<UserDataTable>
    ) => {
      draft.loading = false;
      draft.data.push(action.payload);
    },
    POST_FAILURE: (draft: UserInitialeState) => {
      draft.loading = false;
      draft.error = true;
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
} = UserSlice.actions;

export default UserSlice.reducer;
