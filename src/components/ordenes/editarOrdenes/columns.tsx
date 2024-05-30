"use client"

import {ColumnDef} from "@tanstack/react-table";
import { PencilLine } from "lucide-react"
 
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

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useRouter } from "next/navigation";


import { useCart } from "@/contexts/contextCarrito";

import { useToast } from "@/components/ui/use-toast";

import { type ProductosEnOrden } from "@/types/types";
import { EliminarProducto } from "./eliminarProducto";

import axios from "axios";
import { Router } from "next/router";

import { useState } from "react";
import { set } from "zod";
import { useCantidad } from "@/contexts/contextCantProducOrden";

type Categoria = {
    nombre: string
}

type Proveedor = {
    Empresa: string
}



export const columns: ColumnDef<ProductosEnOrden>[] = [
    {
        accessorKey: "id",
        header: () => <div className="text-center">ID</div>,
        cell: ({row}) => {
            return <div className="text-center font-medium">{row.original.producto.id}</div>

        }
    },
    {
        accessorKey: "imageUrl",
        header: "Imagen",
        cell: ({row}) => {
            return <img
            src={row.original.producto.imageUrl}
            alt={row.original.producto.name}
            className="h-24 w-24 rounded-md object-cover object-center sm:h-14 sm:w-14"
            />
        }
    },
    {
        accessorKey: "name",
        header: () => <div className="text-center">Nombre</div>,
        cell: ({row}) => {return <div className="text-center">{row.original.producto.name}</div>}
    },
    {
        accessorKey: "price",
        header: () => <div className="text-right">Precio</div>,
        cell: ({ row }) => {
        const precio = parseFloat(row.original.producto.price)
        const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(precio)
    
        return <div className="text-right">{formatted}</div>
        },
    },
    {
        accessorKey: "cantidad",
        header: () => <div className="text-right">Cantidad</div>,
        cell: ({ row }) => {
        const cantidad = row.original.cantidad as string;
        console.log(row)
    
        return <div className="text-center font-medium">{cantidad}</div>
        },
    },
    {
        accessorKey: "categoria",
        header: "Categoría",
        cell: ({row}) => {
            const nombreCategoria = row.original.producto.categoria as Categoria;
            return nombreCategoria.nombre;
        }
    },
    {
        accessorKey: "provedor",
        header: "Proveedor",
        cell: ({row}) => {
            const empresaProveedor = row.original.producto.provedor as Proveedor;
            return empresaProveedor.Empresa;
        }
    },
    {
        accessorKey: "subtotal",
        header: "Subtotal",
        cell: ({row}) => {  
            const precioSubtotal = (parseFloat(String(row.original.producto.price))) * (parseFloat(String(row.original.cantidad)).toFixed(2));   

            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(precioSubtotal)
        
            return <div className="text-right font-medium">{formatted}</div>
        }
        
    },
    {
        id: "actions",
        header: "Editar",
        cell: ({ row }) => {

            const router = useRouter();
            const {toast} = useToast();

            const [open, setOpen] = useState(false);

            const { cant } = useCantidad();

            const [openAdvertencia, setOpenAdvertencia] = useState(false);

            let cantidad = Number(row.original.cantidad);


            const handleEliminarProducto = async (idOrden:string, idProducto:string) => {

                if(cant < 2){
                    if(cantidad === row.original.cantidad){
                        toast({
                            variant: "destructive",
                            title: "¡Aviso! Este es el ultimo producto que queda en tu orden.",
                            description: "El producto que queda en tu orden, es el último, y una orden no puede quedarse vacía, en caso de que quieras eliminar la orden, dirígete al botón de \"Eliminar pedido \"",
                        });
                    }
                }
                else{
                    const resp = await axios.delete(`/api/orders/productoOrden?idOrden=${idOrden}&idProducto=${idProducto}`)
                    .catch((error) => {
                        console.log("Error: ", error.message);
                    });
                
                    if (resp && resp.data) {
                        console.log("DeleteProducto->resp.data: ", resp.data);
    
                        setOpen(false);
    
                        setOpenAdvertencia(false);
                  
                        toast({
                          description: "Se ha eliminado el producto de la orden.",
                        });
    
                        router.refresh();
                        
                        window.location.reload();
                
                    }
                }
            }
            
            const handleGuardarCantidad = async (cantidad: number, idProducto:string, idOrden:string) => {

                if(cantidad === row.original.cantidad){
                    toast({
                        title: "¡Aviso!",
                        description: "La cantidad ingresada ya se encuentra registrada, prueba con otro.",
                    });
                }

                else if(cantidad < 1) {
                    setOpenAdvertencia(true);
                }
                else{ 

                    const res = await axios.put("/api/orders/productoOrden", {
                        cantidad: cantidad,
                        idProducto: idProducto,
                        idOrden: idOrden
                    });
                
                    if (res && res.data) {
                        console.log("UpdateCant->resp.data: ", res.data);

                        setOpen(false);

                    setOpenAdvertencia(false);~
                
                        toast({
                            description: "Se actualizó la cantidad del producto.",
                        });

                        router.refresh();
                
                    }
                }
            }
            
            

            const handleChangeCantidad = (e: React.ChangeEvent<HTMLInputElement>) => {
                console.log(cantidad);
                
                cantidad = Number(e.target.value);
                
                console.log(cantidad);
            }

            return (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menu</span>
                        <PencilLine className="h-4 w-4" />
                    </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Editar "{row.original.producto.name}"</DialogTitle>
                        <DialogDescription>
                            Edita la cantidad del producto o eliminalo del pedido. Da click en "Guardar" cuando hayas editado la cantidad del producto.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4 mb-3">
                        <Label htmlFor="cantidad" className="text-right">
                            Cantidad
                        </Label>
                        <Input
                            id="cantidad"
                            defaultValue={row.original.cantidad}
                            className="col-span-3"
                            type="number"
                            onChange={handleChangeCantidad}
                            min="0"
                        />
                        </div>
                    </div>

                    <AlertDialog open={openAdvertencia} onOpenChange={setOpenAdvertencia}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Cantidad de producto inválida</AlertDialogTitle>
                            <AlertDialogDescription>
                                No puedes asignar una cantidad de 0 a tu producto, en todo caso,
                                tendrías que eliminarlo. ¿Deseas eliminar tu producto?
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>No, lo quiero mantener</AlertDialogCancel>
                            <EliminarProducto handleEliminar={handleEliminarProducto} idProducto={row.original.productoID} idOrden={row.original.ordenServicioID}>
                                <Button variant="destructive">Si, confirmo</Button>    
                            </EliminarProducto>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    
                    <DialogFooter>
                        <EliminarProducto handleEliminar={handleEliminarProducto} idProducto={row.original.productoID} idOrden={row.original.ordenServicioID}>
                            <Button variant="destructive">Eliminar producto</Button>
                        </EliminarProducto>
                        <Button type="submit" onClick={() => handleGuardarCantidad(cantidad, row.original.productoID, row.original.ordenServicioID)}>Guardar</Button>
                    </DialogFooter>
                    </DialogContent>
                </Dialog>
            )
          },
    }
]