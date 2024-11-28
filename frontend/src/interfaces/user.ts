export interface User {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string | null;
  password: string;
  subscription?: string | null;
  EMANumber?: string | null;
  role?: USER_ROLE;
}

export type UserLogin = {
  email: string;
  password: string;
};

export type UserUpdate = {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string | null;
  subscription?: string | null;
  EMANumber?: string | null;
};

export interface AuthContextType {
  user: User | null;
  login: (dataForm: UserLogin) => Promise<boolean>;
  logout: () => void;
  updateUser: (dataForm: UserUpdate) => void;
}

export enum USER_ROLE {
  ADMIN = "admin",
  USER = "user",
}
