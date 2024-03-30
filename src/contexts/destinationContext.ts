import { createContext } from "react";
import { type Destination } from "@/types/googleTypes";

export const DestinationContext = createContext<Destination>(null);