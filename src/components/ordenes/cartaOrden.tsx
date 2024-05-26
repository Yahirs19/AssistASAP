import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

import {
Alert,
AlertDescription,
AlertTitle,
} from "@/components/ui/alert";

import Link from "next/link";

import { Button } from "@mui/material";

import { Badge } from "@/components/ui/badge"

import { InfoDeOrdenes } from "@/types/types";

export const CartaOrden = ({ordenInfo}: {ordenInfo:InfoDeOrdenes}) => {


    return (
        <Card>
            <CardHeader>
                <CardTitle>Orden ID: {ordenInfo.id}</CardTitle>
                <CardDescription>Fecha de pedido: {ordenInfo.fecha}</CardDescription>
            </CardHeader>
            <CardContent>
                <Badge className="mb-5" variant="outline">{ordenInfo.estado}</Badge>
                
                <Alert>
                    <AlertTitle>Datos de la orden</AlertTitle>
                    <AlertDescription className="flex-row space-x-3">
                        <div>
                            <p>Total: ${ordenInfo.total}</p>
                            <p>Tipo de entrega: {ordenInfo.tipo}</p>
                            <p>Mecanico asignado: {ordenInfo.mecanico === null ? "Sin mecanico" : 
                            `${ordenInfo.mecanico.profile.name} ${ordenInfo.mecanico.profile.apellidoP}`
                            }</p>
                            <p>Cantidad de productos en la orden: {ordenInfo.productos.length}</p>
                        </div>
                        <img
                        src={ordenInfo.productos[0].producto.imageUrl}
                        alt="Foto producto"
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                        />
                    </AlertDescription>
                </Alert>


            </CardContent>
            <CardFooter>
                <Link href={`/pedidos/${ordenInfo.id}`}>
                    <Button>
                        Ver detalles
                    </Button>
                </Link>
            </CardFooter>
        </Card>

    )
}