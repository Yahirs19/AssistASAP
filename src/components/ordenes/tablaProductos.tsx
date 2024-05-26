"use client"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import {useCart} from "@/contexts/contextCarrito";

import { SelectCategoria } from "@/components/products/componentesFiltrarProduct/selectCategoria";
import { SelectProveedor } from "@/components/products/componentesFiltrarProduct/selectProveedor";
import { SearchProduct } from "@/components/products/componentesFiltrarProduct/searchProduct";

import { type ProductoCarrito } from "@/types/types";
import { Categoria, Proveedor } from "@prisma/client";
import { DataTableProductos } from "./agregarOrdenes/data-table";
import { columns } from "./agregarOrdenes/columns";
import { ProductsOrden } from "../products/productsOrden";

interface SearchProductProps {
    productos: ProductoCarrito[];
    categorias: Categoria[];
    proveedores: Proveedor[];
    onChangeProductoSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeCategoria: (e: string) => void;
    onChangeProveedor: (e: string) => void;
}

export const TablaProductos = ({productos, categorias, proveedores, onChangeCategoria, onChangeProveedor, onChangeProductoSearch} : SearchProductProps) => {
    const { cart, setCart, removeFromCart, insertarUno, removerUno } = useCart();

    type ProductosEnOrden = {
        productoID: string,
        cantidad: number
      }

    return (
        <>
            <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-25 lg:max-w-7xl lg:px-8">
                <div className="flex flex-col md:flex md:items-center md:justify-between">
                <SearchProduct onChange={onChangeProductoSearch} />
                </div>

                <div className="mx-auto mt-3 flex flex-row md:items-center md:justify-center gap-2">
                    <SelectCategoria categorias={categorias} onChange={onChangeCategoria}/>
                    <SelectProveedor proveedores={proveedores} onChange={onChangeProveedor} />
                </div>

                
            </div>
            
            <ScrollArea className="mx-auto max-h-44 min-h-44 border rounded-md w-10/12 h-30 mb-6 overflow-y-auto">
                {
                    productos.map((producto) => (
                        <ProductsOrden {...producto} />
                    ))
                }
            </ScrollArea>
            
            
            <DataTableProductos columns={columns} data={cart}/>
        </>
    )
}