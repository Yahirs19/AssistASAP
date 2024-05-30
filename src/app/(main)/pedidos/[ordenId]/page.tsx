import { DatosOrden } from "@/components/ordenes/datosOrden";

import { obtenerDetallesOrden } from "@/utils/Queries/ordersQueries";
import { notFound } from "next/navigation";

import { CantidadProvider } from "@/contexts/contextCantProducOrden";

export default async function DetallesOrden({ params }: { params: {ordenId:string} }) {
  console.log(params.ordenId)
  const orden = await obtenerDetallesOrden(params.ordenId);

  if(!orden) {
    return notFound();
  }
    
  return (
    <>
      <CantidadProvider>
        <DatosOrden datos={orden}/>
      </CantidadProvider>
    </>
  );
}
  