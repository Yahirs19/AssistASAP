"use client";

import { Button } from "@/components/ui/button";

export default function DeleteProductButton(productId: string) {
  function handleClick() {
    try {
      fetch(`/api/deleteProduct/${productId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Button
        onClick={handleClick}
        className="ml-auto h-7 bg-transparent text-gray-500 hover:text-black hover:bg-transparent"
      >
        Eliminar
      </Button>
    </>
  );
}
