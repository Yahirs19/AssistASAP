import { type Profile } from "@prisma/client";
import { type Point } from "./googleTypes";

export type TypeUser = "CLIENTE" | "MECANICO" | "ADMIN";

export type Payload = {
    [key: string]: any;
    type: "broadcast";
    event: string;
}


export type UsuarioOrden = Profile & Point;