"use client"

import { Button } from "@/components/ui/button";

import { useCart } from "@/contexts/contextCarrito";

import { type ClientesMecanicos } from "@/types/types";

import { type Dispatch, SetStateAction } from "react";

interface UsuariosOrden {
    usuario: ClientesMecanicos;
    usuarios: ClientesMecanicos[];
    usuarioAsignado: ClientesMecanicos | null;
    cambiarUsuarioAsignado: Dispatch<SetStateAction<ClientesMecanicos | null>>;
}


export const UsuariosOrden = ({usuario, usuarios, usuarioAsignado, cambiarUsuarioAsignado}:UsuariosOrden) => {

    return (
        <div className="flex items-center justify-between space-x-4 mt-5 mb-5">
            <div className="flex items-center space-x-4">
                <img
                src={usuario.profile.imageUrl}
                alt={usuario.profile.imageUrl}
                className="h-24 w-24 rounded-md object-cover object-center sm:h-14 sm:w-14"
                />
                <div>
                    <p className="text-sm font-medium leading-none mb-2">ID: {usuario.profile.id}</p>
                    <p className="text-sm font-medium leading-none">{usuario.profile.name} {usuario.profile.apellidoP}</p>
                    <p className="text-sm text-muted-foreground">{usuario.profile.telephone} - {usuario.profile.email}</p>
                </div>
            </div>
            {usuario === usuarioAsignado
             ? <Button variant="secondary" onClick={() => cambiarUsuarioAsignado(null)}>Quitar selección</Button> : <Button onClick={() => {
                cambiarUsuarioAsignado(usuario);
             }}>Asignar para la orden</Button>}
        </div>
    )
}