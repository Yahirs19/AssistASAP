import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/components/ui/alert";

import { ClientesMecanicos } from "@/types/types";

export const AsignarMecanico = ({mecanico} : {mecanico:ClientesMecanicos}) => {
    return (
        <Alert className="mb-5 mt-3">
            <AlertTitle>Datos del mecanico</AlertTitle>
            <AlertDescription>
                
                <p>Nombre: {`${mecanico.profile.name} ${mecanico.profile.apellidoP} ${mecanico.profile.apellidoM}`}</p>
                <p>Telefono: {`${mecanico.profile.telephone}`}</p>
                <p>Email: {`${mecanico.profile.email}`}</p>
            </AlertDescription>
        </Alert>
    )
}