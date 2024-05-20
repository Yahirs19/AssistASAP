import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

import Link from "next/link";

import { Button } from "@mui/material";


import { InfoDeOrdenes } from "@/types/types";

export const CartaOrden = ({ordenInfo}: {ordenInfo:InfoDeOrdenes}) => {


    return (
        <Card>
            <CardHeader>
                <CardTitle>Orden ID: {ordenInfo.id}</CardTitle>
                <CardDescription>Fecha de pedido: {ordenInfo.fecha}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Total: ${ordenInfo.total}</p>
                <p>Estado de entrega: {ordenInfo.estado}</p>
                <p>Tipo de entrega: {ordenInfo.tipo}</p>
                <p>Mecanico asignado: {ordenInfo.mecanico === null ? "Sin mecanico" : 
                `${ordenInfo.mecanico.profile.name} ${ordenInfo.mecanico.profile.apellidoP}`
                }</p>

                <p>Cantidad de productos en la orden: {ordenInfo.productos.length}</p>
                <img
                src={ordenInfo.productos[0].producto.imageUrl}
                alt="Foto producto"
                width={100}
                height={100}
                className="rounded-md object-cover"
                />

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