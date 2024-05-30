"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";

import { type ProductoCarrito } from "@/types/types";

import Router from "next/router";

import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";


export const ProductsOrden = ({producto, idOrden, setOpen, routerExterno}:{producto:ProductoCarrito, idOrden:string, setOpen: React.Dispatch<React.SetStateAction<boolean>>, routerExterno: AppRouterInstance}) => {
    let cantidad = 0;

    const handleChangeCantidad = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(cantidad);
        
        cantidad = Number(e.target.value);
        
        console.log(cantidad);
    }

    const router = useRouter();
    const {toast} = useToast();

    const [open2, setOpen2] = useState(false);


    const handleGuardarCantidad = async (cantidad: number, idProducto:string, idOrden:string) => {

        if(cantidad < 1) {
            toast({
                variant: "destructive",
                title: "¡Advertencia!",
                description: "Ingresa una cantidad mayor a 0.",
            });
        }
        else{ 

            const res = await axios.post("/api/products/productosSinAsignar", {
                cantidad: cantidad,
                idProducto: idProducto,
                idOrden: idOrden
            });
        
            if (res && res.data) {
                console.log("UpdateCant->resp.data: ", res.data);

                setOpen(false);
                setOpen2(false);

        
                toast({
                    description: "Se registró el producto.",
                });

                router.refresh();

                window.location.reload();
        
            }
        }
    }

    return (
        <div key={producto.id} className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
                <img
                src={producto.imageUrl}
                alt={producto.name}
                className="h-24 w-24 rounded-md object-cover object-center sm:h-14 sm:w-14"
                />
                <div>
                    <p className="text-sm font-medium leading-none">{producto.name}</p>
                    <p className="text-sm text-muted-foreground">{producto.categoria.nombre} - {producto.provedor.Empresa}</p>
                </div>
            </div>
            
            <Dialog open={open2} onOpenChange={setOpen2}>
            <DialogTrigger asChild>
                <Button variant="outline">Añadir a la orden</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Seleccionar cantidad</DialogTitle>
                <DialogDescription>
                    Indica una cantidad del producto a insertar en tu orden
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="cantidad" className="text-right">
                    Cantidad
                    </Label>
                    <Input
                    id="cantidad"
                    defaultValue="0"
                    className="col-span-3"
                    onChange={handleChangeCantidad}
                    type="number"
                    min="0"
                    />
                </div>
                
                </div>
                <DialogFooter>
                <Button type="button" onClick={() => handleGuardarCantidad(cantidad, producto.id, idOrden)}>Guardar producto</Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>

        </div>
    )
}