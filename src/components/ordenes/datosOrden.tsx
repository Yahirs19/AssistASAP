"use client"

import { CheckIcon } from "@heroicons/react/20/solid";

import { Button } from "@/components/ui/button";

import { type Orden } from "@/utils/Queries/ordersQueries";

import { DataTableOrden } from "./editarOrdenes/data-table";
import {columns} from "./editarOrdenes/columns";

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


import { useRouter } from "next/navigation";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

import { useToast } from "@/components/ui/use-toast";

// Para editar y eliminar la orden
import axios from "axios";
import { notFound } from "next/navigation";
import { AgregarProductoOrden } from "./editarOrdenes/agregarProducto";

export const DatosOrden = ({datos}: {datos:Orden}) => {


  const route = useRouter();
  const {toast} = useToast();

  const handleEliminarOrden = async (ordenID: string) => {
    const resp = await axios.delete(`/api/orders?id=${ordenID}`)
    .catch((error) => {
      console.log("Error: ", error.message);
    });

    if (resp && resp.data) {
      console.log("DeleteUser->resp.data: ", resp.data);
      route.push("/pedidos");

      toast({
        description: "Se ha eliminado el pedido.",
      });
    }
  }

    if(datos){

        let subtotal = datos?.productos
        .reduce((total, product) => total + (product.producto.price*product.cantidad), 0)
        .toFixed(2);

        let totalIVA = (parseFloat(subtotal)*0.06).toFixed(2);

        let total = (parseFloat(subtotal) + parseFloat(totalIVA)).toFixed(2);

        return (
          <div className="bg-white">
            <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
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
      
                  <DataTableOrden columns={columns} data={datos?.productos} cantProductos={datos?.productos.length}/>
                  
                  <div className="w-full flex justify-end pr-5 mt-5">
                  <AgregarProductoOrden idOrden = {datos.id}>
                    <Button variant="secondary">Agregar producto</Button>
                  </AgregarProductoOrden>
                  </div>
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
      
                </section>
              </form>

              <div className="mt-10">

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    type="button"
                    className="w-full pl-6 pr-6 rounded-md border border-transparent bg-red-500 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Eliminar pedido
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro que quieres eliminar el pedido?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se podrá deshacer.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleEliminarOrden(datos.id)}>Confirmar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
        );
    }

    return notFound();
}