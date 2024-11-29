import { RootState as RootStateArticle } from "../../interfaces/user";

export const allUsers = (state: RootStateArticle) => state.users.data;
