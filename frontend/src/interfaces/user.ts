export interface User {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  password: string;
  subscription?: string;
  EMANumber?: string;
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
  phone?: string;
  subscription?: string;
  EMANumber?: string;
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
