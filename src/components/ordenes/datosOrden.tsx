"use client"

import { CheckIcon } from "@heroicons/react/20/solid";

import Link from "next/link";

import { type Orden } from "@/lib/queries/ordersQueries";

import { useToast } from "@/components/ui/use-toast";

// Para editar y eliminar la orden
import axios from "axios";
import { notFound } from "next/navigation";

export const DatosOrden = ({datos}: {datos:Orden}) => {

    if(datos){

        let subtotal = datos?.productos
        .reduce((total, product) => total + (product.producto.price*product.cantidad), 0)
        .toFixed(2);
    
        let totalIVA = (parseFloat(subtotal)*0.06).toFixed(2);
    
        let total = (parseFloat(subtotal) + parseFloat(totalIVA)).toFixed(2);
        return (
            <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
            <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Detalles de la orden
            </h1>
    
            <form className="mt-12">
              <section aria-labelledby="cart-heading">
                <h2 id="cart-heading" className="sr-only">
                  Productos en tu orden
                </h2>
    
                <ul
                  role="list"
                  className="divide-y divide-gray-200 border-b border-t border-gray-200"
                >
                  {datos?.productos.map((product) => (
                    <li key={product.productoID} className="flex py-6">
                      <div className="flex-shrink-0">
                        <img
                          src={product.producto.imageUrl}
                          alt={product.producto.name}
                          className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                        />
                      </div>
    
                      <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                        <div>
                          <div className="flex justify-between">
                            <h4 className="text-sm">
                              <Link
                                href={`/products/${product.producto.slug}`}
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {product.producto.name}
                              </Link>
                            </h4>
                            <p className="ml-4 text-sm font-medium text-gray-900">
                              ${(product.producto.price*product.cantidad)}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.producto.description}
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
                              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => console.log("Test")}
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
                    onClick={() => console.log("Test")}
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

    return notFound();
}