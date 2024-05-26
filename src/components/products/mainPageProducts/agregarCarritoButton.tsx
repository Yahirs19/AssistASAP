"use client";
import React, { FormEvent } from "react";
import { useCart } from "@/contexts/contextCarrito";
import { useRouter } from "next/navigation";
import { ProductoCarrito } from "@/types/types";

// Define la interfaz para el objeto product
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  slug: string;
  cantidad: number;
}

// Define las props del componente usando la interfaz Product
interface AgregarCarritoButtonProps {
  product: ProductoCarrito;
}

export default function AgregarCarritoButton({
  product,
}: AgregarCarritoButtonProps) {
  const { addToCart } = useCart();
  const router = useRouter();

  function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addToCart(product);
    console.log("Producto agregado:", product);
    router.push("/shopping-bag");
  }
  return (
    <>
      {/* Product form */}
      <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
        <section aria-labelledby="options-heading">
          <form onSubmit={submitHandler}>
            <div className="mt-10">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Agregar al carrito
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
