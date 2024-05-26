import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/components/ui/alert";

import { ClientesMecanicos } from "@/types/types";

export const AsignarCliente = ({cliente} : {cliente:ClientesMecanicos}) => {
    return (
        <Alert className="mb-5 mt-3">
            <AlertTitle>Datos del cliente</AlertTitle>
            <AlertDescription>
                
                <p>Nombre: {`${cliente.profile.name} ${cliente.profile.apellidoP} ${cliente.profile.apellidoM}`}</p>
                <p>Telefono: {`${cliente.profile.telephone}`}</p>
                <p>Email: {`${cliente.profile.email}`}</p>
            </AlertDescription>
        </Alert>
    )
}