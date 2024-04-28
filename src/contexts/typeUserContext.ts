import { createContext } from "react";

import { type TypeUser } from "@/types/types";

export const TypeUserContext = createContext<TypeUser | null>(null);