import { DatosOrden } from "@/components/ordenes/datosOrden";

import { obtenerDetallesOrden } from "@/lib/queries/ordersQueries";
import { notFound } from "next/navigation";

export default async function DetallesOrden({ params }: { params: {ordenId:string} }) {
  console.log(params.ordenId)
  const orden = await obtenerDetallesOrden(params.ordenId);

  if(!orden) {
    return notFound();
  }
    
  return (
    <>
      <DatosOrden datos={orden}/>
    </>
  );
}
  