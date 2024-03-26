"use client ";

import { MouseEventHandler, useState } from "react";
const products = [
  {
    id: 1,
    name: "Garrafa de Aceite Multigrado Mineral 20W-50 Mobil...",
    imageSrc: "/aceite.png",
    imageAlt: "Foto de Aceite.",
    price: "$640.00",
    color: "Amarillo",
  },
  {
    id: 2,
    name: "Llanta para coche",
    imageSrc: "/llanta.png",
    imageAlt: "Foto de llanta.",
    price: "$2,500.00",
    color: "Negro",
  },
];

function ProductButton({ onOpen }: { onOpen: MouseEventHandler }) {
  return (
    <>
      <div className="bg-white ">
        <div className="mx-auto  px-4 py-4 sm:px-6 sm:py-2 lg:max-w-3xl lg:px-8">
          <div className="mt-6 gap-x-6 gap-y-10 carousel">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col carousel-item w-full"
              >
                <div className=" w-full overflow-hidden rounded-md   group-hover:opacity-75 lg:h-full">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <p onClick={onOpen}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </p>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/*<button
            onClick={onOpen} // Llama a la función onOpen cuando se hace clic en el botón
            className="ml-auto mr-auto flex items-center justify-center rounded-xl border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            Open Product
            </button>*/}
        </div>
      </div>
    </>
  );
}

export default ProductButton;
