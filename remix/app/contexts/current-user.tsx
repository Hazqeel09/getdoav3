import { Prisma } from "@prisma/client";
import { createContext } from "react";

export const CurrentUserContext = createContext<Prisma.UserSelect | null>(null);
