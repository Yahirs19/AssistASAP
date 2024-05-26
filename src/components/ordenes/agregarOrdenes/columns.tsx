"use client"

import {ColumnDef} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Checkbox } from "@/components/ui/checkbox";

import { type ProductoCarrito } from "@/types/types";

import { useCart } from "@/contexts/contextCarrito";

type Categoria = {
    nombre: string
}

type Proveedor = {
    Empresa: string
}

export const columns: ColumnDef<ProductoCarrito>[] = [
    {
        id: "select",
        header: ({ table }) => (
        <Checkbox
            checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
        />
        ),
        cell: ({ row }) => (
        <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
        />
        ),
    },
    {
        accessorKey: "id",
        header: () => <div className="text-center">ID</div>,
        cell: ({row}) => {
            return <div className="text-center font-medium">{row.getValue("id")}</div>

        }
    },
    {
        accessorKey: "imageUrl",
        header: "Imagen",
        cell: ({row}) => {
            return <img
            src={row.getValue("imageUrl")}
            alt={row.getValue("name")}
            className="h-24 w-24 rounded-md object-cover object-center sm:h-14 sm:w-14"
            />
        }
    },
    {
        accessorKey: "name",
        header: () => <div className="text-center">Nombre</div>,
        cell: ({row}) => {return <div className="text-center">{row.original.name}</div>}
    },
    {
        accessorKey: "price",
        header: () => <div className="text-right">Precio</div>,
        cell: ({ row }) => {
        const precio = parseFloat(row.getValue("price"))
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
        const cantidad = row.getValue("cantidad") as string;
    
        return <div className="text-center font-medium">{cantidad}</div>
        },
    },
    {
        id: "cambiarCantidad",
        header: () => <div className="text-center">+/-</div>,
        cell: ({ row }) => {
            const {insertarUno, removerUno} = useCart();

        
            return <div className="text-center font-medium">
                    <Button className="m-1 w-[25px] h-[25px]" onClick={() => insertarUno(row.original.id)}>+</Button>
                    <Button className="m-1 w-[25px] h-[25px]" onClick={() => removerUno(row.original.id)}>-</Button>
                </div>
            
        },
    },
    {
        accessorKey: "categoria",
        header: "Categoría",
        cell: ({row}) => {
            const nombreCategoria = row.getValue("categoria") as Categoria;
            return nombreCategoria.nombre;
        }
    },
    {
        accessorKey: "provedor",
        header: "Proveedor",
        cell: ({row}) => {
            const empresaProveedor = row.getValue("provedor") as Proveedor;
            return empresaProveedor.Empresa;
        }
    },
    {
        accessorKey: "subtotal",
        header: "Subtotal",
        cell: ({row}) => {  
            const precioSubtotal = (parseFloat(row.original.price) * parseFloat(row.original.cantidad)).toFixed(2);   

            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(precioSubtotal)
        
            return <div className="text-right font-medium">{formatted}</div>
        }
        
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const producto = row.original

            const { removeFromCart } = useCart();
       
            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => {
                    removeFromCart(producto.id);
                  }}>Eliminar</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          },
    }
]