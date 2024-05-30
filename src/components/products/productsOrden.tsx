"use client"

import { Button } from "@/components/ui/button";

import { useCart } from "@/contexts/contextCarrito";

import { type ProductoCarrito } from "@/types/types";


export const ProductsOrden = (producto:ProductoCarrito) => {

    const { cart, addToCart } = useCart();

    const productIndex = cart.findIndex((product) => product.id === producto.id);

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
            {productIndex >= 0
             ? <Button disabled>El producto ya fue añadido</Button> : <Button onClick={() => {
                addToCart(producto);
             }}>Agregar a la orden</Button>}
        </div>
    )
}