import { UserDataTable } from "../../interfaces/user";

export const getUserFromId = (id: number, users: UserDataTable[]) => {
  const user = users.filter((person) => person.id === id).pop();
  return user ?? null;
};
