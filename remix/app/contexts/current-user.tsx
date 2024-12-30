import { createContext } from "react";
import { User } from "~/types/users";

export const CurrentUserContext = createContext<User | null>(null);
