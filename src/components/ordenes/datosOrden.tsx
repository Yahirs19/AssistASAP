"use client"

import { CheckIcon } from "@heroicons/react/20/solid";

import Link from "next/link";

import { type Orden } from "@/utils/Queries/ordersQueries";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

import { useToast } from "@/components/ui/use-toast";

// Para editar y eliminar la orden
import axios from "axios";
import { notFound } from "next/navigation";

export const DatosOrden = ({datos}: {datos:Orden}) => {

    if(datos){

        let total = datos?.productos
        .reduce((total, product) => total + (product.producto.price*product.cantidad), 0)
        .toFixed(2);

        return (
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
              <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Detalles de la orden
              </h1>

              <Alert className="mb-5 mt-3">
                <AlertTitle>Datos del cliente</AlertTitle>
                <AlertDescription>
                  
                  <p>Nombre: {`${datos.cliente.profile.name} ${datos.cliente.profile.apellidoP} ${datos.cliente.profile.apellidoM}`}</p>
                  <p>Telefono: {`${datos.cliente.profile.telephone}`}</p>
                  <p>Email: {`${datos.cliente.profile.email}`}</p>
                </AlertDescription>
              </Alert>
              <Alert>
                <AlertTitle>Datos del mecanico</AlertTitle>
                <AlertDescription>
                {datos.mecanico === null ? "Sin mecanico" : 
                <>
                <p>{`Nombre: ${datos.mecanico.profile.name} ${datos.mecanico.profile.apellidoP}`}</p>
                <p>{` Telefono: ${datos.mecanico.profile.telephone} `}</p>
                <p>{`Email: ${datos.mecanico.profile.email}`}</p>
                </>
                }
                </AlertDescription>
              </Alert>
      
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
                        <dt className="text-base font-medium text-gray-900">Total</dt>
                        <dd className="ml-4 text-base font-medium text-gray-900">
                          ${total}
                        </dd>
                      </div>
                    </dl>
                  </div>
      
                </section>
              </form>
          </div>
        </div>
        );
    }

    return notFound();
}