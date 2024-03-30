import React, { createContext } from "react";

import { type Source } from "@/types/googleTypes";



export const SourceContext = createContext<Source>(null);