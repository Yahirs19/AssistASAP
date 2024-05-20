"use client"

import { useEffect, useState } from "react";

import axios from "axios";

import { type InfoDeOrdenes } from "@/types/types";
import { CartaOrden } from "@/components/ordenes/cartaOrden";

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
      <h1>Pedidos</h1>
      <div className="grid grid-cols-4 gap-4">
        {ordenes.map((orden)=>(
          <CartaOrden ordenInfo = {orden}/>
        ))}
      </div>
    </>
  );
}
