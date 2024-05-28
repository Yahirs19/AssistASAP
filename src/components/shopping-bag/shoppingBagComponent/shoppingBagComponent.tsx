"use client";
import React from "react";
import { useCart } from "../../../contexts/contextCarrito";
import { CheckIcon, ClockIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { useRouter } from 'next/navigation';


import { useToast } from "@/components/ui/use-toast";

import axios from "axios";

export default function ShoppingBagComponent() {
  const { cart, setCart, removeFromCart, insertarUno, removerUno } = useCart();

  const {v4: uuidv4} = require('uuid');

  const router = useRouter()

  const {toast} = useToast();

  type ProductosEnOrden = {
    productoID: string,
    cantidad: number
  }


  const handleSubmitOrden = async (carrito:Product[], total:string) => {
    if(carrito.length > 0){
      console.log(carrito);

      let productosAOrden: ProductosEnOrden[] = [];

      carrito.forEach((elemento)=>{
        productosAOrden.push({
          productoID: elemento.id,
          cantidad: elemento.cantidad
        })
      })

      console.log(productosAOrden);

      const resp = await axios.post("/api/orders", {
        id: uuidv4(),
        total: total,
        tipo: "DOMICILIO",
        productos: productosAOrden
      }).catch((error)=>{
        console.log(error);
      });
  
      if (resp && resp.data) {
        toast({
          description: "Tu orden se ha enviado.",
        })
        console.log("Se creó la orden: ", resp.data);
        setCart([]);

        router.push("/pedidos");
      }
    }
    else{
      toast({
        description: "Tu carrito de compra está vacío.",
      })
    }
  }


  let subtotal = cart
    .reduce((total, product) => total + (product.price*product.cantidad), 0)
    .toFixed(2);

  let totalIVA = (parseFloat(subtotal)*0.06).toFixed(2);

  let total = (parseFloat(subtotal) + parseFloat(totalIVA)).toFixed(2);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Carro de compras
        </h1>

        <form className="mt-12">
          {
            cart.length !== 0 ? 
          (
            <section aria-labelledby="cart-heading">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul
                role="list"
                className="divide-y divide-gray-200 border-b border-t border-gray-200"
              >
                {cart.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="flex-shrink-0">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="text-sm">
                            <Link
                              href={`/products/${product.slug}`}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {product.name}
                            </Link>
                          </h4>
                          <p className="ml-4 text-sm font-medium text-gray-900">
                            ${(product.price*product.cantidad)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.description}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-1 items-end justify-between">
                        <p className="flex items-center space-x-2 text-sm text-gray-700">
                          <CheckIcon
                            className="h-5 w-5 flex-shrink-0 text-green-500"
                            aria-hidden="true"
                          />
                          <span>Cantidad: {product.cantidad}</span>
                        </p>
                        <div className="ml-4">
                          <button
                            type="button"
                            className="text-sm font-medium text-blue-600 hover:text-blue-500 mr-10"
                            onClick={() => insertarUno(product.id)}
                          >
                            <span>Agregar uno</span>
                          </button>
                          <button
                            type="button"
                            className="text-sm font-medium text-blue-600 hover:text-blue-500 mr-10"
                            onClick={() => removerUno(product.id)}
                          >
                            <span>Remover uno</span>
                          </button>
                          <button
                            type="button"
                            className="text-sm font-medium text-blue-600 hover:text-blue-500" 
                            onClick={() => removeFromCart(product.id)}
                          >
                            <span>Quitar</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ) : 
          (
            <p className="mx-auto text-center">El carrito está vacío.</p>
          )

          }

          {/* Order summary */}
          <section aria-labelledby="summary-heading" className="mt-10">
            <h2 id="summary-heading" className="sr-only">
              Order summary
            </h2>

            <div>
            <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">Subtotal</dt>
                  <dd className="ml-4 text-base font-medium text-gray-900">
                    ${subtotal}
                  </dd>
                </div>
              </dl>
              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">IVA (6%)</dt>
                  <dd className="ml-4 text-base font-medium text-gray-900">
                    ${totalIVA}
                  </dd>
                </div>
              </dl>
              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">Total</dt>
                  <dd className="ml-4 text-base font-medium text-gray-900">
                    ${total}
                  </dd>
                </div>
              </dl>
              <p className="mt-1 text-sm text-gray-500">
                Se calculo un 6% de IVA
              </p>
            </div>

            <div className="mt-10">
              <button
                type="button"
                onClick={() => handleSubmitOrden(cart, total)}
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Realizar pedido
              </button>
            </div>

            <div className="mt-6 text-center text-sm">
              <p>
                o{" "}
                <Link
                  href="/products"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continua comprando
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
