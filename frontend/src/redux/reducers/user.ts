import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeletedUser, UpdatedUser, UserDataTable } from "../../interfaces/user";

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
    UPDATE_START: (store: UserInitialeState) => {
      store.loading = true;
    },
    UPDATE_SUCCESS: (
      store: UserInitialeState,
      actions: PayloadAction<UpdatedUser>
    ) => {
      const newUser = actions.payload.update;
      const users = actions.payload.data;
      const newUsers: UserDataTable[] = [];

      users.map((user: UserDataTable) => {
        if (user.id === newUser.id) {
          newUsers.push(newUser);
        } else {
          newUsers.push(user);
        }
      });

      store.loading = false;
      store.data = newUsers;
    },
    UPDATE_FAILURE: (store: UserInitialeState) => {
      store.loading = false;
      store.error = true;
    },
    DELETE_START: (draft: UserInitialeState) => {
      draft.loading = true;
    },
    DELETE_SUCCESS: (
      draft: UserInitialeState,
      actions: PayloadAction<DeletedUser>
    ) => {
      draft.loading = false;
      draft.data = actions.payload.data.filter(
        (user: UserDataTable) => user.id !== actions.payload.id
      );
    },
    DELETE_FAILURE: (draft: UserInitialeState) => {
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
  UPDATE_START,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
  DELETE_START,
  DELETE_SUCCESS,
  DELETE_FAILURE,
} = UserSlice.actions;

export default UserSlice.reducer;
