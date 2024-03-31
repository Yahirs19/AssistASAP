"use client";
import ProductButton from "./ProductButton";
import { useState } from "react";
import Product from "./producto";

export default function TestProduct() {
  const [open, setOpen] = useState(false);

  function closeHandler() {
    setOpen(false);
  }

  function openHandler() {
    setOpen(true);
  }
  return (
    <>
      {/*Este componente tiene el boton del producto y el de los detalles */}

      {/*POR EL MOMENTO TODO ES ESTATICO A LA ESPERA DEL FETCH Y MANDAR COMO PROP LA INFORMACION DE CADA PRODUCTO PARA DESPLEGAR SUS DETALLES POR ID */}

      <ProductButton onOpen={openHandler} />
      <Product
        open={open}
        setOpen={openHandler}
        setClose={closeHandler}
        onClickClose={closeHandler}
      />
    </>
  );
}
