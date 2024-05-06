import { createContext } from "react";
import { type Location } from "@/types/googleTypes";

export const LocationContext = createContext<Location>(null);