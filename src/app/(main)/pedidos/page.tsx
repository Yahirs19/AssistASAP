"use client"

import { useEffect, useState } from "react";

import axios from "axios";

import { type InfoDeOrdenes } from "@/types/types";
import { CartaOrden } from "@/components/ordenes/cartaOrden";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Pedidos() {

  const [ordenes, setOrdenes] = useState<InfoDeOrdenes[]>([]);

  const getOrdenesDeUsuario = async () => {
    const res = await axios.get("/api/orders").catch((error) => {
      console.log("Error: ", error);
    });

    if (res && res.data) {
      console.log(res.data);
      setOrdenes(res.data);
    }
  }

  useEffect(()=>{
    getOrdenesDeUsuario();
  }, [])

  return (
    <>
      <div className="mx-auto flex justify-end">
        <Button asChild>
          <Link href="/agregar-pedido">Agregar pedido</Link>
        </Button>
      </div>

      <h1>Pedidos</h1>
      
      {(ordenes.length > 0) ? (<div className="grid grid-cols-1 gap-4 md:grid md:grid-cols-2 md:gap-4 lg:max-w-7xl lg:px-8">
        {ordenes.map((orden)=>(
          <CartaOrden key={orden.id} ordenInfo = {orden}/>
        ))}
      </div>)
      : (
        <div className="grid grid-cols-1 gap-4 md:grid md:grid-cols-2 md:gap-4 lg:max-w-7xl lg:px-8">
          <p>No tienes ordenes.</p>
      </div>
      )
      }
    </>
  );
}
